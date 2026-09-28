'use client'

import { useEffect, useRef } from 'react'
import { useAurora } from './AuroraContext'

/**
 * Aurora
 * ------
 * Adapted from the ThreeUI PortalFieldCollection "Cloud Field" variant (raw
 * WebGL renderer, no Three.js dependency). The migrating-layer structure and the
 * domain-warped fBm are kept from the reference; the field itself is rebuilt as
 * an aurora.
 *
 * Real aurorae are green at the base and magenta in the crown. This one runs the
 * Ano Energy ramp instead: restrained gold along the energized lower edge, forest green
 * through the body, and paper white only where the curtains overlap hardest. The field
 * stays inside the institutional green-and-gold system defined by the build brief.
 *
 * Four curtains at different depths, each with its own drifting lower edge,
 * upward falloff and vertical ray striation. Behind them a star field that the
 * curtains occlude.
 *
 * Interactivity, all driven from AuroraContext:
 *   uPointer   pointer bends the nearest curtain toward the cursor
 *   uLean      sections and hovered cards tilt the whole sky
 *   uCharge    scroll velocity and CTA hover brighten it and speed the rays
 *   uPulse     a click sends a bright band travelling across the sky
 *
 * Pauses offscreen and on tab blur. Renders one settled frame under
 * prefers-reduced-motion. Falls back to a CSS gradient with no WebGL.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;   // -1 … 1
uniform float uLean;      // -1 … 1
uniform float uCharge;    //  0 … 1
uniform float uPulse;     //  0 … 1  travel position, <0 when idle
uniform float uPulseX;    //  0 … 1  where the surge started

const vec3 INK    = vec3(0.045, 0.145, 0.100);
const vec3 DEEP   = vec3(0.106, 0.263, 0.196);
const vec3 GREEN  = vec3(0.176, 0.416, 0.310);
const vec3 GOLD   = vec3(0.851, 0.706, 0.290);
const vec3 PAPER  = vec3(0.933, 0.949, 0.969);

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),                  hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

const mat2 ROT = mat2(0.80, 0.60, -0.60, 0.80);

// four octaves is enough for a curtain edge and keeps the fill rate sane
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = ROT * p * 2.03;
    a *= 0.5;
  }
  return v;
}

/*
  One aurora curtain.

  The lower edge is a drifting fBm ridge. Above it the sheet fades exponentially,
  and vertical rays are cut into it by a second noise field scrolling upward,
  which is what gives an aurora its combed look rather than reading as fog.

  Returns intensity in .x and height above the edge in .y, so the caller can
  ramp colour along the curtain.
*/
vec2 curtain(
  vec2 p, float t, float seed,
  float freq, float amp, float height, float raySpeed
) {
  float drift = t * (0.012 + 0.007 * seed);   // slow enough to read as weather

  // lower edge, warped so the ribbon folds back on itself
  vec2  q     = vec2(p.x * freq + seed * 7.3, drift);
  float w     = fbm(q + vec2(fbm(q * 1.7), 0.0));
  float edge  = amp * (w - 0.5) - 0.12 * seed;

  float h = p.y - edge;
  if (h < 0.0 || h > height * 3.2) return vec2(0.0, 0.0);

  float fade = exp(-h / height);
  float lip  = smoothstep(0.0, 0.035, h);           // hot lower lip
  float top  = 1.0 - smoothstep(height * 1.9, height * 3.2, h);

  // vertical rays, scrolling upward through the sheet
  float rays = vnoise(vec2(p.x * (15.0 + seed * 6.0) + seed * 31.0, p.y * 1.1 - t * raySpeed));
  // gentle combing only. Hard striation is what made this read as busy.
  rays = 0.58 + 0.52 * rays;
  rays *= 0.78 + 0.26 * vnoise(vec2(p.x * 44.0 + seed * 5.0, p.y * 0.6 - t * raySpeed * 1.2));

  return vec2(lip * fade * top * rays, h);
}

