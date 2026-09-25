import React from "react";

export function HeroPortraitArtifact() {
  return (
    <div className="hero-portrait-wrap" aria-label="Abstract dimensional particle portrait silhouette">
      <svg
        className="hero-portrait-svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 400 480"
        role="img"
      >
        <title>Abstract Dimensional Particle Silhouette</title>
        <defs>
          <radialGradient cx="50%" cy="42%" id="hero-particle-glow" r="50%">
            <stop offset="0%" stopColor="#ebbf87" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#c7c6ca" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0d0e11" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial illumination */}
        <rect fill="url(#hero-particle-glow)" height="480" width="400" />

        {/* Core Amber Particle Cluster */}
        <g fill="#ebbf87" opacity="0.95">
          <circle cx="195" cy="180" r="1.9" />
          <circle cx="205" cy="180" r="1.9" />
          <circle cx="200" cy="198" r="1.8" />
          <circle cx="192" cy="222" r="1.7" />
          <circle cx="208" cy="222" r="1.7" />
          <circle cx="200" cy="230" r="1.6" />
          <circle cx="198" cy="245" r="1.8" />
        </g>

        {/* High-Luminance Warm White Nodes */}
        <g fill="#e5e2dc" opacity="0.8">
          <circle cx="192" cy="148" r="1.4" />
          <circle cx="200" cy="144" r="1.5" />
          <circle cx="208" cy="148" r="1.4" />
          <circle cx="180" cy="168" r="1.4" />
          <circle cx="220" cy="168" r="1.4" />
          <circle cx="172" cy="190" r="1.3" />
          <circle cx="228" cy="190" r="1.3" />
          <circle cx="175" cy="214" r="1.3" />
          <circle cx="225" cy="214" r="1.3" />
          <circle cx="184" cy="236" r="1.3" />
          <circle cx="216" cy="236" r="1.3" />
          <circle cx="194" cy="254" r="1.4" />
          <circle cx="206" cy="254" r="1.4" />
          <circle cx="200" cy="262" r="1.4" />
        </g>

        {/* Mid-Tone Silver Structural Lattice */}
        <g fill="#c7c6ca" opacity="0.6">
          <circle cx="168" cy="136" r="1.2" />
          <circle cx="184" cy="126" r="1.2" />
          <circle cx="200" cy="122" r="1.2" />
          <circle cx="216" cy="126" r="1.2" />
          <circle cx="232" cy="136" r="1.2" />
          <circle cx="158" cy="158" r="1.1" />
          <circle cx="242" cy="158" r="1.1" />
          <circle cx="152" cy="184" r="1.1" />
          <circle cx="248" cy="184" r="1.1" />
          <circle cx="156" cy="214" r="1.1" />
          <circle cx="244" cy="214" r="1.1" />
          <circle cx="164" cy="240" r="1.1" />
          <circle cx="236" cy="240" r="1.1" />
          <circle cx="176" cy="275" r="1.2" />
          <circle cx="224" cy="275" r="1.2" />
          <circle cx="188" cy="296" r="1.2" />
          <circle cx="212" cy="296" r="1.2" />
          <circle cx="165" cy="325" r="1.1" />
          <circle cx="235" cy="325" r="1.1" />
          <circle cx="145" cy="350" r="1.0" />
          <circle cx="255" cy="350" r="1.0" />
          <circle cx="120" cy="380" r="0.9" />
          <circle cx="280" cy="380" r="0.9" />
        </g>

        {/* Outer Dispersion Field */}
        <g fill="#ebbf87" opacity="0.35">
          <circle cx="135" cy="120" r="0.9" />
          <circle cx="265" cy="120" r="0.9" />
          <circle cx="118" cy="175" r="0.8" />
          <circle cx="282" cy="175" r="0.8" />
          <circle cx="122" cy="230" r="0.8" />
          <circle cx="278" cy="230" r="0.8" />
          <circle cx="135" cy="285" r="0.9" />
          <circle cx="265" cy="285" r="0.9" />
          <circle cx="95" cy="410" r="0.8" />
          <circle cx="305" cy="410" r="0.8" />
          <circle cx="75" cy="440" r="0.7" />
          <circle cx="325" cy="440" r="0.7" />
        </g>
      </svg>
    </div>
  );
}
