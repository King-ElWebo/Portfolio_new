export const portraitVertexShader = /* glsl */ `
precision highp float;

attribute vec3 aOriginalColor;
attribute vec3 aSurfaceNormal;
attribute vec4 aData; // size, opacity, feature weight, deterministic phase
attribute vec3 aDispersal;
uniform float uTime;
uniform float uProgress;
uniform float uScrollProgress;
uniform vec3 uPointer;
uniform vec2 uPointerVelocity;
uniform float uPointerActivity;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uPixelRatio;
uniform float uReducedMotion;
uniform float uIdleNoiseAmp;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float feature = aData.z;
  float phase = aData.w;
  float motion = 1.0 - uReducedMotion;
  // Facial anchors gather from a nearby depth veil, followed by the outline.
  float delay = 0.09 + phase * 0.18 + (1.0 - feature) * 0.18;
  float arrival = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
  arrival = mix(arrival, 1.0, uReducedMotion);
  float resolve = 1.0 - pow(1.0 - arrival, 4.0);
  vec3 flight = position + vec3(aDispersal.x * 0.14,
    0.12 + aDispersal.y * 0.10, -0.40 + aDispersal.z * 0.10);
  vec3 pos = mix(flight, position, resolve);

  // Slow, coherent surface motion keeps facial anchors nearly stationary.
  float breath = sin(uTime * 0.85) * 0.0018;
  float drift = sin(position.y * 3.0 + uTime * 0.32)
              * cos(position.x * 2.5 + uTime * 0.24);
  pos += aSurfaceNormal * (drift * uIdleNoiseAmp * (1.0 - feature * 0.8)
         + breath * 0.35) * motion * resolve;

  // Bounded depth ripple; fading activity releases particles in place.
  float distanceToPointer = length(position.xy - uPointer.xy);
  float falloff = 1.0 - smoothstep(0.0, uPointerInfluence, distanceToPointer);
  float influence = falloff * falloff * uPointerActivity * motion * resolve;
  pos.z -= influence * uPointerStrength * (1.0 - feature * 0.55);
  pos.xy += uPointerVelocity * influence * uPointerStrength * 0.12;
  pos.z += sin(distanceToPointer * 18.0 - uTime * 2.0)
           * influence * uPointerStrength * 0.12;

  // Deterministic scroll exit retraces naturally. Reduced motion only fades.
  float exitDelay = phase * 0.14 + feature * 0.14;
  float exitProgress = clamp((uScrollProgress - exitDelay) / (1.0 - exitDelay), 0.0, 1.0);
  float dissolve = exitProgress * exitProgress;
  pos += vec3(aDispersal.x * 0.10, -0.34 - phase * 0.18, aDispersal.z * 0.10)
         * dissolve * motion;

  // Approximate normals of the existing surface, not reconstructed anatomy.
  vec3 normal = normalize(mat3(modelMatrix) * aSurfaceNormal);
  float lightTravel = sin(uTime * 0.22) * 0.035 * motion;
  vec3 key = normalize(vec3(-0.55 + lightTravel, 0.65, 0.75));
  vec3 fill = normalize(vec3(0.65, 0.15, 0.70));
  float light = 0.18 + 0.70 * max(dot(normal, key), 0.0)
                    + 0.13 * max(dot(normal, fill), 0.0);
  vColor = aOriginalColor * light;
  vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  // Identical fine footprint in every motion mode, independent of DPR.
  gl_PointSize = clamp(aData.x * 1.5 * uPixelRatio * (3.5 / -viewPosition.z),
                      1.25 * uPixelRatio, 2.2 * uPixelRatio);
  float reveal = smoothstep(0.0, 0.28, arrival);
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
