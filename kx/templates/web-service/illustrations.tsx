import type { ComponentType } from "react";

// Decorative line drawings for the "todo dentro" stage, one per feat, in feat order.
// Colours, stroke widths and motion live in landing.css (`.ws-illu` and `.wsi-*`):
// every class maps to a theme token, so both themes work without touching this file.
// Static geometry is the final frame; the CSS keyframes animate *towards* it, which is
// what makes `prefers-reduced-motion` show a finished drawing.

type IllustrationProps = { className: string };

// Every drawing sits inside x 40–360, y 20–220, so all five render at the same scale.
const VIEW_BOX = "40 20 320 200";

// 01 — Design & build: a wireframe assembles inside a browser frame while a pointer places each block.
function DesignBuild({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <rect className="wsi-ink" x="72" y="26" width="256" height="188" />
      <path className="wsi-mid" d="M72 44 H328" />
      <path className="wsi-mid" d="M82 32 h5 v5 h-5 Z M92 32 h5 v5 h-5 Z M102 32 h5 v5 h-5 Z" />
      <path className="wsi-rule wsi-guide" d="M92 52 V206 M164 52 V206 M236 52 V206 M308 52 V206" />

      <g className="wsi-x wsi-s1">
        <rect className="wsi-mid" x="92" y="56" width="216" height="12" />
        <path className="wsi-mid" d="M100 62 H116 M252 62 H264 M270 62 H282 M288 62 H300" />
      </g>
      <g className="wsi-x wsi-s2">
        <path className="wsi-ink wsi-heavy" d="M92 86 H212 M92 100 H190" />
        <path className="wsi-mid" d="M92 114 H176" />
      </g>
      <g className="wsi-up wsi-s3">
        <rect className="wsi-mid" x="236" y="80" width="72" height="54" />
        <path className="wsi-rule" d="M236 80 L308 134 M308 80 L236 134" />
      </g>
      <g className="wsi-y wsi-s4">
        <rect className="wsi-mid" x="92" y="152" width="64" height="46" />
        <path className="wsi-mid" d="M100 160 h8 v8 h-8 Z M100 182 H144 M100 190 H130" />
      </g>
      <g className="wsi-y wsi-s5">
        <rect className="wsi-mid" x="168" y="152" width="64" height="46" />
        <path className="wsi-mid" d="M176 160 h8 v8 h-8 Z M176 182 H220 M176 190 H206" />
      </g>
      <g className="wsi-y wsi-s6">
        <rect className="wsi-mid" x="244" y="152" width="64" height="46" />
        <path className="wsi-mid" d="M252 160 h8 v8 h-8 Z M252 182 H296 M252 190 H282" />
      </g>
      <rect className="wsi-fill-acc wsi-x wsi-s7" x="92" y="124" width="44" height="12" />

      <path
        className="wsi-pointer wsi-ink wsi-fill-bg"
        d="M126 130 v17 l4.5 -4 l3 7 l3 -1.3 l-3 -7 h6 Z"
      />
    </svg>
  );
}

