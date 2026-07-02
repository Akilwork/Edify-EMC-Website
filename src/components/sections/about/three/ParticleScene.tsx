"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

/**
 * ParticleScene - Three.js volumetric particle system
 *
 * Creates an hourglass/wave-shaped volumetric particle cloud that:
 * - Occupies the entire viewport height
 * - Curves from left/right edges toward center
 * - Has randomly varying sizes that change with scroll
 * - Smooth particle motion during scroll
 */

// Hourglass/wave shape function
function getHourglassWidth(y: number, height: number): number {
  const normalizedY = (y / height) * 2 - 1;
  const absY = Math.abs(normalizedY);

  const baseWidth = 0.85;
  const centerWidth = 0.2;

  const widthFactor = 0.5 + 0.5 * Math.cos(absY * Math.PI * 0.7);
  const width = centerWidth + (baseWidth - centerWidth) * widthFactor;

  return width;
}

// Vertex shader with size variation
const PARTICLE_VERTEX_SHADER = `
uniform float time;
uniform float opacity;
uniform float scrollProgress;

attribute float brightness;
attribute float sizeVariation;
attribute float randomOffset;

varying float vBrightness;
varying float vOpacity;

void main() {
  vBrightness = brightness;
  vOpacity = opacity;

  vec3 pos = position;

  // Wave motion - more dynamic with scroll
  float waveIntensity = 1.0 + scrollProgress * 2.0;
  float waveX = sin(pos.y * 1.5 + time * 0.4 + randomOffset) * (0.12 * waveIntensity);
  float waveY = cos(pos.x * 2.0 + time * 0.3 + randomOffset) * (0.08 * waveIntensity);
  float waveZ = sin(pos.x * 1.2 + pos.y * 0.8 + time * 0.5) * 0.25;

  pos.x += waveX;
  pos.y += waveY;
  pos.z += waveZ;

  // Scroll-driven position shifts
  float scrollMotion = scrollProgress * 0.4;
  pos.x += scrollMotion * sin(pos.y * 2.0 + time);
  pos.y += scrollMotion * cos(pos.x * 1.5 + randomOffset);

  // Subtle rotation based on scroll
  float angle = scrollProgress * 0.15;
  float cosA = cos(angle);
  float sinA = sin(angle);
  float rotX = pos.x * cosA - pos.z * sinA;
  float rotZ = pos.x * sinA + pos.z * cosA;
  pos.x = rotX;
  pos.z = rotZ;

  // Camera distance change with scroll
  float cameraDist = 5.0 - scrollProgress * 0.8;
  pos.z *= (1.0 + scrollProgress * 0.5);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  // Size varies with scroll progress - creates dynamic effect
  // Each particle has unique sizeVariation that scales with scroll
  float baseSize = 2.0 + sizeVariation * 6.0; // 2.0 to 8.0 base range
  float scrollSizeMultiplier = 1.0 + scrollProgress * 2.5; // 1x to 3.5x with scroll
  float depthScale = 1.0 + pos.z * 0.25;

  gl_PointSize = baseSize * scrollSizeMultiplier * depthScale * (0.8 + brightness * 0.8);
}
`;

// Fragment shader
const PARTICLE_FRAGMENT_SHADER = `
varying float vBrightness;
varying float vOpacity;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Soft circular particle with glow
  float alpha = smoothstep(0.5, 0.2, dist);

  if (alpha < 0.01) discard;

  // Add subtle glow at center
  float glow = 1.0 - smoothstep(0.0, 0.3, dist);
  alpha += glow * 0.3;

  float finalAlpha = alpha * vOpacity * vBrightness;

  gl_FragColor = vec4(1.0, 1.0, 1.0, finalAlpha);
}
`;

export interface ParticleSceneRef {
  setOpacity: (opacity: number) => void;
  setScrollProgress: (progress: number) => void;
}

interface ParticleSceneProps {
  imagePath?: string;
  onReady?: () => void;
}

export const ParticleScene = forwardRef<ParticleSceneRef, ParticleSceneProps>(
  ({ imagePath, onReady }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      renderer: THREE.WebGLRenderer;
      particles: THREE.Points;
      particleMaterial: THREE.ShaderMaterial;
      animationId: number;
    } | null>(null);

    useImperativeHandle(ref, () => ({
      setOpacity: (opacity: number) => {
        if (sceneRef.current) {
          sceneRef.current.particleMaterial.uniforms.opacity.value = opacity;
        }
      },
      setScrollProgress: (progress: number) => {
        if (sceneRef.current) {
          sceneRef.current.particleMaterial.uniforms.scrollProgress.value = progress;
        }
      }
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      containerRef.current.appendChild(renderer.domElement);

      // Generate volumetric hourglass particles
      const maxParticles = 28000;
      const positions: number[] = [];
      const brightness: number[] = [];
      const sizeVariations: number[] = [];
      const randomOffsets: number[] = [];

      const verticalRange = 14;
      const horizontalScale = 11;

      for (let i = 0; i < maxParticles; i++) {
        const y = (Math.random() - 0.5) * verticalRange;
        const hourglassWidth = getHourglassWidth(y, verticalRange);

        // Edge-biased x sampling
        const xSample = (Math.random() - 0.5) * 2;
        const xSign = Math.sign(xSample);
        const xAbs = Math.abs(xSample);
        const edgeBias = Math.pow(xAbs, 0.4);
        const x = xSign * edgeBias * hourglassWidth * horizontalScale * 0.5;

        const z = (Math.random() - 0.5) * 5;

        // Calculate brightness
        const distFromCenter = Math.abs(x) / (hourglassWidth * horizontalScale * 0.5);
        const depthFactor = 1.0 - Math.abs(z) / 2.5;
        const brightnessValue = (0.25 + depthFactor * 0.55) * (1.0 - distFromCenter * 0.25);

        // Random size variation - each particle gets unique size
        const sizeVar = Math.random();

        positions.push(x, y, z);
        brightness.push(brightnessValue);
        sizeVariations.push(sizeVar);
        randomOffsets.push(Math.random() * Math.PI * 2);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("brightness", new THREE.Float32BufferAttribute(brightness, 1));
      geometry.setAttribute("sizeVariation", new THREE.Float32BufferAttribute(sizeVariations, 1));
      geometry.setAttribute("randomOffset", new THREE.Float32BufferAttribute(randomOffsets, 1));

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          opacity: { value: 0 },
          scrollProgress: { value: 0 }
        },
        vertexShader: PARTICLE_VERTEX_SHADER,
        fragmentShader: PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        particleMaterial,
        animationId: 0
      };

      onReady?.();

      let animationFrameId: number;
      const animate = (time: number) => {
        animationFrameId = requestAnimationFrame(animate);

        if (sceneRef.current) {
          sceneRef.current.particleMaterial.uniforms.time.value = time * 0.001;

          const camTime = time * 0.00015;
          camera.position.x = Math.sin(camTime) * 0.25;
          camera.position.y = Math.cos(camTime * 0.8) * 0.18;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        }
      };
      animate(0);

      const handleResize = () => {
        if (!sceneRef.current) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        sceneRef.current.renderer.setSize(width, height);
        sceneRef.current.camera.aspect = width / height;
        sceneRef.current.camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);

        if (sceneRef.current) {
          sceneRef.current.renderer.dispose();
          sceneRef.current.particles.geometry.dispose();
          sceneRef.current.particleMaterial.dispose();
        }

        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    }, [onReady]);

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 30 }}
        aria-hidden="true"
      />
    );
  }
);

ParticleScene.displayName = "ParticleScene";
