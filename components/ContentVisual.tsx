"use client";

import { useRef, useState, type CSSProperties, type TouchEvent } from "react";
import type { PlanConfig } from "@/data/planConfigs";

type ContentType = "reels" | "carousel" | "stories";

const CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: "reels", label: "Reels" },
  { id: "carousel", label: "Carruseles" },
  { id: "stories", label: "Stories" }
];

type Props = {
  activePlan: PlanConfig;
};

export default function ContentVisual({ activePlan }: Props) {
  const [activeType, setActiveType] = useState<ContentType>("reels");
  const touchStartX = useRef<number | null>(null);

  const activeIndex = CONTENT_TYPES.findIndex((type) => type.id === activeType);

  const goTo = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), CONTENT_TYPES.length - 1);
    setActiveType(CONTENT_TYPES[clamped].id);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) goTo(activeIndex + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const reelsLabel = `${activePlan.reelsRangeLabel ?? activePlan.reelsPerMonth} vídeos/mes`;
  const storiesLabel =
    activePlan.storiesDaysPerMonth === "daily" ? "Diarias" : `${activePlan.storiesDaysPerMonth} días/mes`;

  return (
    <div className="visual-card content-visual">
      <div className="content-tabs" role="tablist" aria-label="Tipo de contenido">
        {CONTENT_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={activeType === type.id}
            className={`content-tab${activeType === type.id ? " is-active" : ""}`}
            onClick={() => setActiveType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="content-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {activeType === "carousel" ? (
          <CarouselPreview count={activePlan.postsPerMonth} />
        ) : (
          <div className="phone-device content-phone">
            <div className="phone-notch" aria-hidden="true" />
            <div className="phone-screen">
              {activeType === "reels" ? <ReelScreen label={reelsLabel} /> : <StoryScreen label={storiesLabel} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReelScreen({ label }: { label: string }) {
  return (
    <div className="reel-content-screen">
      <div className="reel-content-actions" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="reel-content-meta">
        <span>REEL · 9:16</span>
        <strong>{label}</strong>
        <p>Grabación, edición y adaptación a cada plataforma.</p>
      </div>
    </div>
  );
}

function StoryScreen({ label }: { label: string }) {
  return (
    <div className="story-content-screen">
      <div className="story-progress" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="story-content-meta">
        <span>STORY · 9:16</span>
        <strong>{label}</strong>
        <p>Contenido dinámico y espontáneo para mantener la marca presente.</p>
      </div>
    </div>
  );
}

function CarouselPreview({ count }: { count: number }) {
  const slides = [1, 2, 3, 4, 5];
  const centerIndex = 2;

  return (
    <div className="carousel-stack">
      <div className="carousel-slides">
        {slides.map((n) => {
          const offset = n - 1 - centerIndex;
          const distance = Math.abs(offset);
          const style: CSSProperties = {
            transform: `translateX(${offset * 40}px) rotate(${offset * 6}deg) scale(${1 - distance * 0.08})`,
            zIndex: 10 - distance
          };
          return (
            <div key={n} className="carousel-slide" style={style}>
              <span>{n}/5</span>
            </div>
          );
        })}
      </div>
      <div className="carousel-meta">
        <strong>{count} carruseles/mes</strong>
        <p>Publicaciones de varias piezas para contar más en cada post.</p>
      </div>
    </div>
  );
}