// 02 — Hosting: a rack with blinking status lights serves packets out to a turning globe.
function Hosting({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <rect className="wsi-ink" x="64" y="62" width="112" height="32" />
      <rect className="wsi-ink" x="64" y="102" width="112" height="32" />
      <rect className="wsi-ink" x="64" y="142" width="112" height="32" />
      <path
        className="wsi-mid"
        d="M76 72 V84 M82 72 V84 M88 72 V84 M94 72 V84 M76 112 V124 M82 112 V124 M88 112 V124 M94 112 V124 M76 152 V164 M82 152 V164 M88 152 V164 M94 152 V164"
      />
      <path className="wsi-mid" d="M144 75 h6 v6 h-6 Z M144 115 h6 v6 h-6 Z M144 155 h6 v6 h-6 Z" />
      <rect className="wsi-fill-acc wsi-led" x="156" y="75" width="6" height="6" />
      <rect className="wsi-fill-acc wsi-led wsi-led-2" x="156" y="115" width="6" height="6" />
      <rect className="wsi-fill-acc wsi-led wsi-led-3" x="156" y="155" width="6" height="6" />
      <path className="wsi-mid" d="M56 186 H184 M76 174 V186 M164 174 V186" />

      <path className="wsi-rule wsi-guide" d="M176 118 H248" />
      <rect className="wsi-fill-acc wsi-packet" x="182" y="115" width="6" height="6" />
      <rect className="wsi-fill-acc wsi-packet wsi-packet-2" x="204" y="115" width="6" height="6" />
      <rect className="wsi-fill-acc wsi-packet wsi-packet-3" x="226" y="115" width="6" height="6" />

      <circle className="wsi-ink" cx="300" cy="118" r="52" />
      <path className="wsi-mid" d="M248 118 H352" />
      <path className="wsi-rule" d="M255 92 H345 M255 144 H345" />
      <ellipse className="wsi-mid wsi-meridian" cx="300" cy="118" rx="52" ry="52" />
      <ellipse className="wsi-mid wsi-meridian wsi-meridian-2" cx="300" cy="118" rx="52" ry="52" />
      <ellipse className="wsi-mid wsi-meridian wsi-meridian-3" cx="300" cy="118" rx="52" ry="52" />
    </svg>
  );
}

// 03 — Maintenance: a scan line ticks a checklist off, the gear keeps turning, the version moves up.
function Maintenance({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <rect className="wsi-ink" x="56" y="38" width="184" height="164" />
      <path className="wsi-mid" d="M56 58 H240" />
      <path className="wsi-mid" d="M66 45 h5 v5 h-5 Z M76 45 h5 v5 h-5 Z" />

      <path className="wsi-mid" d="M70 75 h14 v14 h-14 Z M70 105 h14 v14 h-14 Z M70 135 h14 v14 h-14 Z M70 165 h14 v14 h-14 Z" />
      <path className="wsi-mid" d="M98 82 H214 M98 112 H192 M98 142 H206 M98 172 H180" />
      <path className="wsi-ok wsi-draw wsi-s1" pathLength={1} d="M73 82 L76.5 85.5 L81.5 78.5" />
      <path className="wsi-ok wsi-draw wsi-s2" pathLength={1} d="M73 112 L76.5 115.5 L81.5 108.5" />
      <path className="wsi-ok wsi-draw wsi-s3" pathLength={1} d="M73 142 L76.5 145.5 L81.5 138.5" />
      <path className="wsi-ok wsi-draw wsi-s4" pathLength={1} d="M73 172 L76.5 175.5 L81.5 168.5" />
      <path className="wsi-acc wsi-scan" d="M62 72 H234" />

      <g transform="translate(306 96) scale(1.25)">
        <path
          className="wsi-ink wsi-gear"
          d="M22.3 -5.6 L29.4 -5.9 L29.4 5.9 L22.3 5.6 L19.7 11.8 L24.9 16.7 L16.7 24.9 L11.8 19.7 L5.6 22.3 L5.9 29.4 L-5.9 29.4 L-5.6 22.3 L-11.8 19.7 L-16.7 24.9 L-24.9 16.7 L-19.7 11.8 L-22.3 5.6 L-29.4 5.9 L-29.4 -5.9 L-22.3 -5.6 L-19.7 -11.8 L-24.9 -16.7 L-16.7 -24.9 L-11.8 -19.7 L-5.6 -22.3 L-5.9 -29.4 L5.9 -29.4 L5.6 -22.3 L11.8 -19.7 L16.7 -24.9 L24.9 -16.7 L19.7 -11.8 Z"
        />
        <circle className="wsi-mid" cx="0" cy="0" r="8" />
      </g>

      <rect className="wsi-mid" x="262" y="152" width="88" height="28" />
      <text className="wsi-text wsi-ver-old" x="306" y="171" textAnchor="middle">v2.4.1</text>
      <text className="wsi-text wsi-ver-new" x="306" y="171" textAnchor="middle">v2.4.2</text>
    </svg>
  );
}