/*
  Gold along the lip, green through the body, cooling at the crown. Both ends
  are pulled back toward the base tone so the curtain glows rather than burns.
*/
vec3 ramp(float h, float height) {
  float k = clamp(h / (height * 2.1), 0.0, 1.0);
  vec3 c = mix(GOLD * 0.78, GREEN * 1.03, smoothstep(0.05, 0.60, k));
  return mix(c, GREEN * 0.48, smoothstep(0.60, 1.0, k));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p  = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float t  = uTime;
  float ch = uCharge;

  // ---------- night sky ----------
  vec3 col = mix(INK * 0.85, DEEP, smoothstep(-0.1, 0.9, uv.y));

  // stars, behind everything, denser toward the top
  vec2  sc  = floor(gl_FragCoord.xy / 3.0);
  float st  = hash(sc);
  float twk = 0.6 + 0.4 * sin(t * 1.4 + st * 62.8);
  float star = smoothstep(0.9975, 1.0, st) * twk * smoothstep(-0.2, 0.6, p.y);
  col += PAPER * star * 0.75;

  // ---------- curtains ----------
  // pointer bends the sky; lean tilts it; both are gentle on purpose
  float bend = uPointer.x * 0.035 + uLean * 0.06;
  vec2  pp   = vec2(p.x + bend * (0.35 + p.y), p.y - uPointer.y * 0.010);

  // a surge travels left to right from wherever it was fired
  float px    = uPulseX * 2.0 - 1.0;
  float head  = px + uPulse * 1.9;
  float surge = uPulse < 0.0
    ? 0.0
    : smoothstep(0.90, 0.0, abs(pp.x - head)) * (1.0 - uPulse) * 0.55;

  vec3 glow = vec3(0.0);
  float cover = 0.0;

  // seed, freq, amp, height, raySpeed, weight
  const int N = 3;
  for (int i = 0; i < N; i++) {
    float fi = float(i);
    float depth = fi / float(N - 1);              // 0 far … 1 near

    float freq   = 0.55 + depth * 1.55;
    float amp    = 0.34 - depth * 0.10;
    float height = 0.30 - depth * 0.115;
    float rspd   = (0.055 + depth * 0.075) * (1.0 + ch * 0.35);

    // parallax: near curtains react more to the pointer
    vec2 cp = vec2(pp.x + uPointer.x * depth * 0.020, pp.y);

    vec2 c = curtain(cp, t, fi * 0.37, freq, amp, height, rspd);
    float a = c.x * (0.55 + 0.45 * depth);

    a *= 1.0 + surge * 0.55;
    a *= 0.82 + ch * 0.22;

    glow  += ramp(c.y, height) * a;
    cover += a;
  }

  // white-hot only where curtains stack
  // no hard white core. The brightest the sky gets is a wash.
  glow += PAPER * smoothstep(0.95, 2.4, cover) * 0.16;

  // ground haze picking up the aurora from below
  glow += GREEN * 0.13 * smoothstep(0.55, -0.35, p.y) * (0.4 + 0.6 * min(cover, 1.0));

  col += glow;

  // ---------- legibility and finish ----------
  // damp the left column where the copy sits
  col *= 1.0 - 0.30 * smoothstep(0.62, -0.18, p.x);

  float vig = smoothstep(1.45, 0.20, length(p * vec2(0.80, 1.0)));
  col *= 0.52 + 0.48 * vig;

  // dither, otherwise wide dark gradients band badly on 8-bit panels
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Aurora shader:', gl.getShaderInfoLog(sh))
    }
    gl.deleteShader(sh)
    return null
  }
  return sh
}

const PULSE_SECONDS = 4.2

export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { leanRef, chargeRef, pulseRef, pulseXRef, setSupported } = useAurora()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      setSupported(false)
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      setSupported(false)
      return
    }

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setSupported(false)
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(prog, 'uRes'),
      time: gl.getUniformLocation(prog, 'uTime'),
      pointer: gl.getUniformLocation(prog, 'uPointer'),
      lean: gl.getUniformLocation(prog, 'uLean'),
      charge: gl.getUniformLocation(prog, 'uCharge'),
      pulse: gl.getUniformLocation(prog, 'uPulse'),
      pulseX: gl.getUniformLocation(prog, 'uPulseX'),
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const target = { x: 0, y: 0 }
    const eased = { x: 0, y: 0, lean: 0, charge: 0 }

    let raf = 0
    let clock = 0
    let last = performance.now()
    let visible = true
    let running = false

    /*
      Scrolling used to charge the sky, which made the whole page feel restless.
      It now does the opposite: fast scrolling eases the curtains DOWN toward a
      calm floor and they drift back up once you settle on a section. Motion
      belongs to the page while you are moving, and to the sky once you stop.
    */
    let lastScrollY = window.scrollY
    let settle = 0

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      // the curtains are expensive per pixel, so back the ratio off on big screens
      const cap = w > 1600 ? 1.1 : w > 1024 ? 1.35 : 1.6
      const dpr = Math.min(window.devicePixelRatio || 1, cap)
      const pw = Math.max(1, Math.round(w * dpr))
      const ph = Math.max(1, Math.round(h * dpr))
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
        gl.viewport(0, 0, pw, ph)
      }
      gl.uniform2f(u.res, canvas.width, canvas.height)
    }

    const draw = () => {
      const since = performance.now() / 1000 - pulseRef.current
      const pulse = since >= 0 && since < PULSE_SECONDS ? since / PULSE_SECONDS : -1
      gl.uniform1f(u.time, clock)
      gl.uniform2f(u.pointer, eased.x, eased.y)
      gl.uniform1f(u.lean, eased.lean)
      gl.uniform1f(u.charge, eased.charge)
      gl.uniform1f(u.pulse, pulse)
      gl.uniform1f(u.pulseX, pulseXRef.current)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      clock += dt

      settle = Math.max(0, settle - dt * 0.55)

      // long easing constants. Every reaction takes seconds, not frames.
      eased.x += (target.x - eased.x) * 0.014
      eased.y += (target.y - eased.y) * 0.014
      eased.lean += (leanRef.current - eased.lean) * 0.009

      const wantCharge = Math.max(0, Math.min(1, chargeRef.current) - settle)
      eased.charge += (wantCharge - eased.charge) * 0.012

      draw()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reduced.matches || !visible) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = 1 - (e.clientY / window.innerHeight) * 2
    }

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      settle = Math.min(0.7, settle + dy / 2600)
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        if (!running) draw()
      }, 120)
    }

    const onVisibility = () => (document.hidden ? stop() : start())

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onMotionChange = () => {
      if (reduced.matches) {
        stop()
        clock = 24
        draw()
      } else {
        start()
      }
    }

    resize()
    if (reduced.matches) {
      clock = 24
      draw()
    } else {
      draw()
      start()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reduced.addEventListener?.('change', onMotionChange)

    return () => {
      stop()
      io.disconnect()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      reduced.removeEventListener?.('change', onMotionChange)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [chargeRef, leanRef, pulseRef, pulseXRef, setSupported])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(180deg,#0c2b1e_0%,#1B4332_58%,#102e21_100%)]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* contrast floor for the copy column, never rely on the shader alone */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,35,24,0.88)_0%,rgba(8,35,24,0.58)_42%,rgba(8,35,24,0.04)_78%,rgba(8,35,24,0.26)_100%)]" />
    </div>
  )
}
