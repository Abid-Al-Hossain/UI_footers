"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Structure controls for native layout/page-structure generation."><Slider label="Columns" value={state.columnCount} min={1} max={6} step={1} onChange={(value) => update("columnCount", value)} />
<Slider label="Links" value={state.linkCount} min={1} max={12} step={1} onChange={(value) => update("linkCount", value)} /></SectionCard>;
}
