"use client"

import { useEffect, useRef, useState } from "react"

export default function CopyEmail({ email }: { email: string }) {
  const [ status, setStatus ] = useState<"idle" | "done" | "failed">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const finish = (ok: boolean) => {
    setStatus(ok ? "done" : "failed")
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus("idle"), 2400)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      finish(true)
    } catch {
      try {
        const field = document.createElement("textarea")
        field.value = email
        field.setAttribute("readonly", "")
        field.style.position = "fixed"
        field.style.opacity = "0"
        document.body.appendChild(field)
        field.select()
        const ok = document.execCommand("copy")
        document.body.removeChild(field)
        finish(ok)
      } catch {
        finish(false)
      }
    }
  }

  return (
    <>
      <button type="button" className={ `btn btn-solid copy${ status === "done" ? " done" : "" }` } onClick={ copy }>
        { status === "done" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="check">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : null }
        { status === "done" ? "Kopyalandı" : "E-postayı kopyala" }
      </button>
      <span className="copy-msg" role="status" aria-live="polite">
        { status === "failed" ? "Kopyalanamadı. Adresi seçip elle kopyalayabilirsiniz." : "" }
      </span>
    </>
  )
}
