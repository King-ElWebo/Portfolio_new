export interface ParticleConfig {
  /** Maximum particles to draw on desktop */
  maxDesktopParticles: number;
  /** Maximum particles to draw on tablet */
  maxTabletParticles: number;
  /** Maximum particles to draw on mobile */
  maxMobileParticles: number;
  /** Radius of pointer influence in local portrait units */
  pointerInfluence: number;
  /** Maximum in-plane displacement under the cursor */
  repulsionStrength: number;
  /** Damping at 60 Hz, adjusted to the actual frame interval */
  damping: number;
  /** Idle drift amplitude in the photograph's plane */
  idleNoiseAmp: number;
  /** Duration of initial assembly animation in seconds */
  assemblyDuration: number;
}

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  maxDesktopParticles: 11000,
  maxTabletParticles: 8500,
  maxMobileParticles: 6500,
  pointerInfluence: 0.28,
  repulsionStrength: 0.045,
  damping: 0.10,
  idleNoiseAmp: 0.0012,
  assemblyDuration: 2.4,
};

export interface ParticlePortraitProps {
  className?: string;
  config?: Partial<ParticleConfig>;
}
