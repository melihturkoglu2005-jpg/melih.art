"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Sayfadaki hareketleri tek yerden yönetir:
// 1) [data-reveal] öğeleri ekrana girince yumuşakça belirir
// 2) üstte ilerleme çubuğu
// 3) hero metni kaydırdıkça hafifçe geride kalıp silikleşir
// 4) çalışma kartlarında imleci izleyen ışık
// 5) hero karalamaları fareyle çok hafif kayar (parallax)
// 6) İGÜ ikonunun üzerine gelince (veya dokununca) açılan bilgi kartı
export default function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);
  // Sayfa değişince yeni sayfadaki öğeleri de yakalamak için
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.setAttribute("data-ready", "");

    // 1) Belirme animasyonu
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let observer: IntersectionObserver | null = null;

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -4% 0px" },
      );

      targets.forEach((element) => io.observe(element));
      observer = io;
    }

    // 2) ve 3) Kaydırma
    const hero = document.getElementById("hero-inner");
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;

      if (bar.current)
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;

      if (hero && !reduce) {
        const progress = Math.min(
          1,
          Math.max(0, y / (window.innerHeight * 0.7)),
        );
        hero.style.setProperty("--hero-p", progress.toFixed(3));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 4) İmleci izleyen ışık
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const card = (event.target as HTMLElement).closest<HTMLElement>(
        ".work-card",
      );
      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    // 5) Karalamalar fareyi hafifçe takip eder
    const stage = document.querySelector<HTMLElement>(".hero-stage");

    const onParallax = (event: PointerEvent) => {
      if (!stage || event.pointerType !== "mouse") return;

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      stage.style.setProperty("--mx", x.toFixed(3));
      stage.style.setProperty("--my", y.toFixed(3));
    };

    // 6) İGÜ bilgi kartı
    const card = document.querySelector<HTMLElement>(".igu-card");

    const showCard = (badge: Element) => {
      if (!card || !stage) return;

      const shape = badge.querySelector("[class^='a-']") ?? badge;
      const icon = shape.getBoundingClientRect();
      const area = stage.getBoundingClientRect();
      const small = window.innerWidth < 900;
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      let left: number;
      let top: number;

      if (small) {
        // dar ekranda ikonun altına
        left = icon.left - area.left + icon.width / 2 - width / 2;
        left = Math.max(8, Math.min(area.width - width - 8, left));
        top = icon.bottom - area.top + 12;
      } else {
        // geniş ekranda ikonun sağına, sığmazsa soluna
        left = icon.right - area.left + 22;
        top = icon.top - area.top + icon.height / 2 - height / 2;
        if (left + width > area.width - 8)
          left = icon.left - area.left - width - 22;
      }

      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.dataset.open = "true";
    };

    const hideCard = () => {
      if (card) card.dataset.open = "false";
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const badge = (event.target as Element).closest(".igu-badge");
      if (badge) showCard(badge);
    };

    const onOut = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const badge = (event.target as Element).closest(".igu-badge");
      if (badge && !badge.contains(event.relatedTarget as Node | null))
        hideCard();
    };

    // Dokunmatik ekranda ikona dokununca açılır, başka yere dokununca kapanır
    const onTap = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      const badge = (event.target as Element).closest(".igu-badge");
      if (badge) showCard(badge);
      else hideCard();
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", onTap, { passive: true });

    document.addEventListener("pointermove", onMove, { passive: true });
    if (!reduce)
      document.addEventListener("pointermove", onParallax, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onTap);
      document.removeEventListener("pointermove", onParallax);
    };
  }, [pathname]);

  return <div ref={bar} className="progress" aria-hidden="true" />;
}
