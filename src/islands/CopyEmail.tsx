import { useState } from "react";

interface Props {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}

/** Copies the email to the clipboard, with a legacy fallback. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API can be unavailable (non-secure context).
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export default function CopyEmail({ email, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyText(email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button type="button" className="copy-email" onClick={handleCopy} aria-label={copyLabel}>
      <span className="copy-email-icon" aria-hidden="true">
        {copied ? "✓" : "⧉"}
      </span>
      <span className="visually-hidden">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
