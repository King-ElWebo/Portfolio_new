export interface ParticleConfig {
  /** Maximum particles to draw on desktop */
  maxDesktopParticles: number;
  /** Maximum particles to draw on tablet */
  maxTabletParticles: number;
  /** Maximum particles to draw on mobile */
  maxMobileParticles: number;
  /** Radius of pointer influence in local portrait units */
  pointerInfluence: number;
  /** Maximum depth displacement under the cursor */
  repulsionStrength: number;
  /** Damping at 60 Hz, adjusted to the actual frame interval */
  damping: number;
  /** Idle surface drift amplitude */
  idleNoiseAmp: number;
  /** Depth parallax response to cursor, in radians */
  depthParallaxAmp: number;
  /** Duration of initial assembly animation in seconds */
  assemblyDuration: number;
}

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  maxDesktopParticles: 32000,
  maxTabletParticles: 22000,
  maxMobileParticles: 14000,
  pointerInfluence: 0.30,
  repulsionStrength: 0.028,
  damping: 0.10,
  idleNoiseAmp: 0.0025,
  depthParallaxAmp: 0.026,
  assemblyDuration: 2.8,
};

export interface ParticlePortraitProps {
  className?: string;
  config?: Partial<ParticleConfig>;
}
