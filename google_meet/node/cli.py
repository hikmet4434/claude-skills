"""`hermes meet node ...` subcommand tree.

Wired into the existing ``hermes meet`` parser by the plugin's top-level
CLI. This module only defines the subparsers and their dispatch — it
does not mutate the existing cli.py.
"""

from __future__ import annotations

import argparse
import asyncio
import getpass
import json
import os
import ssl
import sys
from typing import Any

from plugins.google_meet.node.client import NodeClient
from plugins.google_meet.node.registry import NodeRegistry
from plugins.google_meet.node.server import NodeServer


def register_cli(subparser: argparse.ArgumentParser) -> None:
    """Add ``run / list / approve / remove / status / ping`` subparsers.

    *subparser* is the ``hermes meet node`` argparse object — typically
    the result of ``meet_parser.add_parser('node', ...)``.
    """
    sp = subparser.add_subparsers(dest="node_cmd", required=True)

    run = sp.add_parser("run", help="Start a node server on this machine.")
    run.add_argument("--host", default="127.0.0.1")
    run.add_argument("--port", type=int, default=18789)
    run.add_argument("--display-name", default="hermes-meet-node")
    run.add_argument(
        "--tls-cert",
        default=None,
        help="Path to TLS certificate PEM (required for non-loopback --host).",
    )
    run.add_argument(
        "--tls-key",
        default=None,
        help="Path to TLS private key PEM.",
    )
    run.set_defaults(func=node_command)

    lst = sp.add_parser("list", help="List approved remote nodes.")
    lst.set_defaults(func=node_command)

    app = sp.add_parser("approve", help="Register a remote node on the gateway.")
    app.add_argument("name")
    app.add_argument("url")
    app.add_argument(
        "--token-stdin",
        action="store_true",
        help="Read the node token from stdin (default when stdin is not a TTY).",
    )
    app.add_argument(
        "--token-env",
        default="HERMES_MEET_NODE_TOKEN",
        help="Environment variable containing the node token (default: HERMES_MEET_NODE_TOKEN).",
    )
    app.set_defaults(func=node_command)

    rm = sp.add_parser("remove", help="Forget a registered node.")
    rm.add_argument("name")
    rm.set_defaults(func=node_command)

    st = sp.add_parser("status", help="Ping a registered node.")
    st.add_argument("name")
    st.set_defaults(func=node_command)

    pg = sp.add_parser("ping", help="Alias for status.")
    pg.add_argument("name")
    pg.set_defaults(func=node_command)


def node_command(args: argparse.Namespace) -> int:
    """Dispatch for ``hermes meet node ...``.

    Returns a process exit code. Side-effects print to stdout/stderr.
    """
    cmd = getattr(args, "node_cmd", None)

    if cmd == "run":
        tls_cert = getattr(args, "tls_cert", None) or os.environ.get("HERMES_MEET_TLS_CERT")
        tls_key = getattr(args, "tls_key", None) or os.environ.get("HERMES_MEET_TLS_KEY")
        server = NodeServer(
            host=args.host,
            port=args.port,
            display_name=args.display_name,
            tls_cert=tls_cert,
            tls_key=tls_key,
        )
        try:
            ssl_ctx = server.resolve_ssl_context()
        except (RuntimeError, ValueError, OSError, ssl.SSLError) as exc:
            print(f"[meet-node] error: {exc}", file=sys.stderr)
            return 2

        scheme = "wss" if ssl_ctx is not None else "ws"
        token = server.ensure_token()
        print(f"[meet-node] display_name={server.display_name}")
        print(f"[meet-node] listening on {scheme}://{args.host}:{args.port}")
        print(f"[meet-node] token saved to: {server.token_path}")
        print(f"[meet-node] token (copy to gateway): {token}")
        print(f"[meet-node] approve with (do not pass token in CLI arguments):")
        print(f"             HERMES_MEET_NODE_TOKEN=<token> hermes meet node approve <name> {scheme}://<host>:{args.port}")
        print(f"             # or: hermes meet node approve <name> {scheme}://<host>:{args.port} --token-stdin")
        try:
            asyncio.run(server.serve())
        except KeyboardInterrupt:
            return 0
        except (RuntimeError, OSError, ssl.SSLError) as exc:
            print(f"[meet-node] error: {exc}", file=sys.stderr)
            return 2
        return 0

    reg = NodeRegistry()

    if cmd == "list":
        nodes = reg.list_all()
        if not nodes:
            print("no nodes registered")
            return 0
        for n in nodes:
            print(f"{n['name']}\t{n['url']}\ttoken={n['token'][:6]}…")
        return 0

    if cmd == "approve":
        token = _read_approve_token(args)
        if not token:
            print(
                "[meet-node] error: node token is required via HERMES_MEET_NODE_TOKEN, "
                "--token-stdin, or interactive prompt",
                file=sys.stderr,
            )
            return 2
        try:
            reg.add(args.name, args.url, token)
        except ValueError as exc:
            print(f"[meet-node] error: {exc}", file=sys.stderr)
            return 2
        print(f"approved node {args.name!r} at {args.url}")
        return 0

    if cmd == "remove":
        ok = reg.remove(args.name)
        print(f"removed {args.name!r}" if ok else f"no such node: {args.name!r}")
        return 0 if ok else 1

    if cmd in {"status", "ping"}:
        entry = reg.get(args.name)
        if entry is None:
            print(f"no such node: {args.name!r}", file=sys.stderr)
            return 1
        try:
            client = NodeClient(entry["url"], entry["token"])
            result = client.ping()
        except Exception as exc:  # noqa: BLE001 — surface any connection or config error
            print(json.dumps({"ok": False, "error": str(exc)}))
            return 1
        print(json.dumps({"ok": True, "node": args.name, **_coerce_dict(result)}))
        return 0

    print(f"unknown node command: {cmd!r}", file=sys.stderr)
    return 2


def _read_approve_token(args: argparse.Namespace) -> str:
    """Read node approval token from stdin, env var, or interactive prompt."""
    if getattr(args, "token_stdin", False):
        return sys.stdin.read().strip()
    env_name = getattr(args, "token_env", "HERMES_MEET_NODE_TOKEN")
    if env_name:
        env_val = os.environ.get(env_name, "").strip()
        if env_val:
            return env_val
    if not sys.stdin.isatty():
        return sys.stdin.read().strip()
    return getpass.getpass("Node token: ").strip()


def _coerce_dict(value: Any) -> dict:
    return value if isinstance(value, dict) else {"result": value}
