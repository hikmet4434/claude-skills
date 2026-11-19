"""Wire protocol for gateway ↔ node RPC.

Everything is a JSON object with the same envelope shape:

    Request:   {"type": <str>, "id": <str>, "token": <str>, "payload": <dict>}
    Response:  {"type": "<req-type>_res", "id": <req-id>, "payload": <dict>}
    Error:     {"type": "error", "id": <req-id>, "error": <str>}

Requests must carry the shared bearer token (set up via
``hermes meet node approve`` on the gateway and read off disk on the
server). Mismatched tokens are rejected before dispatch.
"""

from __future__ import annotations

import hmac
import ipaddress
import json
import os
from pathlib import Path
import urllib.parse
import uuid
from typing import Any, Dict, Tuple


def write_secret_json(path: Path, data: Dict[str, Any]) -> None:
    """Atomically write JSON *data* to *path* with owner-only 0o600 permissions."""
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".json.tmp")
    payload = json.dumps(data, indent=2)
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            fh.write(payload)
    except Exception:
        try:
            tmp.unlink()
        except OSError:
            pass
        raise
    try:
        os.chmod(tmp, 0o600)
    except (OSError, NotImplementedError):
        pass
    tmp.replace(path)


def is_loopback_host(host: str) -> bool:
    """Return True when *host* resolves syntactically to a loopback interface."""
    if not isinstance(host, str):
        return False
    norm = host.strip()
    if not norm:
        return False
    if norm.startswith("[") and norm.endswith("]"):
        norm = norm[1:-1]
    if "%" in norm:
        norm = norm.split("%", 1)[0]
    if norm.rstrip(".").lower() == "localhost":
        return True
    try:
        return ipaddress.ip_address(norm).is_loopback
    except ValueError:
        return False


def validate_ws_url(url: str) -> None:
    """Ensure *url* is ws:// (loopback only) or wss://."""
    if not isinstance(url, str) or not url.strip():
        raise ValueError("url must be a non-empty string")
    parsed = urllib.parse.urlparse(url.strip())
    if parsed.scheme not in {"ws", "wss"} or not parsed.hostname:
        raise ValueError("url must be a valid ws:// or wss:// WebSocket URL")
    if parsed.scheme == "ws" and not is_loopback_host(parsed.hostname):
        raise ValueError(
            "plaintext ws:// is only allowed for loopback hosts; use wss:// for remote hosts"
        )


VALID_REQUEST_TYPES = frozenset({
    "start_bot",
    "stop",
    "status",
    "transcript",
    "say",
    "ping",
})


def make_request(
    type: str,
    token: str,
    payload: Dict[str, Any],
    req_id: str | None = None,
) -> Dict[str, Any]:
    """Construct a request envelope.

    ``req_id`` is auto-generated (uuid4 hex) when not supplied so callers
    can correlate async responses.
    """
    if not isinstance(type, str) or not type:
        raise ValueError("type must be a non-empty string")
    if type not in VALID_REQUEST_TYPES:
        raise ValueError(f"unknown request type: {type!r}")
    if not isinstance(token, str):
        raise ValueError("token must be a string")
    if not isinstance(payload, dict):
        raise ValueError("payload must be a dict")
    return {
        "type": type,
        "id": req_id or uuid.uuid4().hex,
        "token": token,
        "payload": payload,
    }


def make_response(req_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """Build a success response. The caller supplies the *request* type;
    we suffix it with ``_res`` so clients can assert they got the right
    reply.

    For simplicity we don't require the type here — clients usually just
    key off ``id``. But we still emit a generic ``*_res`` envelope.
    """
    if not isinstance(payload, dict):
        raise ValueError("payload must be a dict")
    return {"type": "response", "id": req_id, "payload": payload}


def make_error(req_id: str, error: str) -> Dict[str, Any]:
    return {"type": "error", "id": req_id, "error": str(error)}


def encode(msg: Dict[str, Any]) -> str:
    """Serialize a message envelope to a JSON string."""
    return json.dumps(msg, separators=(",", ":"), ensure_ascii=False)


def decode(raw: str) -> Dict[str, Any]:
    """Parse a JSON envelope, raising ValueError on anything malformed.

    Minimal type validation: must be an object, must contain ``type`` and
    ``id``. Heavier validation (token match, payload shape) happens in
    :func:`validate_request` on the server side.
    """
    try:
        obj = json.loads(raw)
    except (TypeError, json.JSONDecodeError) as exc:
        raise ValueError(f"malformed JSON: {exc}") from exc
    if not isinstance(obj, dict):
        raise ValueError("envelope must be a JSON object")
    if "type" not in obj or not isinstance(obj["type"], str):
        raise ValueError("envelope missing string 'type'")
    if "id" not in obj or not isinstance(obj["id"], str):
        raise ValueError("envelope missing string 'id'")
    return obj


def validate_request(msg: Dict[str, Any], expected_token: str) -> Tuple[bool, str]:
    """Check a decoded request against the server's shared token.

    Returns ``(True, "")`` when the envelope is acceptable or
    ``(False, <reason>)`` otherwise. Reason strings are safe to surface
    back to the client in an error envelope.
    """
    if not isinstance(msg, dict):
        return False, "envelope must be a dict"
    t = msg.get("type")
    if not isinstance(t, str) or not t:
        return False, "missing or non-string 'type'"
    if t not in VALID_REQUEST_TYPES:
        return False, f"unknown request type: {t!r}"
    if not isinstance(msg.get("id"), str) or not msg.get("id"):
        return False, "missing or non-string 'id'"
    token = msg.get("token")
    if not isinstance(token, str) or not token:
        return False, "missing token"
    if not isinstance(expected_token, str) or not expected_token:
        return False, "server token not configured"
    if not hmac.compare_digest(token.encode("utf-8"), expected_token.encode("utf-8")):
        return False, "token mismatch"
    payload = msg.get("payload")
    if not isinstance(payload, dict):
        return False, "payload must be a dict"
    return True, ""
