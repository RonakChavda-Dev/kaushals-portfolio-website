"use client";

import { useState } from "react";

export default function CopyHandle({ handle }: { handle: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(handle);
      setState("done");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <>
      <button type="button" className="copy" onClick={copy} aria-label={`Copy Discord username ${handle}`}>
        {state === "done" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "done" ? "Discord username copied" : state === "failed" ? "Could not copy. Select the username to copy it." : ""}
      </span>
    </>
  );
}