// 04 — Support: a question arrives, a real person types, the answer comes back.
function Support({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <g className="wsi-up wsi-s1">
        <path className="wsi-mid wsi-fill-bg" d="M44 40 H204 V88 H82 L66 100 V88 H44 Z" />
        <path className="wsi-mid" d="M60 57 H186 M60 71 H150" />
      </g>

      <g className="wsi-typing">
        <path className="wsi-mid wsi-fill-bg" d="M244 140 H300 V166 H290 V176 L280 166 H244 Z" />
        <circle className="wsi-fill-mid wsi-dot" cx="259" cy="153" r="2.5" />
        <circle className="wsi-fill-mid wsi-dot wsi-dot-2" cx="272" cy="153" r="2.5" />
        <circle className="wsi-fill-mid wsi-dot wsi-dot-3" cx="285" cy="153" r="2.5" />
      </g>

      <g className="wsi-up wsi-s6">
        <path className="wsi-acc wsi-fill-bg" d="M132 118 H300 V166 H290 V176 L280 166 H132 Z" />
      </g>
      <path className="wsi-ink wsi-x wsi-s7" d="M148 135 H284 M148 149 H236" />

      <circle className="wsi-ink" cx="334" cy="136" r="11" />
      <path className="wsi-ink" d="M312 190 V180 C312 168 320 160 334 160 C348 160 356 168 356 180 V190" />
      <rect className="wsi-fill-ok" x="343" y="121" width="6" height="6" />
    </svg>
  );
}

// 05 — Evolution: modules stack column by column while a stepped line climbs over them.
function Evolution({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <path className="wsi-rule wsi-guide" d="M56 172 H344 M56 116 H344 M56 60 H344" />
      <path className="wsi-mid" d="M56 30 V200 H344" />

      <g className="wsi-y wsi-s1">
        <rect className="wsi-mid" x="80" y="176" width="36" height="24" />
      </g>
      <g className="wsi-y wsi-s2">
        <rect className="wsi-mid" x="132" y="176" width="36" height="24" />
        <rect className="wsi-mid" x="132" y="148" width="36" height="24" />
      </g>
      <g className="wsi-y wsi-s3">
        <rect className="wsi-mid" x="184" y="176" width="36" height="24" />
        <rect className="wsi-mid" x="184" y="148" width="36" height="24" />
        <rect className="wsi-mid" x="184" y="120" width="36" height="24" />
      </g>
      <g className="wsi-y wsi-s4">
        <rect className="wsi-mid" x="236" y="176" width="36" height="24" />
        <rect className="wsi-mid" x="236" y="148" width="36" height="24" />
        <rect className="wsi-mid" x="236" y="120" width="36" height="24" />
        <rect className="wsi-mid" x="236" y="92" width="36" height="24" />
      </g>
      <g className="wsi-y wsi-s5">
        <rect className="wsi-mid" x="288" y="176" width="36" height="24" />
        <rect className="wsi-mid" x="288" y="148" width="36" height="24" />
        <rect className="wsi-mid" x="288" y="120" width="36" height="24" />
        <rect className="wsi-mid" x="288" y="92" width="36" height="24" />
        <rect className="wsi-mid" x="288" y="64" width="36" height="24" />
      </g>

      <path
        className="wsi-acc wsi-draw wsi-climb"
        pathLength={1}
        d="M72 166 H124 V138 H176 V110 H228 V82 H280 V54 H332"
      />
      <path className="wsi-acc wsi-up wsi-s7" d="M322 44 L332 54 L322 64" />
    </svg>
  );
}

export const wsIllustrations: ReadonlyArray<ComponentType<IllustrationProps>> = [
  DesignBuild,
  Hosting,
  Maintenance,
  Support,
  Evolution,
];
