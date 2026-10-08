"use client"

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { LightboxItem } from "@/data/lightbox"
import { allWorks } from "@/data/works"

type LightboxContextValue = {
  open: (id: string, trigger?: HTMLElement | null, list?: LightboxItem[]) => void
}

const LightboxContext = createContext<LightboxContextValue>({ open: () => {} })

export const useLightbox = () => useContext(LightboxContext)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [ index, setIndex ] = useState<number | null>(null)
  // Gezinilen liste: ana sayfada çalışmalar, proje sayfasında o sayfanın görselleri
  const [ items, setItems ] = useState<LightboxItem[]>(allWorks)
  const [ direction, setDirection ] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)
  const swipeStart = useRef<number | null>(null)

  const open = useCallback((id: string, trigger?: HTMLElement | null, list: LightboxItem[] = allWorks) => {
    const found = list.findIndex((work) => work.id === id)
    if (found < 0) return

    lastTrigger.current = trigger ?? null
    setItems(list)
    setDirection(0)
    setIndex(found)
  }, [])

  const go = useCallback((step: number) => {
    setDirection(step)
    setIndex((current) => (current === null ? current : (current + step + items.length) % items.length))
  }, [ items.length ])

  const close = useCallback(() => setIndex(null), [])

  // State ile <dialog> elemanını eşle
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (index !== null && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = "hidden"
    }
    if (index === null && dialog.open) dialog.close()
  }, [ index ])

  // Ok tuşlarıyla gezinme
  useEffect(() => {
    if (index === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1)
      if (event.key === "ArrowRight") go(1)
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [ index, go ])

  // Dialog Esc ile veya close() ile kapandığında
  const handleClosed = useCallback(() => {
    document.body.style.overflow = ""
    setIndex(null)
    lastTrigger.current?.focus()
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return

    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1)
  }

  const value = useMemo(() => ({ open }), [ open ])
  const work = index === null ? null : items[index]

  return (
    <LightboxContext.Provider value={ value }>
      { children }

      <dialog
        ref={ dialogRef }
        className="lightbox"
        aria-labelledby="lb-title"
        onClose={ handleClosed }
        onClick={ (event) => {
          if (event.target === event.currentTarget) close()
        } }
      >
        <button type="button" className="lb-close" onClick={ close } aria-label="Kapat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        { work && (
          <div className="lb-body">
            <div className="lb-img" onPointerDown={ onPointerDown } onPointerUp={ onPointerUp }>
              <img
                key={ work.id }
                className={ direction > 0 ? "from-right" : direction < 0 ? "from-left" : "from-none" }
                src={ work.image }
                alt={ work.alt }
                draggable={ false }
              />
            </div>

            <div className="lb-info">
              <p className="lb-count">{ index! + 1 } / { items.length }</p>
              <h3 id="lb-title">{ work.title }</h3>
              { work.description ? <p>{ work.description }</p> : null }
              { work.format ? <p className="meta">{ work.format }</p> : null }

              <div className="lb-nav" hidden={ items.length < 2 }>
                <button type="button" className="round" onClick={ () => go(-1) } aria-label="Önceki tasarım">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button type="button" className="round" onClick={ () => go(1) } aria-label="Sonraki tasarım">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) }
      </dialog>
    </LightboxContext.Provider>
  )
}
