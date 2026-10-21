export const portraitVertexShader = /* glsl */ `
precision highp float;

attribute vec3 aOriginalColor;
attribute vec4 aData; // size, opacity, feature weight, deterministic phase
attribute vec2 aDispersal;
uniform float uTime;
uniform float uProgress;
uniform float uScrollProgress;
uniform vec3 uPointer;
uniform vec2 uPointerVelocity;
uniform float uPointerActivity;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uPixelRatio;
uniform float uPointScale;
uniform float uReducedMotion;
uniform float uIdleNoiseAmp;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float feature = aData.z;
  float phase = aData.w;
  float motion = 1.0 - uReducedMotion;
  // The photograph defines the final XY positions. No reconstructed anatomy.
  float delay = 0.08 + phase * 0.22 + (1.0 - feature) * 0.08;
  float arrival = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
  arrival = mix(arrival, 1.0, uReducedMotion);
  float resolve = 1.0 - pow(1.0 - arrival, 4.0);
  vec3 flight = position + vec3(aDispersal * 0.12 + vec2(0.0, 0.06), 0.0);
  vec3 pos = mix(flight, position, resolve);

  // Subpixel idle movement preserves the facial expression and silhouette.
  float drift = sin(position.y * 3.0 + uTime * 0.32)
              * cos(position.x * 2.5 + uTime * 0.24);
  pos.xy += vec2(drift, sin(position.x * 2.0 + uTime * 0.28))
            * uIdleNoiseAmp * (1.0 - feature * 0.8) * motion * resolve;

  // A small, local radial disturbance eases back to the photographic anchors.
  vec2 fromPointer = position.xy - uPointer.xy;
  float distanceToPointer = length(fromPointer);
  float falloff = 1.0 - smoothstep(0.0, uPointerInfluence, distanceToPointer);
  float influence = falloff * falloff * uPointerActivity * motion * resolve;
  vec2 direction = fromPointer / max(distanceToPointer, 0.035);
  pos.xy += (direction + uPointerVelocity * 0.12)
            * influence * uPointerStrength * (1.0 - feature * 0.2);

  // Deterministic scroll exit retraces naturally. Reduced motion only fades.
  float exitDelay = phase * 0.16 + feature * 0.06;
  float exitProgress = clamp((uScrollProgress - exitDelay) / (1.0 - exitDelay), 0.0, 1.0);
  float dissolve = exitProgress * exitProgress;
  pos.xy += (aDispersal * vec2(0.30, 0.23) + vec2(0.0, -0.14))
            * dissolve * motion;

  // Photo-derived opacity carries the real eyes, lips and facial shadows.
  // Directional mesh lighting would flatten or invent those characteristics.
  vColor = aOriginalColor * (1.0 + sin(uTime * 0.19 + position.x) * 0.018 * motion);
  vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  // Identical fine footprint in every motion mode, independent of DPR.
  gl_PointSize = clamp(aData.x * uPointScale * uPixelRatio,
                      0.8 * uPixelRatio, 2.25 * uPixelRatio);
  float reveal = smoothstep(0.0, 0.45, arrival);
  vAlpha = aData.y * reveal * (1.0 - smoothstep(0.12, 1.0, exitProgress));
}
`;

export const portraitFragmentShader = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float radius = length(gl_PointCoord - vec2(0.5));
  // Crisp discs with only the outer edge antialiased; no luminous core/bloom.
  // Unbounded derivatives on a one-pixel sprite erase the entire luminous
  // area. Limit antialiasing to the circumference, including low-DPR screens.
  float edgeWidth = clamp(fwidth(radius), 0.035, 0.10);
  float coverage = 1.0 - smoothstep(0.5 - edgeWidth, 0.5, radius);
  float alpha = vAlpha * coverage;
  if (alpha < 0.008) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;
