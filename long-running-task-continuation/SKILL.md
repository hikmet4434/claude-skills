---
name: long-running-task-continuation
description: "Run long multi-step tasks in bounded segments with durable checkpoints, concise progress summaries, and safe continuation after timeout or restart."
metadata:
  short-description: "Checkpoint and resume long tasks safely."
---

# Long-Running Task Continuation

Use this skill for multi-step builds, research, migrations, media jobs, and other
tasks that may exceed a single agent process timeout.

## Required protocol

1. Identify the checkpoint path supplied by the caller. If none is supplied, use
   `.hermes/checkpoints/active-task.md` and create its parent directory.
2. Before making changes, read the checkpoint if it exists. Treat it as the
   source of truth for completed work and unresolved risks.
3. Work in small, idempotent slices. Prefer one meaningful milestone per slice;
   do not start a new expensive operation when the remaining time is uncertain.
4. After every milestone, atomically rewrite the checkpoint with:
   - task and objective;
   - completed milestones and verification evidence;
   - current milestone and exact next action;
   - files/resources changed;
   - commands still running or intentionally deferred;
   - blockers, retry safety, and the last known good state.
5. Before a segment ends, stop at a clean boundary, verify what changed, and
   update the checkpoint. Never claim completion unless the final verification
   passed.

## Continuation rules

- A continuation is a fresh process. Re-read the checkpoint before acting.
- Do not repeat a completed side effect. Check the filesystem, git diff, service
  status, or output artifact first; make operations idempotent where possible.
- If the previous segment ended abruptly, mark the current milestone as
  `interrupted`, inspect partial artifacts, and resume from the last verified
  boundary.
- Keep the user-facing response concise: report the latest completed milestone,
  verification, and the next milestone or blocker.
- If the same operation fails twice, stop retrying it and record a concrete
  blocker in the checkpoint instead of looping indefinitely.

## Completion format

At completion, update the checkpoint with `status: complete`, final artifacts,
verification commands and results, and any remaining follow-up. If the segment
budget expires, leave `status: in_progress` and a precise next action so the
caller can start a new segment automatically.
