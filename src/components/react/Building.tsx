/**
 * Cross-section of a whole building, drawn like a technical sheet. Five zones, each with
 * a "problem" layer and a "treated" layer:
 *   0 kelder · 1 muurvoet · 2 gevel · 3 balkon en beton · 4 binnenlucht
 * The homepage hero shows it treated and calm; BuildingStory walks through the zones.
 * No hooks, so Astro can also render it as static HTML.
 */
export type ZoneState = 'problem' | 'dim' | 'treated';

/**
 * Where each zone sits in the 480×520 drawing: hero markers and the active outline use this.
 * `align` says which side of the marker label grows to, so labels near the edge stay inside.
 */
export const ZONES = [
  { marker: [240, 362], align: 'center', box: [72, 298, 336, 144] },
  { marker: [124, 262], align: 'center', box: [68, 228, 82, 74] },
  { marker: [18, 166], align: 'start', box: [12, 78, 88, 224] },
  { marker: [470, 160], align: 'end', box: [394, 140, 72, 62] },
  { marker: [240, 128], align: 'center', box: [90, 18, 300, 170] },
] as const;

export const VIEW = { w: 480, h: 520 };

const LINE = '#052842';
const WALL = '#ebe3d6';
const SLAB = '#d9cbb5';
const ROOM = '#fbf9f5';
const WATER = '#2f92c9';
const FIX = '#0a5086';
const SPARK = '#00c0ff';

const fade = 'transition-opacity duration-700 ease-out';
const problemOpacity = (s: ZoneState) => (s === 'problem' ? 1 : s === 'dim' ? 0.4 : 0);
const treatedOpacity = (s: ZoneState) => (s === 'treated' ? 1 : 0);

