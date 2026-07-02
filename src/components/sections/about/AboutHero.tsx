"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutHero.module.css";
import { DottedGraphic, DottedGraphicRef } from "./DottedGraphic";
import { ParticleScene, ParticleSceneRef } from "./three/ParticleScene";

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutHero - Premium scrollytelling hero section
 *
 * Features:
 * - 400vh pinned scroll with fixed viewport
 * - Parallax zoom on layered images
 * - Scroll-reveal text transitions with blur/fade
 * - Programmatic dotted graphic with entrance animation
 * - Three.js particle system with image sampling
 * - Custom shader effects for dissolve and morph
 */

// Text stages for scroll reveal animation
const TEXT_STAGES = [
  {
    title: "Building Institutions That Inspire",
    subtitle: "Excellence And Lasting Impact"
  },
  {
    title: "Empowering educational institutions",
    subtitle: "through integrated expertise, strategic guidance, and sustainable growth solutions."
  },
  {
    title: "A Partner In Educational Progress",
    subtitle: ""
  },
  {
    title: "Edify Management Consultancy",
    subtitle: "was established with a simple belief: educational institutions deserve access to the same level of strategic expertise, operational excellence, and professional support that drives successful organizations worldwide."
  }
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const fgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particleSceneRef = useRef<ParticleSceneRef>(null);
  const dottedGraphicRef = useRef<DottedGraphicRef>(null);

  const [loadState, setLoadState] = useState<"loading" | "ready">("loading");
  const [showDottedGraphic, setShowDottedGraphic] = useState(false);

  // Initialize animations after images are loaded
  useEffect(() => {
    if (loadState !== "ready" || !sectionRef.current) return;

    const section = sectionRef.current;

    // Set initial states for all text stages
    textRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.set(ref, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 60,
          filter: i === 0 ? "blur(0px)" : "blur(12px)"
        });
      }
    });

    // Show dotted graphic after initial load
    const dottedTimer = setTimeout(() => {
      setShowDottedGraphic(true);
    }, 300);

    // Main GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400vh", // 4x viewport height for smooth scroll
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Control dotted graphic density based on scroll progress
          if (dottedGraphicRef.current) {
            dottedGraphicRef.current.setScrollProgress(self.progress);
          }
        }
      }
    });

    // STAGE 1 (0-25%): Parallax zoom + first text transition
    // Background image scales slowly (depth layer)
    tl.to(
      bgImageRef.current,
      {
        scale: 1.08,
        duration: 1,
        ease: "power1.inOut"
      },
      0
    )
      // Foreground image scales more for parallax depth
      .to(
        fgImageRef.current,
        {
          scale: 1.16,
          duration: 1,
          ease: "power1.inOut"
        },
        0
      )
      // First text fades out upward with blur
      .to(
        textRefs.current[0],
        {
          opacity: 0,
          y: -40,
          filter: "blur(12px)",
          duration: 0.8,
          ease: "power2.inOut"
        },
        0.15
      )
      // Second text fades in from below
      .fromTo(
        textRefs.current[1],
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out"
        },
        0.25
      );

    // STAGE 2 (25-50%): Second to third text transition
    tl.to(
      textRefs.current[1],
      {
        opacity: 0,
        y: -40,
        filter: "blur(12px)",
        duration: 0.8,
        ease: "power2.inOut"
      },
      0.6
    ).fromTo(
      textRefs.current[2],
      { opacity: 0, y: 60, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      },
      0.7
    );

    // STAGE 3 (50-75%): Image dissolve with particle reveal
    // Fade out both images
    tl.to(
      bgImageRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut"
      },
      1.15
    ).to(
      fgImageRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut"
      },
      1.15
    )
      // Animate particle opacity through the scene ref
      .to(
        () => {
          if (particleSceneRef.current) {
            particleSceneRef.current.setOpacity(gsap.getProperty(".dummy-target", "particleOpacity") as number);
          }
        },
        {
          particleOpacity: 1,
          duration: 1,
          ease: "power2.inOut"
        },
        1.2
      );

    // STAGE 4 (75-100%): Final text transition
    tl.fromTo(
      textRefs.current[3],
      { opacity: 0, y: 60, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      },
      1.6
    );

    // Cleanup function
    return () => {
      clearTimeout(dottedTimer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loadState]);

  // Preload images before starting animations
  useEffect(() => {
    const imagesToLoad = [
      "/about/hero/hero_back_img_aboutus.png",
      "/about/hero/hero_front_img_aboutus.png"
    ];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoadState("ready");
      }
    };

    const onImageError = () => {
      console.warn("Image failed to load, continuing anyway");
      loadedCount++;
      if (loadedCount === totalImages) {
        setLoadState("ready");
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new window.Image();
      img.onload = onImageLoad;
      img.onerror = onImageError;
      img.src = src;
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Loading overlay */}
      {loadState === "loading" && (
        <div className={styles.loader}>
          <span className={styles.loaderText}>Loading Experience</span>
        </div>
      )}

      {/* Layer 1: Background Image - slower parallax (deepest) */}
      <div
        ref={bgImageRef}
        className={`${styles.imageLayer} ${styles.backgroundLayer}`}
      >
        <Image
          src="/about/hero/hero_back_img_aboutus.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layer 2: Foreground Image - faster parallax (mid depth) */}
      <div
        ref={fgImageRef}
        className={`${styles.imageLayer} ${styles.foregroundLayer}`}
      >
        <Image
          src="/about/hero/hero_front_img_aboutus.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layer 3: Dark overlay for text readability */}
      <div ref={overlayRef} className={styles.overlay} />

      {/* Layer 4: Three.js Particle Scene */}
      <ParticleScene
        ref={particleSceneRef}
        imagePath="/about/hero/hero_back_img_aboutus.png"
        onReady={() => {
          // Scene is ready, opacity will be controlled by scroll
        }}
      />

      {/* Layer 5: Dotted Graphic */}
      {showDottedGraphic && <DottedGraphic ref={dottedGraphicRef} isVisible={true} />}

      {/* Layer 6: Text Stages */}
      <div className={styles.textContainer}>
        {TEXT_STAGES.map((stage, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className={styles.textStage}
          >
            <h1>{stage.title}</h1>
            {stage.subtitle && <p>{stage.subtitle}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
