"use client";

import type { CSSProperties } from "react";
import type { FooterState } from "../types";

function box(state: FooterState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    margin: state.margin,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    transition: state.motion ? "all 180ms ease" : undefined,
  };
}

export default function LivePreview({ state }: { state: FooterState }) {
  const columns = Array.from({ length: state.columnCount }, (_, index) => `Column ${index + 1}`);
  const links = Array.from({ length: state.linkCount }, (_, index) => `Link ${index + 1}`);
  const style = box(state);
  const compact = state.previewState === "collapsed" || state.previewState === "mobile";

  return (
    <footer id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>
      <div className="grid" style={{ gap: state.gap }}>
        <section aria-labelledby={`${state.id}-brand`} className="grid" style={{ gap: Math.max(8, state.gap / 2) }}>
          <h2 id={`${state.id}-brand`} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h2>
          <p style={{ color: state.muted, fontSize: state.bodySize, maxWidth: 620 }}>{state.description}</p>
          {state.showNewsletter && (
            <form className="flex flex-wrap" style={{ gap: Math.max(8, state.gap / 2) }} onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor={`${state.id}-email`}>Email address</label>
              <input id={`${state.id}-email`} type="email" placeholder="you@example.com" className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: state.border, background: "transparent", color: state.foreground }} />
              <button type="submit" className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: state.accent, color: state.background }}>Subscribe</button>
            </form>
          )}
        </section>
        <nav aria-label={`${state.landmarkLabel} links`} className="grid" style={{ gap: state.gap, gridTemplateColumns: compact ? "1fr" : `repeat(${state.columnCount}, minmax(0, 1fr))` }}>
          {columns.map((column, columnIndex) => (
            <section key={column} aria-labelledby={`${state.id}-column-${columnIndex}`} className="grid content-start" style={{ gap: Math.max(6, state.gap / 2) }}>
              <h3 id={`${state.id}-column-${columnIndex}`} className="text-xs uppercase tracking-[0.16em]" style={{ color: state.accent }}>{column}</h3>
              {links.filter((_, index) => index % columns.length === columnIndex).map((link, linkIndex) => (
                <a key={link} href="#" aria-current={state.previewState === "active" && columnIndex === 0 && linkIndex === 0 ? "page" : undefined} className="text-sm" style={{ color: state.previewState === "hover" && linkIndex === 0 ? state.foreground : state.muted }}>
                  {link}
                </a>
              ))}
            </section>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between border-t pt-4" style={{ borderColor: state.border, gap: state.gap }}>
          {state.showLegal && <small style={{ color: state.muted }}>Copyright 2026 {state.title}. Privacy, Terms, Security.</small>}
          {state.showSocial && <nav aria-label={`${state.landmarkLabel} social links`} className="flex" style={{ gap: Math.max(8, state.gap / 2) }}>{["X", "In", "Git"].map((item) => <a key={item} href="#" className="rounded-full border px-3 py-2 text-sm font-semibold" style={{ borderColor: state.border, color: state.foreground }}>{item}</a>)}</nav>}
        </div>
      </div>
    </footer>
  );
}
