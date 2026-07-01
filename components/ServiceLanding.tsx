"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { services, type ServiceId } from "@/data/services";
import FeatureSection from "./FeatureSection";
import FloatingNav from "./FloatingNav";
import LeftPanel from "./LeftPanel";

export default function ServiceLanding() {
  const [activeId, setActiveId] = useState<ServiceId>(services[0].id);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const railDotRef = useRef<HTMLSpanElement | null>(null);
  const sectionRefs = useRef(new Map<ServiceId, HTMLElement>());

  const setSectionRef = useCallback((id: ServiceId, node: HTMLElement | null) => {
    if (node) sectionRefs.current.set(id, node);
    else sectionRefs.current.delete(id);
  }, []);

  const scrollToSection = useCallback((id: ServiceId) => {
    const target = sectionRefs.current.get(id);
    if (!target) return;

    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    if (isMobile) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    scrollerRef.current?.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }, []);

  const updateRail = useCallback(() => {
    const scroller = scrollerRef.current;
    const railDot = railDotRef.current;
    if (!scroller || !railDot) return;

    const max = scroller.scrollHeight - scroller.clientHeight;
    const progress = max > 0 ? scroller.scrollTop / max : 0;
    const y = 88 + progress * (window.innerHeight - 176);
    railDot.style.top = `${y}px`;
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const createObserver = () => {
      observer?.disconnect();
      const isMobile = window.matchMedia("(max-width: 860px)").matches;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible?.target.id) setActiveId(visible.target.id as ServiceId);
        },
        {
          root: isMobile ? null : scrollerRef.current,
          threshold: [0.35, 0.5, 0.65],
          rootMargin: isMobile ? "-30% 0px -45% 0px" : "-24% 0px -46% 0px"
        }
      );

      sectionRefs.current.forEach((section) => observer?.observe(section));
    };

    createObserver();

    const scroller = scrollerRef.current;
    let animationFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateRail);
    };
    const onResize = () => {
      createObserver();
      updateRail();
    };

    scroller?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateRail();

    return () => {
      observer?.disconnect();
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [updateRail]);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />

      <main className="page-shell">
        <LeftPanel services={services} activeId={activeId} onNavigate={scrollToSection} />

        <section className="right-frame" aria-label="Detalle del pack premium">
          <div className="rail" aria-hidden="true">
            <span className="rail-dot" ref={railDotRef} />
            <div className="rail-ticks" />
          </div>

          <div className="right-scroller" id="serviceScroller" ref={scrollerRef}>
            <div className="top-line" aria-hidden="true" />
            <div className="announcement"><span /> Gestión mensual para marcas locales que no quieren redes de adorno <b>→</b></div>

            {services.map((service) => (
              <FeatureSection
                key={service.id}
                service={service}
                active={activeId === service.id}
                setSectionRef={setSectionRef}
              />
            ))}
          </div>
        </section>
      </main>

      <FloatingNav onNavigate={scrollToSection} />
    </>
  );
}
