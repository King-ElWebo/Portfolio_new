export interface ParticleConfig {
  /** Maximum particles to draw on desktop (default: 42000) */
  maxDesktopParticles: number;
  /** Maximum particles to draw on tablet (default: 26000) */
  maxTabletParticles: number;
  /** Maximum particles to draw on mobile (default: 16000) */
  maxMobileParticles: number;
  /** Radius of pointer influence in 3D world space (default: 0.48) */
  pointerInfluence: number;
  /** Maximum repulsion strength under cursor (default: 0.32) */
  repulsionStrength: number;
  /** Damping / lerp factor for pointer tracking (default: 0.075) */
  damping: number;
  /** Idle noise amplitude for breathing and living motion (default: 0.025) */
  idleNoiseAmp: number;
  /** Depth parallax response to cursor (default: 0.035) */
  depthParallaxAmp: number;
  /** Duration of initial assembly animation in seconds (default: 2.2) */
  assemblyDuration: number;
}

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  maxDesktopParticles: 42000,
  maxTabletParticles: 26000,
  maxMobileParticles: 16000,
  pointerInfluence: 0.48,
  repulsionStrength: 0.32,
  damping: 0.075,
  idleNoiseAmp: 0.025,
  depthParallaxAmp: 0.035,
  assemblyDuration: 2.2,
};

export interface ParticleDatasetMeta {
  particleCount: number;
  strideFloats: number;
  strideBytes: number;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  };
  version: string;
}

export interface ParticlePortraitProps {
  className?: string;
  config?: Partial<ParticleConfig>;
}