export default function Building({ states, active = -1, id, label }: { states: ZoneState[]; active?: number; id: string; label: string }) {
  const p = (i: number) => ({ className: fade, style: { opacity: problemOpacity(states[i]) } });
  const f = (i: number) => ({ className: fade, style: { opacity: treatedOpacity(states[i]) } });
  const u = (name: string) => `url(#${id}-${name})`;

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="block size-full" role="img" aria-label={label}>
      <defs>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="#e4dacb" strokeWidth="0.6" />
        </pattern>
        <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={WALL} />
          <path d="M0 0v6" stroke="#cdbb9f" strokeWidth="1" />
        </pattern>
        <pattern id={`${id}-soil`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#e6dac7" />
          <circle cx="3" cy="4" r="0.9" fill="#c9b79c" />
          <circle cx="10" cy="10" r="0.7" fill="#c9b79c" />
        </pattern>
        <pattern id={`${id}-insul`} width="8" height="10" patternUnits="userSpaceOnUse">
          <rect width="8" height="10" fill="#f5f0e8" />
          <path d="M0 5c2-4 6-4 8 0" fill="none" stroke="#9c8566" strokeWidth="0.8" />
        </pattern>
        <linearGradient id={`${id}-wet`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={WATER} stopOpacity="0.75" />
          <stop offset="1" stopColor={WATER} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={VIEW.w} height={VIEW.h} fill={u('grid')} />

      {/* Ground and groundwater */}
      <rect y="300" width={VIEW.w} height="220" fill={u('soil')} />
      <path d="M0 300H480" stroke={LINE} strokeOpacity="0.5" />
      <path d="M0 404c20-4 40 4 60 0s40-4 60 0 40 4 60 0 40-4 60 0 40 4 60 0 40-4 60 0 40 4 60 0 40-4 60 0V520H0Z" fill="#d6ecf8" />
      <path d="M0 404c20-4 40 4 60 0s40-4 60 0 40 4 60 0 40-4 60 0 40 4 60 0 40-4 60 0 40 4 60 0 40-4 60 0" fill="none" stroke={WATER} strokeOpacity="0.5" strokeDasharray="4 4" />

      {/* Rooms */}
      <rect x="94" y="84" width="292" height="100" fill={ROOM} />
      <rect x="94" y="196" width="292" height="100" fill={ROOM} />
      <rect x="94" y="308" width="292" height="112" fill="#f3eee6" />
      <path d="M100 74 240 28l140 46Z" fill={ROOM} />

      {/* Roof, slabs, walls */}
      <path d="M58 78 240 14l182 64h-16L240 30 74 78Z" fill={SLAB} stroke={LINE} strokeOpacity="0.55" strokeLinejoin="round" />
      <g fill={SLAB} stroke={LINE} strokeOpacity="0.55">
        <rect x="80" y="74" width="320" height="10" />
        <rect x="80" y="184" width="378" height="12" />
        <rect x="80" y="296" width="320" height="12" />
        <rect x="74" y="420" width="332" height="14" />
      </g>
      <g fill={u('hatch')} stroke={LINE} strokeOpacity="0.55">
        <rect x="80" y="84" width="14" height="100" />
        <rect x="386" y="84" width="14" height="26" />
        <rect x="80" y="196" width="14" height="100" />
        <rect x="386" y="196" width="14" height="100" />
        <rect x="80" y="308" width="14" height="112" />
        <rect x="386" y="308" width="14" height="112" />
      </g>
      {/* Windows, balcony door, balcony railing */}
      <g fill="#d6ecf8" stroke={LINE} strokeOpacity="0.55">
        <rect x="80" y="104" width="14" height="44" />
        <rect x="386" y="216" width="14" height="50" />
      </g>
      <path d="M389 112v72m8-72v72" stroke={LINE} strokeOpacity="0.4" />
      <path d="M400 150h58m-2 0v34m-18-34v34m-18-34v34" fill="none" stroke={LINE} strokeOpacity="0.55" strokeWidth="1.5" />

      {/* 0 · Kelder: water through the kimnaad → bekuiping, drainage, pompput */}
      <g {...p(0)}>
        <rect x="94" y="352" width="12" height="68" fill={u('wet')} />
        <rect x="374" y="352" width="12" height="68" fill={u('wet')} />
        <ellipse cx="240" cy="418" rx="118" ry="3" fill={WATER} opacity="0.6" />
        <g fill="none" stroke={WATER} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 424h40m-7-6 7 6-7 6" />
          <path d="M428 424h-40m7-6-7 6 7 6" />
          <path d="M240 470v-38m-6 7 6-7 6 7" />
        </g>
      </g>
      <g {...f(0)}>
        <path d="M99 312v105h282V312" fill="none" stroke={FIX} strokeWidth="4" />
        <path d="M106 412h232" stroke={SPARK} strokeWidth="2.5" strokeDasharray="4 4" className="animate-[airflow_1.6s_linear_infinite]" />
        <rect x="342" y="412" width="30" height="28" fill="#fff" stroke={FIX} strokeWidth="1.5" />
        <rect x="350" y="422" width="14" height="13" rx="2" fill={FIX} />
        <path d="M357 422v-96h22" fill="none" stroke={FIX} strokeWidth="2" />
      </g>

      {/* 1 · Muurvoet: rising damp → injection barrier */}
      <g {...p(1)}>
        <rect x="80" y="230" width="14" height="66" fill={u('wet')} />
        <rect x="94" y="240" width="44" height="56" fill={u('wet')} opacity="0.6" />
        {[86, 90, 88].map((x, i) => (
          <circle key={i} cx={x} cy={290 - i * 14} r="1.6" fill={SPARK} className="animate-[seep_3s_ease-in_infinite]" style={{ animationDelay: `${i * 0.8}s` }} />
        ))}
      </g>
      <g {...f(1)}>
        <rect x="78" y="284" width="18" height="5" rx="2.5" fill={SPARK} />
        <path d="M60 286.5h16" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
        <rect x="46" y="282" width="14" height="9" rx="2" fill={FIX} />
      </g>

      {/* 2 · Gevel: driving rain → repair, water-repellent protection, insulation */}
      <g {...p(2)}>
        <g stroke={WATER} strokeWidth="1.6" strokeLinecap="round">
          {[[30, 96], [52, 118], [24, 150], [60, 176], [34, 206], [56, 236], [28, 262]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y}l-6 14`} className="animate-[rain_1.4s_linear_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
        <rect x="80" y="150" width="14" height="34" fill={u('wet')} />
        <rect x="80" y="196" width="14" height="30" fill={u('wet')} opacity="0.7" />
      </g>
      <g {...f(2)}>
        <rect x="70" y="84" width="10" height="212" fill={u('insul')} stroke={FIX} strokeOpacity="0.6" />
        <path d="M69 84v212" stroke={SPARK} strokeWidth="2" />
        <g fill={SPARK}>
          {[110, 160, 210, 260].map((y) => <circle key={y} cx="62" cy={y} r="2.2" />)}
        </g>
      </g>

      {/* 3 · Balkon en beton: rusting rebar, spalling → repair + coating */}
      <g {...p(3)}>
        <path d="M418 184l3 5-3 3 2 4m22-12-2 4 3 4" fill="none" stroke="#7a3b1e" strokeWidth="1.2" />
        <g fill="#b4643f">
          <circle cx="410" cy="190" r="2.4" />
          <circle cx="430" cy="191" r="2" />
          <circle cx="449" cy="189" r="2.6" />
        </g>
        <path d="M446 196h12l-4 6-6-2Z" fill="#b4643f" opacity="0.7" />
      </g>
      <g {...f(3)}>
        <rect x="400" y="184" width="58" height="12" fill={SLAB} stroke={LINE} strokeOpacity="0.55" />
        <rect x="400" y="180" width="58" height="4" rx="1" fill={FIX} />
      </g>

      {/* 4 · Binnenlucht: condensation and mould → ventilation */}
      <g {...p(4)}>
        <rect x="94" y="84" width="292" height="100" fill={WATER} opacity="0.12" />
        {[108, 116, 124, 132, 140].map((y, i) => <circle key={y} cx={i % 2 ? 99 : 97} cy={y} r="1.6" fill={WATER} />)}
        <g fill="#3f4a3c">
          {[[376, 92], [370, 98], [380, 101], [364, 90], [374, 108], [381, 113]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.4 + (i % 3) * 0.6} />)}
        </g>
      </g>
      <g {...f(4)}>
        <rect x="212" y="50" width="56" height="18" rx="3" fill="#fff" stroke={FIX} strokeWidth="1.5" />
        <circle cx="228" cy="59" r="5" fill="none" stroke={FIX} />
        <circle cx="252" cy="59" r="5" fill="none" stroke={FIX} />
        <path d="M224 68v18m32-18v18" stroke={FIX} strokeWidth="3" />
        <g fill="none" stroke={SPARK} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 6" className="animate-[airflow_1.2s_linear_infinite]">
          <path d="M256 92c30 10 60 30 100 30" />
          <path d="M140 140c30-30 60-44 84-48" />
          <path d="M256 96v100" />
        </g>
      </g>

      {/* Active zone */}
      {active >= 0 && (
        <rect
          x={ZONES[active].box[0]}
          y={ZONES[active].box[1]}
          width={ZONES[active].box[2]}
          height={ZONES[active].box[3]}
          rx="10"
          fill="none"
          stroke={SPARK}
          strokeWidth="2"
          strokeDasharray="6 5"
          className="transition-all duration-500 ease-out"
        />
      )}
    </svg>
  );
}
