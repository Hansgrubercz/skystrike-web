import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_5kQaEW44U0o5gPhbsQcMM00";
import { User, Play, Building2, Wind, Waves, Flame, Snowflake, Biohazard, Rocket, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TranslationKeys } from "@/i18n/translations";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { FadeText } from "@/components/FadeText";
import { cn } from "@/lib/utils";
import axelPilot from "@/assets/axel_pilot.png";
import ghostAsset from "@/assets/ghost.png.asset.json";
import saraAsset from "@/assets/sara.png.asset.json";
import barneyAsset from "@/assets/barney.png.asset.json";
import phantomIcon from "@/assets/f47x-phantom.png.asset.json";
import thunderboltIcon from "@/assets/a12-thunderbolt.png.asset.json";
import wraithIcon from "@/assets/n01-wraith.png.asset.json";
import hovertankIcon from "@/assets/t99-hovertank.png.asset.json";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SkyStrike Overdrive | Official Site" },
      {
        name: "description",
        content:
          "High-speed zero-G racing and combat evolved. Dominate 7 deadly environments at full speed.",
      },
      { property: "og:title", content: "SkyStrike Overdrive | Official Site" },
      {
        property: "og:description",
        content:
          "High-speed zero-G racing and combat evolved. Dominate 7 deadly environments at full speed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type PilotId = "interceptor" | "ghost" | "voltrider" | "titan";

const VESSEL_ICON: Record<PilotId, string> = {
  interceptor: phantomIcon.url,
  ghost:       thunderboltIcon.url,
  voltrider:   wraithIcon.url,
  titan:       hovertankIcon.url,
};

const VESSEL_NAME: Record<PilotId, string> = {
  interceptor: "F-47X PHANTOM",
  ghost:       "A-12 THUNDERBOLT",
  voltrider:   "N-01 WRAITH",
  titan:       "T-99 HOVER-TANK",
};

const VESSEL_CLASS: Record<PilotId, string> = {
  interceptor: "STEALTH INTERCEPTOR",
  ghost:       "HEAVY ASSAULT",
  voltrider:   "NEON INTERCEPTOR",
  titan:       "SIEGE PLATFORM",
};

type Pilot = {
  id: PilotId;
  nameKey: "shipInterceptor" | "shipGhost" | "shipVoltRider" | "shipTitan";
  callsignKey: "callsignInterceptor" | "callsignGhost" | "callsignVoltRider" | "callsignTitan";
  classKey: "pilotClassInterceptor" | "pilotClassGhost" | "pilotClassVoltRider" | "pilotClassTitan";
  bioKey: "pilotBioInterceptor" | "pilotBioGhost" | "pilotBioVoltRider" | "pilotBioTitan";
  avatar?: string;
  artwork?: string;
};

const VESSEL_STATS: Record<PilotId, { speed: number; armor: number; handling: number; energy: number }> = {
  interceptor: { speed: 92, armor: 55, handling: 88, energy: 70 },
  ghost:       { speed: 60, armor: 95, handling: 50, energy: 85 },
  voltrider:   { speed: 98, armor: 40, handling: 82, energy: 92 },
  titan:       { speed: 45, armor: 99, handling: 38, energy: 78 },
};



const PILOTS: Pilot[] = [
  {
    id: "interceptor",
    nameKey: "shipInterceptor",
    callsignKey: "callsignInterceptor",
    classKey: "pilotClassInterceptor",
    bioKey: "pilotBioInterceptor",
    avatar: axelPilot,
    artwork: axelPilot,
  },
  {
    id: "ghost",
    nameKey: "shipGhost",
    callsignKey: "callsignGhost",
    classKey: "pilotClassGhost",
    bioKey: "pilotBioGhost",
    avatar: ghostAsset.url,
    artwork: ghostAsset.url,
  },
  {
    id: "voltrider",
    nameKey: "shipVoltRider",
    callsignKey: "callsignVoltRider",
    classKey: "pilotClassVoltRider",
    bioKey: "pilotBioVoltRider",
    avatar: saraAsset.url,
    artwork: saraAsset.url,
  },
  {
    id: "titan",
    nameKey: "shipTitan",
    callsignKey: "callsignTitan",
    classKey: "pilotClassTitan",
    bioKey: "pilotBioTitan",
    avatar: barneyAsset.url,
    artwork: barneyAsset.url,
  },
];

type SectorId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Sector = {
  id: SectorId;
  icon: LucideIcon;
  nameKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  classified?: boolean;
};

const SECTORS: Sector[] = [
  { id: 1, icon: Building2, nameKey: "sector1Name", descKey: "sector1Desc" },
  { id: 2, icon: Wind,      nameKey: "sector2Name", descKey: "sector2Desc" },
  { id: 3, icon: Waves,     nameKey: "sector3Name", descKey: "sector3Desc" },
  { id: 4, icon: Flame,     nameKey: "sector4Name", descKey: "sector4Desc" },
  { id: 5, icon: Snowflake, nameKey: "sector5Name", descKey: "sector5Desc" },
  { id: 6, icon: Biohazard, nameKey: "sector6Name", descKey: "sector6Desc" },
  { id: 7, icon: Rocket,    nameKey: "sector7Name", descKey: "sector7Desc" },
  { id: 8, icon: Lock,      nameKey: "sectorClassifiedName", descKey: "sectorClassifiedDesc", classified: true },
];


function Index() {
  const { t } = useLanguage();
  const [selectedPilot, setSelectedPilot] = React.useState<PilotId | null>(null);
  const [activeVesselId, setActiveVesselId] = React.useState<PilotId>("interceptor");
  const [selectedSector, setSelectedSector] = React.useState<SectorId | null>(null);
  const [trailerOpen, setTrailerOpen] = React.useState(false);
  const activePilot = PILOTS.find((p) => p.id === selectedPilot) ?? null;
  const activeSector = SECTORS.find((s) => s.id === selectedSector) ?? null;
  const stats = VESSEL_STATS[activeVesselId];

  return (
    <div className="relative min-h-screen text-white">
      <div className="city-bg" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <span className="font-orbitron text-lg font-black tracking-widest text-glow">
            SKYSTRIKE<span className="text-[#00f2ff]">OVERDRIVE</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/50 md:inline">
            ◉ <FadeText>{t.cloudSynced}</FadeText>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-primary rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          >
            <FadeText>{t.buyNow}</FadeText>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-orbitron text-5xl font-black tracking-[0.15em] text-glow md:text-8xl">
          SKYSTRIKE
        </h1>
        <div className="mt-2 font-orbitron text-lg font-semibold uppercase tracking-[0.5em] text-[#00f2ff] md:text-2xl" style={{ textShadow: "0 0 12px rgba(0,242,255,0.7)" }}>
          OVERDRIVE
        </div>
        <p className="mt-6 max-w-2xl text-xl font-light text-white/90 md:text-2xl">
          <FadeText>{t.heroTagline}</FadeText>
        </p>
        <p className="mt-4 rounded-md border border-[#00f2ff]/40 bg-black/40 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[#00f2ff]/90">
          <FadeText>{t.heroSubtitle}</FadeText>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-primary inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-bold uppercase tracking-widest"
          >
            <FadeText>{t.fullGame}</FadeText>
          </a>
          <a
            href="https://maverickbit.itch.io/sky-strike-overdrive"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-secondary inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-bold uppercase tracking-widest"
          >
            <FadeText>{t.freeDemo}</FadeText>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setTrailerOpen(true)}
          title="Watch Trailer"
          aria-label="Watch Trailer"
          className="group absolute bottom-24 flex h-14 w-14 items-center justify-center rounded-full border border-[#00f2ff]/40 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,255,0.25)] transition-all hover:scale-110 hover:border-[#00f2ff] hover:bg-black/70 hover:shadow-[0_0_30px_rgba(0,242,255,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f2ff]"
        >
          <Play className="h-5 w-5 translate-x-[1px] fill-[#00f2ff] text-[#00f2ff] transition-transform group-hover:scale-110" />
          <span className="pointer-events-none absolute -bottom-6 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#00f2ff]/80 opacity-0 transition-opacity group-hover:opacity-100">
            Watch Trailer
          </span>
        </button>

        <div className="absolute bottom-10 cyber-arrow text-3xl" aria-hidden="true">
          ▼
        </div>
      </section>

      <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
        <DialogContent className="max-w-4xl border-[#00f2ff]/40 bg-black p-0 shadow-[0_0_40px_rgba(0,242,255,0.4)]">
          <DialogTitle className="sr-only">SkyStrike Trailer</DialogTitle>
          <div className="relative aspect-video w-full">
            {trailerOpen && (
              <iframe
                className="absolute inset-0 h-full w-full rounded-md"
                src="https://www.youtube.com/embed/B8xovembK0E?autoplay=1"
                title="SkyStrike Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Content sections */}
      {/* Content sections */}
      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 px-6 pb-16 md:grid-cols-2">
        {/* Combat Vessels / Pilot Selector */}
        <div className="glass rounded-2xl p-4 flex flex-col h-full">
          <div className="mb-3">
            <h2 className="font-orbitron text-lg font-bold tracking-wider">
              <FadeText>{t.combatVessels}</FadeText>
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              <FadeText>{t.selectNeuralLink}</FadeText>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PILOTS.map((pilot) => (
              <button
                key={pilot.id}
                type="button"
                onClick={() => { setActiveVesselId(pilot.id); setSelectedPilot(pilot.id); }}
                className={cn(
                  "ship-card flex items-center gap-2.5 rounded-lg p-2.5 text-left",
                  activeVesselId === pilot.id && "active",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black/60 ring-1 ring-[#00f2ff]/40 shadow-[0_0_10px_rgba(0,242,255,0.25)_inset]">
                  <img
                    src={VESSEL_ICON[pilot.id]}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain p-1"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate font-orbitron text-[11px] font-bold tracking-wider">
                    <FadeText>{VESSEL_NAME[pilot.id]}</FadeText>
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-[#00f2ff]">
                    <FadeText>{VESSEL_CLASS[pilot.id]}</FadeText>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Vessel Preview */}
          <div className="mt-4 flex-1 rounded-xl border border-[#00f2ff]/25 bg-black/40 p-4 shadow-[0_0_20px_rgba(0,242,255,0.15)_inset]">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                <FadeText>{t.statActiveVessel}</FadeText>
              </span>
              <span className="rounded-full border border-[#00f2ff]/40 bg-[#00f2ff]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#00f2ff]">
                ● {t.online}
              </span>
            </div>

            <div className="relative flex items-center gap-4">
              <div className="relative flex h-24 w-32 shrink-0 items-center justify-center rounded-lg border border-[#00f2ff]/30 bg-gradient-to-br from-black via-[#0a0a1a] to-black overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,242,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l-2 border-t-2 border-[#00f2ff]" />
                <div aria-hidden="true" className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r-2 border-t-2 border-[#00f2ff]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-[#00f2ff]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-[#00f2ff]" />
                <img
                  key={activeVesselId}
                  src={VESSEL_ICON[activeVesselId]}
                  alt=""
                  aria-hidden="true"
                  className="relative z-10 h-full w-full object-contain p-2 animate-in fade-in duration-300"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-orbitron text-sm font-black tracking-wider text-glow truncate">
                  <FadeText>{VESSEL_NAME[activeVesselId]}</FadeText>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#00f2ff] mb-2">
                  <FadeText>{VESSEL_CLASS[activeVesselId]}</FadeText>
                </div>
                <div className="space-y-1.5">
                  {([
                    ["speed", t.statSpeed, stats.speed],
                    ["armor", t.statArmor, stats.armor],
                    ["handling", t.statHandling, stats.handling],
                    ["energy", t.statEnergy, stats.energy],
                  ] as const).map(([k, label, value]) => (
                    <div key={k}>
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest">
                        <span className="text-white/60"><FadeText>{label}</FadeText></span>
                        <span className="text-[#00f2ff] font-bold">{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          key={`${activeVesselId}-${k}`}
                          className="h-full rounded-full bg-gradient-to-r from-[#00f2ff] to-[#7df9ff] shadow-[0_0_8px_rgba(0,242,255,0.6)] transition-[width] duration-700 ease-out"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pilot Detail Modal */}
        <Dialog open={selectedPilot !== null} onOpenChange={(open) => !open && setSelectedPilot(null)}>
          <DialogContent className="max-w-lg border-[#00f2ff]/40 bg-[#050510] p-0 shadow-[0_0_50px_rgba(0,242,255,0.35)]">
            <DialogTitle className="sr-only">
              {activePilot ? t[activePilot.nameKey] : "Pilot Details"}
            </DialogTitle>
            {activePilot && (
              <div className="relative overflow-hidden rounded-lg">
                {/* HUD frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#00f2ff]/20 bg-gradient-to-br from-black via-[#0a0a1a] to-black">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,242,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[#00f2ff]" />
                  <div aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-[#00f2ff]" />
                  <div aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-[#00f2ff]" />
                  <div aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-[#00f2ff]" />
                  {activePilot.artwork ? (
                    <img
                      src={activePilot.artwork}
                      alt={t[activePilot.nameKey]}
                      className="relative z-0 h-full w-full object-contain object-center p-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-white/60">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                        <User className="h-10 w-10 text-white/50" aria-hidden="true" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em]">Artwork classified</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-orbitron text-xl font-black tracking-wider text-glow">
                        <FadeText>{t[activePilot.nameKey]}</FadeText>
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-[#00f2ff]">
                        <FadeText>{t[activePilot.classKey]}</FadeText>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-white/50">
                        <FadeText>{t.pilotCallsign}</FadeText>
                      </div>
                      <div className="font-orbitron text-sm font-bold tracking-wider text-white">
                        <FadeText>{t[activePilot.callsignKey]}</FadeText>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    <FadeText>{t[activePilot.bioKey]}</FadeText>
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Global Sectors */}
        <div className="glass rounded-2xl p-6 flex flex-col h-full">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="font-orbitron text-xl font-bold tracking-wider">
                <FadeText>{t.globalSectors}</FadeText>
              </h2>
              <p className="text-xs uppercase tracking-widest text-white/50">
                <FadeText>{t.hyperloopStatus}</FadeText>
              </p>
            </div>
            <span className="rounded-full border border-[#00f2ff]/40 bg-[#00f2ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#00f2ff]">
              7 <FadeText>{t.online}</FadeText>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {SECTORS.map((sector) => {
              const Icon = sector.icon;
              const num = String(sector.id).padStart(2, "0");
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setSelectedSector(sector.id)}
                  title={sector.classified ? t.sectorLockedText : t[sector.nameKey]}
                  className={cn(
                    "group relative flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-all",
                    sector.classified
                      ? "border-fuchsia-500/50 bg-fuchsia-500/5 hover:border-fuchsia-400 hover:shadow-[0_0_18px_rgba(217,70,239,0.55)]"
                      : "border-[#00f2ff]/25 bg-black/30 hover:border-[#00f2ff] hover:bg-[#00f2ff]/5 hover:shadow-[0_0_18px_rgba(0,242,255,0.45)]",
                  )}
                >
                  <span className={cn(
                    "absolute left-1.5 top-1 font-orbitron text-[9px] font-bold tracking-widest",
                    sector.classified ? "text-fuchsia-400/80" : "text-[#00f2ff]/70",
                  )}>
                    {num}
                  </span>
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-transform group-hover:scale-110",
                      sector.classified ? "text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" : "text-[#00f2ff]",
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn(
                    "line-clamp-1 text-center text-[9px] font-semibold uppercase tracking-wider",
                    sector.classified ? "text-fuchsia-300/80" : "text-white/70",
                  )}>
                    {sector.classified ? t.sectorLockedText.split(" ").slice(0, 2).join(" ") : t[sector.nameKey]}
                  </span>
                  {sector.classified && (
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg bg-[repeating-linear-gradient(45deg,transparent_0_6px,rgba(217,70,239,0.08)_6px_12px)]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4">
            <h3 className="font-orbitron text-sm font-bold tracking-wider text-[#00f2ff]">
              <FadeText>{t.whySkystrike}</FadeText>
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-white/70 list-disc pl-5">
              <li><FadeText>{t.featureEnvironments}</FadeText></li>
              <li><FadeText>{t.featureOffline}</FadeText></li>
              <li><FadeText>{t.featureVisuals}</FadeText></li>
              <li><FadeText>{t.featureKeyboard}</FadeText></li>
              <li><FadeText>{t.featureTryDemo}</FadeText></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sector Detail Modal */}
      <Dialog open={selectedSector !== null} onOpenChange={(open) => !open && setSelectedSector(null)}>
        <DialogContent
          className={cn(
            "max-w-md p-0",
            activeSector?.classified
              ? "border-fuchsia-500/50 bg-[#0d0417] shadow-[0_0_50px_rgba(217,70,239,0.4)]"
              : "border-[#00f2ff]/40 bg-[#050510] shadow-[0_0_50px_rgba(0,242,255,0.35)]",
          )}
        >
          <DialogTitle className="sr-only">
            {activeSector ? t[activeSector.nameKey] : "Sector"}
          </DialogTitle>
          {activeSector && (() => {
            const Icon = activeSector.icon;
            const accent = activeSector.classified ? "text-fuchsia-400" : "text-[#00f2ff]";
            const border = activeSector.classified ? "border-fuchsia-500/40" : "border-[#00f2ff]/30";
            const num = String(activeSector.id).padStart(2, "0");
            return (
              <div className="relative overflow-hidden rounded-lg">
                <div className={cn("relative flex aspect-[5/2] items-center justify-center border-b bg-gradient-to-br from-black via-[#0a0a1a] to-black", border)}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: activeSector.classified
                        ? "linear-gradient(rgba(217,70,239,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.2) 1px, transparent 1px)"
                        : "linear-gradient(rgba(0,242,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <Icon className={cn("relative h-20 w-20 drop-shadow-[0_0_12px_currentColor]", accent)} aria-hidden="true" />
                  <span className={cn("absolute left-4 top-3 font-orbitron text-xs font-bold tracking-widest", accent)}>SECTOR {num}</span>
                  <div aria-hidden="true" className={cn("pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2", border)} />
                  <div aria-hidden="true" className={cn("pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2", border)} />
                  <div aria-hidden="true" className={cn("pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2", border)} />
                  <div aria-hidden="true" className={cn("pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2", border)} />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={cn("font-orbitron text-lg font-black tracking-wider", activeSector.classified ? "text-fuchsia-400" : "text-glow")}>
                      <FadeText>{t[activeSector.nameKey]}</FadeText>
                    </h3>
                    <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest", border, accent)}>
                      {activeSector.classified ? <FadeText>{t.sectorLockedText}</FadeText> : <FadeText>{t.sectorStatusActive}</FadeText>}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    <FadeText>{t[activeSector.descKey]}</FadeText>
                  </p>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>



      {/* Contact */}
      <section id="contact" className="relative z-10 border-t border-white/5 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-orbitron text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">
            <FadeText>{t.contactTitle}</FadeText>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            <FadeText>{t.contactDesc}</FadeText>
          </p>
          <a
            href="mailto:info@skystrikeoverdrive.com"
            className="mt-6 inline-flex items-center gap-3 rounded-md border border-cyan-400/40 bg-black/40 px-6 py-3 font-orbitron text-sm uppercase tracking-widest text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-white hover:shadow-[0_0_25px_rgba(0,242,255,0.35)]"
          >
            <FadeText>{t.contactEmailLabel}</FadeText>
            <span className="text-white/90">info@skystrikeoverdrive.com</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
        <FadeText>{t.footer}</FadeText>
      </footer>
    </div>
  );
}
