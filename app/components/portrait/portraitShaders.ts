export const portraitVertexShader = /* glsl */ `
precision highp float;

// Per-particle attributes
attribute vec3 aOriginalColor;
attribute vec4 aData;       // x: size, y: alpha, z: featureWeight, w: phase
attribute vec3 aDispersal;   // initial dispersed position for assembly

// Uniforms
uniform float uTime;
uniform float uProgress;          // Assembly progress 0.0 -> 1.0
uniform float uScrollProgress;    // Scroll dissolve progress 0.0 -> 1.0
uniform vec3 uPointer;            // Pointer position in world space
uniform vec2 uPointerVelocity;    // Smoothed pointer velocity
uniform float uPointerInfluence;  // Radius of pointer influence
uniform float uPointerStrength;   // Max repulsion strength
uniform float uPixelRatio;
uniform float uReducedMotion;     // 1.0 if reduced-motion active, else 0.0
uniform float uIdleNoiseAmp;

// Varyings to fragment shader
varying vec3 vColor;
varying float vAlpha;
varying float vHotspot;

// Simple 3D procedural noise
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z
  );
}

// Cubic ease out
float easeOutCubic(float t) {
  return 1.0 - pow(1.0 - t, 3.0);
}

void main() {
  vec3 restingPos = position;
  float size = aData.x;
  float baseAlpha = aData.y;
  float featWeight = aData.z; // 1.0 = core facial feature, 0.0 = outer sparkle
  float phase = aData.w;

  // Pass base color to fragment shader
  vColor = aOriginalColor;

  if (uReducedMotion > 0.5) {
    // PREFERS-REDUCED-MOTION: Completely stable, unmoving portrait
    vec4 mvPosition = modelViewMatrix * vec4(restingPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(size * uPixelRatio * (12.0 / -mvPosition.z), 1.0, 14.0);
    vAlpha = baseAlpha;
    vHotspot = 0.5 + 0.5 * featWeight;
    return;
  }

  // -------------------------------------------------------------
  // ANIMATION A: INITIAL ASSEMBLY (Dispersal -> Target)
  // Stagger arrival: core features anchor first, outer points trail
  // -------------------------------------------------------------
  float arrivalDelay = (1.0 - featWeight * 0.45) * phase * 0.35;
  float pClamped = clamp((uProgress - arrivalDelay) / (1.0 - arrivalDelay + 0.0001), 0.0, 1.0);
  float assemblyEase = easeOutCubic(pClamped);

  // Curved flight path with gentle vortex decay
  float vortexAngle = (1.0 - assemblyEase) * 2.2 * (phase - 0.5);
  mat2 rot = mat2(cos(vortexAngle), -sin(vortexAngle), sin(vortexAngle), cos(vortexAngle));
  vec3 flightDispersal = aDispersal;
  flightDispersal.xy = rot * flightDispersal.xy;

  vec3 currentPos = mix(flightDispersal, restingPos, assemblyEase);

  // -------------------------------------------------------------
  // ANIMATION B: LIVING IDLE MOTION (Noise, Breathing, Shimmer)
  // -------------------------------------------------------------
  // Face features have minimal noise (<0.006) to preserve likeness;
  // Hair and silhouette edges have organic flowing micro-drift.
  float noiseIntensity = uIdleNoiseAmp * (1.0 - featWeight * 0.75);

  vec3 noiseCoord = restingPos * 1.8 + vec3(uTime * 0.18, uTime * 0.12, uTime * 0.15);
  vec3 idleDrift = vec3(
    (noise(noiseCoord) - 0.5) * 2.0,
    (noise(noiseCoord + vec3(43.1, 12.3, 7.8)) - 0.5) * 2.0,
    (noise(noiseCoord + vec3(17.4, 91.2, 54.3)) - 0.5) * 2.0
  ) * noiseIntensity;

  // Gentle breathing oscillation (period ~4.2s)
  float breathing = sin(uTime * 1.49 + restingPos.y * 0.8) * 0.012;
  idleDrift.y += breathing * (1.0 - featWeight * 0.5);
  idleDrift.z += breathing * 0.6;

  // Add idle motion only as assembly approaches completion
  currentPos += idleDrift * assemblyEase;

  // -------------------------------------------------------------
  // ANIMATION C: POINTER / CURSOR INTERACTION (Non-Evacuating Wave)
  // Replaced radial void expulsion with gentle depth deflection and shimmer.
  // Never creates a hollow black hole in the face.
  // -------------------------------------------------------------
  vec2 toPointer = currentPos.xy - uPointer.xy;
  float distToPointer = length(toPointer);

  if (distToPointer < uPointerInfluence && uProgress > 0.6) {
    float normDist = distToPointer / uPointerInfluence;
    // Smooth cosine wave falloff [0 to 1]
    float wave = 0.5 * (1.0 + cos(normDist * 3.14159));

    // Direction influenced by mouse velocity
    vec2 velDir = uPointerVelocity * 0.08;

    // Gentle micro-deflection in XY (soft wave ripple, NO radial expulsion!)
    vec2 softRipple = vec2(
      sin(currentPos.y * 12.0 + uTime * 3.0),
      cos(currentPos.x * 12.0 + uTime * 3.0)
    ) * wave * 0.018;

    // Subtle Z depression (ripples inward into depth)
    float waveDepth = -wave * 0.07 * (1.0 - featWeight * 0.4);

    currentPos.xy += softRipple + velDir * wave;
    currentPos.z += waveDepth;
  }

  // -------------------------------------------------------------
  // ANIMATION D: SCROLL DISSOLVE (Hero exit)
  // -------------------------------------------------------------
  float scrollAlphaFactor = 1.0;
  if (uScrollProgress > 0.001) {
    // Cohesion decreases, particles drift upward and outward
    float scrollStagger = (1.0 - featWeight * 0.5) * phase * 0.25;
    float sProg = clamp((uScrollProgress - scrollStagger) / (1.0 - scrollStagger + 0.0001), 0.0, 1.0);
    float sEase = pow(sProg, 1.8);

    vec3 scrollDrift = vec3(
      (phase - 0.5) * 1.2 * sEase,
      -sEase * 1.6, // drift downwards with scroll flow
      (noise(restingPos * 3.0 + vec3(uTime * 0.5)) - 0.5) * 1.4 * sEase
    );

    currentPos += scrollDrift;
    scrollAlphaFactor = max(0.0, 1.0 - sProg * 1.3);
  }

  // -------------------------------------------------------------
  // POINT SIZE & ALPHA CALCULATION
  // -------------------------------------------------------------
  vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Perspective attenuation for point size
  float pSize = size * uPixelRatio * (5.4 / -mvPosition.z);
  gl_PointSize = clamp(pSize, 1.0, 7.5);

  // Subtle living shimmer (period varies per particle)
  float shimmer = 0.88 + 0.12 * sin(uTime * 2.8 + phase * 6.2831);

  // Assembly opacity ramp: smoothly fade in
  float assemblyAlpha = smoothstep(0.0, 0.35, pClamped);

  vAlpha = baseAlpha * shimmer * assemblyAlpha * scrollAlphaFactor;
  vHotspot = 0.5 + 0.5 * featWeight;
}
`;

export const portraitFragmentShader = /* glsl */ `
precision highp float;

varying vec3 vColor;
varying float vAlpha;
varying float vHotspot;

void main() {
  // Circular point sprite distance from center [0.0 to 0.5]
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  // Discard fragments outside circular radius
  if (dist > 0.5) {
    discard;
  }

  // Soft Gaussian-like antialiased edge falloff
  float edge = smoothstep(0.5, 0.15, dist);

  // High-intensity luminous core hotspot in particle center
  float core = pow(clamp(1.0 - dist * 2.2, 0.0, 1.0), 2.5);

  // Warm champagne/gold luminous center boost
  vec3 hotWhite = vec3(1.0, 0.97, 0.92);
  vec3 finalColor = mix(vColor, hotWhite, core * 0.45 * vHotspot);

  float finalAlpha = vAlpha * edge;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;
