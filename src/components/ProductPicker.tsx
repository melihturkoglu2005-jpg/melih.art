"use client";

import { useState } from "react";
import type { LightboxItem } from "@/data/lightbox";
import type { Img } from "@/data/projects/types";
import ZoomImage from "./ZoomImage";

type Item = { title: string; text: string; thumb: Img; preview: Img };

export default function ProductPicker({
  items,
  list,
}: {
  items: Item[];
  list: LightboxItem[];
}) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];

  return (
    <div className="picker">
      <div className="picker-cards" role="group" aria-label="Ekranlar">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className="picker-card"
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
          >
            <span className="picker-media">
              <img
                src={item.thumb.src}
                alt={item.thumb.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </span>
            <strong>{item.title}</strong>
            <span className="picker-text">{item.text}</span>
          </button>
        ))}
      </div>

      <figure className="picker-preview" key={current.title} aria-live="polite">
        <ZoomImage
          id={current.preview.src}
          list={list}
          ratio={current.preview.ratio}
        />
        <figcaption>{current.title}</figcaption>
      </figure>
    </div>
  );
}
