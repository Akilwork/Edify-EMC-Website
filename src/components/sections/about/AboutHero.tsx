"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import BlurText from "@/components/ui/BlurText";
import PersonProfileCard from "@/components/ui/PersonProfileCard";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<HTMLDivElement>(null);
  const gridBg70Ref = useRef<HTMLDivElement>(null); // Frame 2: 70% vignette
  const gridBg30Ref = useRef<HTMLDivElement>(null); // Frame 3: 30% vignette
  const dotBgRef = useRef<HTMLDivElement>(null); // Frame 4: dot background
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene5LeftRef = useRef<HTMLDivElement>(null);
  const scene5RightRef = useRef<HTMLDivElement>(null);
  const scene6Ref = useRef<HTMLDivElement>(null);
  const statsCounterRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const scene7Ref = useRef<HTMLDivElement>(null);
  const scene7BlackBgRef = useRef<HTMLDivElement>(null);
  // Scene 7 sub-scenes (A, B, C, D)
  const scene7TextARef = useRef<HTMLParagraphElement>(null);
  const scene7ImgARef = useRef<HTMLDivElement>(null);
  const scene7TextBRef = useRef<HTMLParagraphElement>(null);
  const scene7ImgBRef = useRef<HTMLDivElement>(null);
  const scene7TextCRef = useRef<HTMLParagraphElement>(null);
  const scene7ImgCRef = useRef<HTMLDivElement>(null);
  const scene7TextDRef = useRef<HTMLParagraphElement>(null);
  const scene7ImgDRef = useRef<HTMLDivElement>(null);
  // Scene 7 left/right refs
  const scene7LeftRef = useRef<HTMLDivElement>(null);
  const scene7RightRef = useRef<HTMLDivElement>(null);
  // Scene 7 alternate image refs (for the right column)
  const scene7Image1Ref = useRef<HTMLDivElement>(null);
  const scene7Image2Ref = useRef<HTMLDivElement>(null);
  const scene7Image3Ref = useRef<HTMLDivElement>(null);
  const scene7Image4Ref = useRef<HTMLDivElement>(null);
  // Pagination dots (lettered version)
  const scene7DotARef = useRef<HTMLDivElement>(null);
  const scene7DotBRef = useRef<HTMLDivElement>(null);
  const scene7DotCRef = useRef<HTMLDivElement>(null);
  const scene7DotDRef = useRef<HTMLDivElement>(null);
  // Scene 8 refs
  const scene8Ref = useRef<HTMLDivElement>(null);
  const scene8TextARef = useRef<HTMLDivElement>(null);
  const scene8TextBRef = useRef<HTMLDivElement>(null);
  const scene8WhiteBgRef = useRef<HTMLDivElement>(null);
  const scene8GridCyanRef = useRef<HTMLDivElement>(null);
  const scene8GridDarkRef = useRef<HTMLDivElement>(null);
  const scene8CardsContainerRef = useRef<HTMLDivElement>(null);
  const scene8WhiteVignetteRef = useRef<HTMLDivElement>(null);
  const [scene8Visible, setScene8Visible] = useState(false);
  // Individual card refs for scale/opacity animation
  const scene8CardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Scene 9 refs
  const scene9Ref = useRef<HTMLDivElement>(null);
  const scene9TextRef = useRef<HTMLDivElement>(null);
  const scene9GridCyanRef = useRef<HTMLDivElement>(null);
  const [scene9Visible, setScene9Visible] = useState(false);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const backImage = backImageRef.current;
    const gridBg70 = gridBg70Ref.current;
    const gridBg30 = gridBg30Ref.current;
    const dotBg = dotBgRef.current;
    const whiteBg = whiteBgRef.current;

    if (!section || !backImage || !gridBg70 || !gridBg30 || !dotBg) return;

    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Safeguard: if component has unmounted or critical refs are not ready, abort
        if (
          !sectionRef.current ||
          !backImageRef.current ||
          !scene2Ref.current ||
          !scene4Ref.current
        ) {
          return;
        }

        // Scene 8 refs check - warn but don't abort if not ready
        if (!scene8Ref.current || !scene8GridCyanRef.current || !scene8TextARef.current) {
          console.warn("Scene 8 refs not ready, skipping Scene 8 animations");
        }

        // Scene 9 refs check - warn but don't abort if not ready
        if (!scene9Ref.current || !scene9GridCyanRef.current || !scene9TextRef.current) {
          console.warn("Scene 9 refs not ready, skipping Scene 9 animations");
        }

        // ─── Initial States ──────────────────────────────────────────────────────
        gsap.set(scene2Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        gsap.set(scene4Ref.current, { autoAlpha: 0, y: 0, filter: "blur(18px)" });
        if (scene5Ref.current) gsap.set(scene5Ref.current, { autoAlpha: 0 });
        if (scene5LeftRef.current) gsap.set(scene5LeftRef.current, { autoAlpha: 0, x: -100, filter: "blur(12px)" });
        if (scene5RightRef.current) gsap.set(scene5RightRef.current, { autoAlpha: 0, x: 100, scale: 0.6, filter: "blur(16px)" });
        if (scene6Ref.current) gsap.set(scene6Ref.current, { autoAlpha: 0, filter: "blur(18px)" });
        if (scene7Ref.current) gsap.set(scene7Ref.current, { autoAlpha: 0, filter: "blur(12px)" });
        if (scene7LeftRef.current) gsap.set(scene7LeftRef.current, { autoAlpha: 0, x: -50 });
        if (scene7RightRef.current) gsap.set(scene7RightRef.current, { autoAlpha: 0, x: 50, scale: 0.9 });
        if (scene7BlackBgRef.current) gsap.set(scene7BlackBgRef.current, { autoAlpha: 0 });
        if (scene8Ref.current) gsap.set(scene8Ref.current, { autoAlpha: 0, filter: "blur(12px)" });
        if (scene8WhiteBgRef.current) gsap.set(scene8WhiteBgRef.current, { autoAlpha: 0 });
        if (scene8GridDarkRef.current) gsap.set(scene8GridDarkRef.current, { autoAlpha: 0 });
        if (scene8WhiteVignetteRef.current) gsap.set(scene8WhiteVignetteRef.current, { autoAlpha: 0 });
        if (scene8TextBRef.current) gsap.set(scene8TextBRef.current, { autoAlpha: 0, y: -20 });
        if (scene8CardsContainerRef.current) gsap.set(scene8CardsContainerRef.current, { autoAlpha: 0, y: 30 });
        if (scene9Ref.current) gsap.set(scene9Ref.current, { autoAlpha: 0, filter: "blur(12px)" });
        if (whiteBg) gsap.set(whiteBg, { autoAlpha: 0 });
        gsap.set(gridBg70, { autoAlpha: 0 });
        gsap.set(gridBg30, { autoAlpha: 0 });
        gsap.set(dotBg, { autoAlpha: 0 });

        // Scene 7 Images initial states
        if (scene7Image1Ref.current) gsap.set(scene7Image1Ref.current, { autoAlpha: 1 });
        if (scene7Image2Ref.current) gsap.set(scene7Image2Ref.current, { autoAlpha: 0 });
        if (scene7Image3Ref.current) gsap.set(scene7Image3Ref.current, { autoAlpha: 0 });
        if (scene7Image4Ref.current) gsap.set(scene7Image4Ref.current, { autoAlpha: 0 });

        // Scene 7 Dots initial states
        if (scene7DotARef.current) gsap.set(scene7DotARef.current, { width: 48, backgroundColor: "#FFFFFF" });
        if (scene7DotBRef.current) gsap.set(scene7DotBRef.current, { width: 8, backgroundColor: "#4B5563" });
        if (scene7DotCRef.current) gsap.set(scene7DotCRef.current, { width: 8, backgroundColor: "#4B5563" });
        if (scene7DotDRef.current) gsap.set(scene7DotDRef.current, { width: 8, backgroundColor: "#4B5563" });

        // ─── Initial Parallax Animation on Page Load ─────────────────────────────
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        loadTimeline.fromTo(
          backImage,
          {
            scale: 1,
            y: 0,
            filter: "blur(1px)",
          },
          {
            scale: 1.08,
            y: -40,
            filter: "blur(1.5px)",
            duration: 2.5,
          },
          0
        );

        // ─── Scroll-Triggered Animations ────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=5000vh",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Trigger Scene 8 BlurText animation when Scene 8 starts fading in (at 26.0 = ~65% progress)
              if (self.progress >= 0.65 && !scene8Visible) {
                setScene8Visible(true);
              }
              // Trigger Scene 9 BlurText animation when Scene 9 starts fading in
              if (self.progress >= 0.92 && !scene9Visible) {
                setScene9Visible(true);
              }
            },
          },
        });

        // Continue background animation during scroll
        tl.to(backImage, {
          scale: 3.5,
          y: -100,
          filter: "blur(3px)",
          duration: 5,
          ease: "none",
        });

        // ─── Scene 2 → Scene 4 Cross-fade (starts at 2.5, duration 0.5) ───────────────
        tl.to(
          scene2Ref.current,
          {
            autoAlpha: 0,
            y: -30,
            filter: "blur(12px)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          2.5
        );

        tl.to(
          scene4Ref.current,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.inOut",
          },
          3.0
        );

        // ─── Scene 4 → Scene 5 Transition (starts at 6.0, duration 0.5) ──────────────────────────────────
        tl.to(
          scene4Ref.current,
          {
            autoAlpha: 0,
            y: -30,
            filter: "blur(12px)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          6.0
        );

        // ─── Scene 5 (VisionValues) fades in (starts at 6.5) ────────────────────────────────────────────
        if (scene5Ref.current) {
          tl.to(
            scene5Ref.current,
            {
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            6.5
          );
        }

        if (scene5LeftRef.current) {
          tl.to(
            scene5LeftRef.current,
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
            },
            6.6
          );
        }

        if (scene5RightRef.current) {
          tl.to(
            scene5RightRef.current,
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "back.out(1.7)",
            },
            6.7
          );
        }

        // ─── Scene 5 → Scene 6 Transition (starts at 10.0) ─────────────────────────────────────────────────
        if (scene5Ref.current) {
          tl.to(
            scene5Ref.current,
            {
              autoAlpha: 0,
              y: -40,
              filter: "blur(12px)",
              duration: 0.5,
              ease: "power2.inOut",
            },
            10.0
          );
        }

        // ─── Scene 6 (Stats) fades in (starts at 10.5) ─────────────────────────────────────
        if (scene6Ref.current) {
          tl.to(
            scene6Ref.current,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            10.5
          );
        }

        // Animate stats numbers with stagger timing
        if (statsCounterRef.current) {
          const statElements = statsCounterRef.current.querySelectorAll(".stat-number");
          statElements.forEach((el, index) => {
            const targetValue = parseInt(el.getAttribute("data-value") || "0");
            const counterObj = { value: 0 };
            tl.to(
              counterObj,
              {
                value: targetValue,
                duration: 1.2,
                ease: "power3.out",
                onUpdate: function () {
                  const current = Math.round(this.targets()[0].value);
                  (el as HTMLElement).innerHTML = current.toLocaleString();
                },
              },
              11.0 + (index * 0.2)
            );
          });
        }

        // ─── Scene 6 → Scene 7 Transition (starts at 15.0) ─────────────────────
        if (scene6Ref.current) {
          tl.to(
            scene6Ref.current,
            {
              autoAlpha: 0,
              scale: 1.15,
              filter: "blur(15px)",
              duration: 0.4,
              ease: "power2.inOut",
            },
            15.0
          );
        }

        // Fade in black background for Scene 7
        if (scene7BlackBgRef.current) {
          tl.to(
            scene7BlackBgRef.current,
            {
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.inOut",
            },
            15.4
          );
        }

        // Fade in Scene 7 with blur
        if (scene7Ref.current) {
          tl.to(
            scene7Ref.current,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power2.inOut",
            },
            15.4
          );
        }

        // ─── Scene 7 Sub-Scene Animations ──────────────────────────────────────────────────────────────

        // Scene 7A - Initial fade in (at 15.6)
        if (scene7TextARef.current) {
          tl.fromTo(
            scene7TextARef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
            15.6
          );
        }
        if (scene7ImgARef.current) {
          tl.fromTo(
            scene7ImgARef.current,
            { opacity: 0, x: 30, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
            15.65
          );
        }
        // Highlight dot A
        if (scene7DotARef.current) {
          tl.fromTo(
            scene7DotARef.current,
            { opacity: 0.4, width: "8px" },
            { opacity: 1, width: "48px", duration: 0.5, ease: "power2.out" },
            15.7
          );
        }

        // Scene 7A → 7B Transition (at 18.0)
        if (scene7TextARef.current) {
          tl.to(
            scene7TextARef.current,
            { opacity: 0, x: -20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            18.0
          );
        }
        if (scene7ImgARef.current) {
          tl.to(
            scene7ImgARef.current,
            { opacity: 0, x: 20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            18.0
          );
        }
        if (scene7DotARef.current) {
          tl.to(scene7DotARef.current, { opacity: 0.4, width: "8px", duration: 0.4 }, 18.0);
        }

        // Scene 7B fades in
        if (scene7TextBRef.current) {
          tl.fromTo(
            scene7TextBRef.current,
            { opacity: 0, x: 20, filter: "blur(8px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
            18.0
          );
        }
        if (scene7ImgBRef.current) {
          tl.fromTo(
            scene7ImgBRef.current,
            { opacity: 0, x: -20, scale: 0.95, filter: "blur(8px)" },
            { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "back.out(1.5)" },
            18.05
          );
        }
        if (scene7DotBRef.current) {
          tl.fromTo(
            scene7DotBRef.current,
            { opacity: 0.4, width: "8px" },
            { opacity: 1, width: "48px", duration: 0.5, ease: "power2.out" },
            18.1
          );
        }

        // Scene 7B → 7C Transition (at 20.5)
        if (scene7TextBRef.current) {
          tl.to(
            scene7TextBRef.current,
            { opacity: 0, x: -20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            20.5
          );
        }
        if (scene7ImgBRef.current) {
          tl.to(
            scene7ImgBRef.current,
            { opacity: 0, x: 20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            20.5
          );
        }
        if (scene7DotBRef.current) {
          tl.to(scene7DotBRef.current, { opacity: 0.4, width: "8px", duration: 0.4 }, 20.5);
        }

        // Scene 7C fades in
        if (scene7TextCRef.current) {
          tl.fromTo(
            scene7TextCRef.current,
            { opacity: 0, x: 20, filter: "blur(8px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
            20.5
          );
        }
        if (scene7ImgCRef.current) {
          tl.fromTo(
            scene7ImgCRef.current,
            { opacity: 0, x: -20, scale: 0.95, filter: "blur(8px)" },
            { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "back.out(1.5)" },
            20.55
          );
        }
        if (scene7DotCRef.current) {
          tl.fromTo(
            scene7DotCRef.current,
            { opacity: 0.4, width: "8px" },
            { opacity: 1, width: "48px", duration: 0.5, ease: "power2.out" },
            20.6
          );
        }

        // Scene 7C → 7D Transition (at 23.0)
        if (scene7TextCRef.current) {
          tl.to(
            scene7TextCRef.current,
            { opacity: 0, x: -20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            23.0
          );
        }
        if (scene7ImgCRef.current) {
          tl.to(
            scene7ImgCRef.current,
            { opacity: 0, x: 20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            23.0
          );
        }
        if (scene7DotCRef.current) {
          tl.to(scene7DotCRef.current, { opacity: 0.4, width: "8px", duration: 0.4 }, 23.0);
        }

        // Scene 7D fades in
        if (scene7TextDRef.current) {
          tl.fromTo(
            scene7TextDRef.current,
            { opacity: 0, x: 20, filter: "blur(8px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
            23.0
          );
        }
        if (scene7ImgDRef.current) {
          tl.fromTo(
            scene7ImgDRef.current,
            { opacity: 0, x: -20, scale: 0.95, filter: "blur(8px)" },
            { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "back.out(1.5)" },
            23.05
          );
        }
        if (scene7DotDRef.current) {
          tl.fromTo(
            scene7DotDRef.current,
            { opacity: 0.4, width: "8px" },
            { opacity: 1, width: "48px", duration: 0.5, ease: "power2.out" },
            23.1
          );
        }

        // ─── Scene 7D → Scene 8 Transition (at 25.5) ─────────────────────
        if (scene7Ref.current) {
          tl.to(
            scene7Ref.current,
            { autoAlpha: 0, filter: "blur(12px)", duration: 0.5, ease: "power2.inOut" },
            25.5
          );
        }
        if (scene7BlackBgRef.current) {
          tl.to(
            scene7BlackBgRef.current,
            { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
            25.5
          );
        }

        // Scene 8 fades in (at 26.0)
        if (scene8Ref.current) {
          tl.to(
            scene8Ref.current,
            { autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.inOut" },
            26.0
          );
        }

        // ─── Scene 8A → 8B Transition (at 28.0) ─────────────────────
        // Fade out initial text
        if (scene8TextARef.current) {
          tl.to(
            scene8TextARef.current,
            { autoAlpha: 0, y: -20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            28.0
          );
        }

        // Fade in white background
        if (scene8WhiteBgRef.current) {
          tl.to(
            scene8WhiteBgRef.current,
            { autoAlpha: 1, duration: 0.6, ease: "power2.inOut" },
            28.0
          );
        }

        // Fade in white vignette (for Scene 8B edge blending)
        if (scene8WhiteVignetteRef.current) {
          tl.to(
            scene8WhiteVignetteRef.current,
            { autoAlpha: 1, duration: 0.6, ease: "power2.inOut" },
            28.0
          );
        }

        // Cross-fade grids: cyan → dark
        if (scene8GridCyanRef.current) {
          tl.to(
            scene8GridCyanRef.current,
            { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
            28.0
          );
        }
        if (scene8GridDarkRef.current) {
          tl.to(
            scene8GridDarkRef.current,
            { autoAlpha: 1, duration: 0.6, ease: "power2.inOut" },
            28.0
          );
        }

        // Fade in new text at top
        if (scene8TextBRef.current) {
          tl.to(
            scene8TextBRef.current,
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            28.3
          );
        }

        // Fade in person cards with stagger
        if (scene8CardsContainerRef.current) {
          tl.to(
            scene8CardsContainerRef.current,
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
            28.5
          );
        }

        // Horizontal scroll for cards (from 29.0 to 35.0)
        // Start: First card centered | End: Last card centered
        if (scene8CardsContainerRef.current) {
          const cardsContainer = scene8CardsContainerRef.current;

          tl.fromTo(
            cardsContainer,
            {
              x: () => {
                const viewportWidth = window.innerWidth;
                const cardWidth = viewportWidth >= 640 ? 320 : (viewportWidth >= 480 ? 260 : 220);
                const padding = viewportWidth >= 768 ? 64 : 32;
                const firstCardCenter = padding + cardWidth / 2;
                return viewportWidth / 2 - firstCardCenter;
              }
            },
            {
              x: () => {
                const viewportWidth = window.innerWidth;
                const cardWidth = viewportWidth >= 640 ? 320 : (viewportWidth >= 480 ? 260 : 220);
                const gap = viewportWidth >= 768 ? 32 : 24;
                const padding = viewportWidth >= 768 ? 64 : 32;
                const lastCardCenter = padding + (7 * (cardWidth + gap)) + cardWidth / 2;
                return viewportWidth / 2 - lastCardCenter;
              },
              duration: 6,
              ease: "none",
              onUpdate: function() {
                // Scale + Opacity Focus animation for each card
                scene8CardRefs.current.forEach((card) => {
                  if (card) {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const viewportCenter = window.innerWidth / 2;
                    const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
                    const maxDistance = window.innerWidth / 2;

                    // Calculate scale, opacity and blur based on distance from center
                    const normalizedDistance = Math.min(distanceFromCenter / (maxDistance * 0.8), 1);
                    const scale = 1 - (normalizedDistance * 0.15); // 1.0 → 0.85
                    const opacity = 1 - (normalizedDistance * 0.5); // 1.0 → 0.5
                    const blur = normalizedDistance * 5; // 0px → 5px (depth-of-field effect)

                    gsap.set(card, { scale, opacity, filter: `blur(${blur}px)` });
                  }
                });
              }
            },
            29.0
          );

          // Set initial state for all cards (with delay to ensure refs are populated)
          requestAnimationFrame(() => {
            scene8CardRefs.current.forEach((card) => {
              if (card) {
                gsap.set(card, { scale: 0.85, opacity: 0.5, filter: "blur(5px)" });
              }
            });
          });
        }

        // ─── Scene 8B → Scene 9 Transition (at 35.5) ─────────────────────
        // Fade out Scene 8B white background
        if (scene8WhiteBgRef.current) {
          tl.to(
            scene8WhiteBgRef.current,
            { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
            35.5
          );
        }

        // Fade out Scene 8B dark grid
        if (scene8GridDarkRef.current) {
          tl.to(
            scene8GridDarkRef.current,
            { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
            35.5
          );
        }

        // Fade out Scene 8B white vignette
        if (scene8WhiteVignetteRef.current) {
          tl.to(
            scene8WhiteVignetteRef.current,
            { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
            35.5
          );
        }

        // Fade out Scene 8B text
        if (scene8TextBRef.current) {
          tl.to(
            scene8TextBRef.current,
            { autoAlpha: 0, y: -20, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" },
            35.5
          );
        }

        // Fade out Scene 8B person cards
        if (scene8CardsContainerRef.current) {
          tl.to(
            scene8CardsContainerRef.current,
            { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.inOut" },
            35.5
          );
        }

        // Fade in Scene 9 container
        if (scene9Ref.current) {
          tl.to(
            scene9Ref.current,
            { autoAlpha: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.inOut" },
            36.0
          );
        }

        // ─── Building to Grid Background Transformation (at 0.2) ──────────────────────────────────────
        tl.to(
          backImage,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.2
        );

        // ─── Grid Background Transformation ─────────────────────────────────────────────────────
        // Fade in grid with 70% vignette (at 0.2)
        tl.to(
          gridBg70,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.2
        );

        // Cross-fade from 70% vignette to 30% vignette (at 0.9)
        tl.to(
          gridBg70,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.9
        );

        tl.to(
          gridBg30,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.9
        );

        // Cross-fade from grid to dot background (at 1.7)
        tl.to(
          gridBg30,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          1.7
        );

        tl.to(
          dotBg,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          1.7
        );

        cleanupFnRef.current = () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
          loadTimeline.kill();
        };
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    setupAnimation();

    return () => {
      if (cleanupFnRef.current) cleanupFnRef.current();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section
        ref={sectionRef}
        className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#0A0D14]"
      >
        {/* ── Background Building Video ── */}
        <div
          ref={backImageRef}
          className="absolute inset-0 z-[1] will-change-transform"
        >
          <video
            src="/about/hero/about-hero-video.mov"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── Dark Overlay ── */}
        <div className="absolute inset-0 z-[3] bg-black/70 pointer-events-none" />

        {/* ── Grid Background Layer 1: Frame 2 (70% vignette) ── */}
        <div
          ref={gridBg70Ref}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <GridBackground
            lineColor="rgba(168, 85, 247, 0.17)"
            dotColor="rgba(168, 85, 247, 0.3)"
            gridSize={50}
            dotSize={1.5}
            vignetteIntensity={70}
          />
        </div>

        {/* ── Grid Background Layer 2: Frame 3+ (50% vignette) ── */}
        <div
          ref={gridBg30Ref}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <GridBackground
            lineColor="rgba(168, 85, 247, 0.17)"
            dotColor="rgba(168, 85, 247, 0.3)"
            gridSize={50}
            dotSize={1.5}
            vignetteIntensity={50}
          />
        </div>

        {/* ── Dot Background Layer: Frame 4 ── */}
        <div
          ref={dotBgRef}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <DottedGlowBackground
            className="pointer-events-none"
            opacity={0.2}
            gap={20}
            radius={1.5}
            color="rgba(255, 255, 255, 0.7)"
            glowColor="rgba(255, 255, 255, 0.9)"
            backgroundOpacity={0}
            speedMin={0.15}
            speedMax={0.5}
            speedScale={1}
          />
          {/* Vignette overlay - 70% intensity */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #000000 40%)" }} />
        </div>

        {/* ── White Background Layer: Scene 6 ── */}
        <div
          ref={whiteBgRef}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity bg-white"
        >
          <GridBackground
            lineColor="rgba(59, 130, 246, 0.08)"
            dotColor="rgba(59, 130, 246, 0.15)"
            gridSize={50}
            dotSize={1.5}
            showVignette={false}
          />
        </div>

        {/* ── Text Container (centered, never moves) ── */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 z-[5] flex items-center justify-center p-8 pointer-events-none"
        >
          {/* Scene 2 - visible initially, fades out */}
          <div
            ref={scene2Ref}
            className="absolute w-[90%] md:w-full max-w-[1100px] text-center top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 md:px-8"
          >
            <h1 className="font-sans font-normal leading-[1.1] text-white text-center m-0 tracking-tight text-[clamp(22px,5vw,28px)] md:text-[clamp(34px,4vw,40px)] lg:text-[clamp(36px,4vw,52px)] 2xl:text-[clamp(46px,3.5vw,56px)]">
              <span className="block">
                Empowering educational institutions
              </span>
              <span className="block">
                through integrated expertise, strategic guidance, and sustainable
                growth solutions
              </span>
            </h1>
          </div>

          {/* Scene 4 - fades in with blur */}
          <div
            ref={scene4Ref}
            className="absolute w-full max-w-[1100px] text-center opacity-0 px-4 md:px-8"
          >
            <h1 className="font-sans font-medium leading-[1.1] text-white text-center m-0 tracking-tight text-[clamp(28px,6vw,36px)] md:text-[clamp(42px,5vw,48px)] lg:text-[clamp(48px,5vw,64px)] 2xl:text-[clamp(60px,4.5vw,68px)]">
              <span className="block">Building Institutions That Inspire</span>
              <span className="block">Excellence And Lasting Impact</span>
            </h1>
          </div>

          {/* Scene 5 - VisionValues content (slides in from right) */}
          <div
            ref={scene5Ref}
            className="absolute inset-0 overflow-hidden flex items-center justify-center p-6 md:p-8 md:px-16 lg:px-20 opacity-0"
          >
            {/* Gradient 1 (Blue) - Top-left corner glow */}
            <div
              className="absolute -top-[200px] -left-[200px] w-[1100px] h-[1100px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(33,150,243,0.22) 0%, rgba(33,150,243,0.10) 35%, transparent 75%)",
                filter: "blur(220px)",
              }}
            />

            {/* Gradient 2 (Green) - Bottom-left corner glow */}
            <div
              className="absolute -bottom-[200px] -left-[200px] w-[1000px] h-[1000px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,255,120,0.16) 0%, rgba(0,255,120,0.08) 35%, transparent 75%)",
                filter: "blur(200px)",
              }}
            />

            <div className="grid lg:grid-cols-[49.5%_50.5%] gap-8 lg:gap-0 items-center justify-center max-w-[1280px] w-full">
              {/* Left column - content */}
              <div ref={scene5LeftRef} className="order-2 lg:order-1 opacity-0 will-change-transform">
                <h2 className="font-sans text-[1.8rem] xs:text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-semibold text-white leading-[1.08] tracking-tight">
                  <span className="block">Shaping The Future Of</span>
                  <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    Excellence
                  </span>
                  <span className="block mt-2 md:mt-4 text-white/90">
                    Empowering Institutions
                  </span>
                  <span className="block text-white/80">Through Expertise</span>
                </h2>

                <p className="text-white/50 text-[14px] md:text-[16px] lg:text-[17px] leading-[1.75] max-w-[520px] font-light mt-4 md:mt-8">
                  To help educational institutions overcome operational challenges,
                  unlock growth opportunities, and create environments where students,
                  educators, and communities can thrive.
                </p>

                <button className="mt-6 md:mt-10 group relative px-8 py-4 bg-black backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 pointer-events-auto">
                  <span className="relative z-10 text-white/90 text-sm font-medium tracking-wide flex items-center gap-3">
                    Learn More
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Right column - orbital illustration */}
              <div ref={scene5RightRef} className="order-1 lg:order-2 flex items-center justify-center opacity-0 will-change-transform">
                <div className="relative w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] lg:max-w-[450px] aspect-square flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute inset-0 rounded-full border border-blue-500/20" style={{
                      boxShadow: "0 0 60px rgba(59, 130, 246, 0.1), inset 0 0 60px rgba(59, 130, 246, 0.05)"
                    }} />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
                  </div>

                  {/* Middle ring */}
                  <div className="absolute inset-[8%] animate-spin-medium" style={{ animationDirection: "reverse" }}>
                    <div className="absolute inset-0 rounded-full border border-green-500/15" style={{
                      boxShadow: "0 0 50px rgba(34, 197, 94, 0.08), inset 0 0 50px rgba(34, 197, 94, 0.04)"
                    }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_18px_rgba(34,197,94,0.5)]" />
                  </div>

                  {/* Inner ring */}
                  <div className="absolute inset-[16%] animate-spin-fast">
                    <div className="absolute inset-0 rounded-full border border-purple-500/10" style={{
                      boxShadow: "0 0 40px rgba(168, 85, 247, 0.06), inset 0 0 40px rgba(168, 85, 247, 0.03)"
                    }} />
                  </div>

                  {/* Center image */}
                  <div className="relative w-[52%] aspect-square rounded-full overflow-hidden border-4 border-white/5 z-10" style={{
                    boxShadow: "0 0 80px rgba(59, 130, 246, 0.15), 0 0 40px rgba(34, 197, 94, 0.1), inset 0 0 60px rgba(0, 0, 0, 0.3)"
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 z-10 pointer-events-none" />
                    <Image
                      src="/about/hero/circular_img.png"
                      alt="Vision & Values"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene 7 - One Vision section with 4 sub-scenes */}
          <div
            ref={scene7Ref}
            className="absolute inset-0 overflow-y-auto flex items-start lg:items-center justify-center p-6 md:p-8 md:px-16 lg:px-20 z-[5] pointer-events-auto opacity-0"
          >
            {/* Black background with grid */}
            <div
              ref={scene7BlackBgRef}
              className="absolute inset-0 z-0 opacity-0 bg-black"
            >
              {/* Grid Background - positioned only behind text */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none">
                <GridBackground
                  lineColor="rgba(113, 196, 255, 0.2)"
                  dotColor="rgba(113, 196, 255, 0.4)"
                  gridSize={50}
                  dotSize={1.5}
                  vignetteIntensity={60}
                />
              </div>
            </div>

            {/* Content container - 50/50 split */}
            <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10 pointer-events-auto my-auto py-8">
              {/* Left - Static headline + Dynamic text content */}
              <div className="text-left pl-4 md:pl-8 pointer-events-auto relative">
                {/* Static headline - always visible */}
                <h2 className="font-sans text-[1.8rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-light leading-[1.1] tracking-tight" style={{ color: "#71C4FF" }}>
                  <span className="block">One Vision.</span>
                </h2>
                <h3 className="font-sans text-[1.8rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-light leading-[1.1] tracking-tight mt-2 md:mt-4" style={{ color: "#71C4FF" }}>
                  <span className="block">Multiple Areas Of Expertise.</span>
                </h3>

                {/* Dynamic text content container - positioned below headline */}
                <div className="relative h-[160px] xs:h-[120px] sm:h-[100px] lg:h-[120px] mt-6 md:mt-8 lg:mt-10">
                  {/* Sub-scene 7A - Text */}
                  <p
                    ref={scene7TextARef}
                    className="text-white text-sm xs:text-base lg:text-lg leading-relaxed max-w-xl font-light absolute inset-x-0 top-0 opacity-0 will-change-transform"
                  >
                    From human resources and finance to technology, infrastructure, student development, and operational support, Edify delivers connected solutions designed for institutional success.
                  </p>

                  {/* Sub-scene 7B - Text */}
                  <p
                    ref={scene7TextBRef}
                    className="text-white text-sm xs:text-base lg:text-lg leading-relaxed max-w-xl font-light absolute inset-x-0 top-0 opacity-0 will-change-transform"
                  >
                    We don't simply advise institutions. We work alongside them to plan, implement, support, and sustain meaningful change.
                  </p>

                  {/* Sub-scene 7C - Text */}
                  <p
                    ref={scene7TextCRef}
                    className="text-white text-sm xs:text-base lg:text-lg leading-relaxed max-w-xl font-light absolute inset-x-0 top-0 opacity-0 will-change-transform"
                  >
                    Every institution is unique. Our solutions are designed to align with individual goals, operational requirements, and long-term growth ambitions.
                  </p>

                  {/* Sub-scene 7D - Text */}
                  <p
                    ref={scene7TextDRef}
                    className="text-white text-sm xs:text-base lg:text-lg leading-relaxed max-w-xl font-light absolute inset-x-0 top-0 opacity-0 will-change-transform"
                  >
                    A commitment to educational excellence, institutional growth, and long-term impact drives every decision makes.
                  </p>
                </div>

                {/* Pagination indicator - 4 dots */}
                <div className="flex items-center gap-2 mt-6 md:mt-8">
                  <div
                    ref={scene7DotARef}
                    className="h-0.5 bg-white opacity-40 will-change-transform"
                    style={{ width: "8px" }}
                  />
                  <div
                    ref={scene7DotBRef}
                    className="h-0.5 bg-white opacity-40 will-change-transform"
                    style={{ width: "8px" }}
                  />
                  <div
                    ref={scene7DotCRef}
                    className="h-0.5 bg-white opacity-40 will-change-transform"
                    style={{ width: "8px" }}
                  />
                  <div
                    ref={scene7DotDRef}
                    className="h-0.5 bg-white opacity-40 will-change-transform"
                    style={{ width: "8px" }}
                  />
                </div>
              </div>

              {/* Right - Dynamic images for each sub-scene */}
              <div className="flex items-center justify-center relative w-full aspect-square max-w-[280px] xs:max-w-[340px] sm:max-w-[450px] lg:max-w-none lg:h-[450px] xl:h-[600px] mx-auto mt-8 lg:mt-0">
                {/* Sub-scene 7A - Image */}
                <div
                  ref={scene7ImgARef}
                  className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
                >
                  <Image
                    src="/about/hero/img1-vision.png"
                    alt="One Vision - Multiple Areas of Expertise"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 340px, (max-width: 1024px) 450px, 600px"
                    priority
                  />
                </div>

                {/* Sub-scene 7B - Image */}
                <div
                  ref={scene7ImgBRef}
                  className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
                >
                  <Image
                    src="/about/hero/img2-vision.png"
                    alt="Working alongside institutions"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 340px, (max-width: 1024px) 450px, 600px"
                    priority
                  />
                </div>

                {/* Sub-scene 7C - Image */}
                <div
                  ref={scene7ImgCRef}
                  className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
                >
                  <Image
                    src="/about/hero/img3-vision.png"
                    alt="Unique solutions for unique institutions"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 340px, (max-width: 1024px) 450px, 600px"
                    priority
                  />
                </div>

                {/* Sub-scene 7D - Image */}
                <div
                  ref={scene7ImgDRef}
                  className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
                >
                  <Image
                    src="/about/hero/img4-vision.png"
                    alt="Commitment to educational excellence"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 340px, (max-width: 1024px) 450px, 600px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scene 6 - Stats/Achievements section - Redesigned */}
          <div
            ref={scene6Ref}
            className="absolute inset-0 overflow-hidden flex items-center p-6 md:p-8 md:px-16 lg:px-20 opacity-0"
          >
            {/* Blurred background image */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center animate-zoom-in"
                style={{
                  backgroundImage: "url('/about/hero/stats-bg.png')",
                  filter: "blur(8px)",
                  transform: "scale(1.05)",
                  animation: "zoomIn 20s ease-out forwards"
                }}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="max-w-[1600px] w-full mx-auto relative z-10 grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center my-auto py-8">
              {/* Left Column: Headline + Subhead */}
              <div className="text-left">
                {/* Headline */}
                <h2 className="font-sans text-[1.8rem] xs:text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium leading-[1.1] tracking-tight text-white mb-4 md:mb-6">
                  Proven Results,<br />
                  Better Outcomes
                </h2>

                {/* Subheadline */}
                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                  Transforming educational institutions through integrated expertise, strategic guidance, and sustainable growth solutions that create lasting impact.
                </p>
              </div>

              {/* Right Column: 2x2 Stat Cards Grid */}
              <div
                ref={statsCounterRef}
                className="grid grid-cols-2 gap-4 md:gap-6"
              >
                {/* Stat Card 1 */}
                <div className="relative backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-4 xs:p-6 md:p-8 overflow-hidden group hover:bg-black/40 transition-all duration-300">
                  {/* Corner decoration dots */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />

                  <div
                    className="stat-number font-sans text-[2rem] xs:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-none text-white mb-2"
                    data-value="15"
                  >
                    0
                  </div>
                  <div className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                    Years of Excellence
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="relative backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-4 xs:p-6 md:p-8 overflow-hidden group hover:bg-black/40 transition-all duration-300">
                  {/* Corner decoration dots */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />

                  <div
                    className="stat-number font-sans text-[2rem] xs:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-none text-white mb-2"
                    data-value="500"
                  >
                    0
                  </div>
                  <div className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                    Institutions Served
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="relative backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-4 xs:p-6 md:p-8 overflow-hidden group hover:bg-black/40 transition-all duration-300">
                  {/* Corner decoration dots */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />

                  <div className="font-sans text-[2rem] xs:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-none text-white mb-2">
                    2M+
                  </div>
                  <div className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                    Students Impacted
                  </div>
                </div>

                {/* Stat Card 4 */}
                <div className="relative backdrop-blur-md bg-black/30 border border-white/10 rounded-lg p-4 xs:p-6 md:p-8 overflow-hidden group hover:bg-black/40 transition-all duration-300">
                  {/* Corner decoration dots */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/40 rounded-full" />

                  <div
                    className="stat-number font-sans text-[2rem] xs:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-medium leading-none text-white mb-2"
                    data-value="98"
                  >
                    0
                  </div>
                  <div className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene 8 - Leadership Driven → Expertise Behind Every Solution */}
          <div
            ref={scene8Ref}
            className="absolute inset-0 flex items-center justify-center overflow-hidden z-[5] opacity-0"
          >
            {/* Scene 8A: Black background */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Scene 8A: Cyan/Blue Grid */}
            <div
              ref={scene8GridCyanRef}
              className="absolute inset-0 z-[1] will-change-opacity"
            >
              <GridBackground
                lineColor="rgba(113, 196, 255, 0.2)"
                dotColor="rgba(113, 196, 255, 0.4)"
                gridSize={50}
                dotSize={1.5}
                vignetteIntensity={60}
              />
            </div>

            {/* Scene 8B: White background overlay */}
            <div
              ref={scene8WhiteBgRef}
              className="absolute inset-0 z-[2] bg-white opacity-0 will-change-opacity"
            />

            {/* Scene 8B: Dark Grid (for white background) */}
            <div
              ref={scene8GridDarkRef}
              className="absolute inset-0 z-[3] opacity-0 will-change-opacity"
            >
              <GridBackground
                lineColor="rgba(59, 130, 246, 0.15)"
                dotColor="rgba(59, 130, 246, 0.3)"
                gridSize={50}
                dotSize={1.5}
                showVignette={false}
              />
            </div>

            {/* Scene 8B: White vignette overlay for blending edges */}
            <div
              ref={scene8WhiteVignetteRef}
              className="absolute inset-0 z-[4] pointer-events-none opacity-0 will-change-opacity"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 30%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 1) 100%)",
                }}
              />
            </div>

            {/* Scene 8A: Center text content - "Leadership Driven. Expertise Backed." */}
            <div
              ref={scene8TextARef}
              className="absolute inset-0 flex items-center justify-center p-8 md:px-16 lg:px-20 z-[10]"
            >
              <div className="text-center max-w-[1600px] w-full mx-auto">
                <h1 className="font-sans text-[clamp(28px,6vw,36px)] md:text-[clamp(42px,5vw,48px)] lg:text-[clamp(48px,5vw,64px)] 2xl:text-[clamp(60px,4.5vw,68px)] font-medium leading-[1.1] tracking-tight text-white">
                  {scene8Visible && (
                    <BlurText
                      text="Leadership Driven. Expertise Backed."
                      animateBy="words"
                      direction="top"
                      delay={100}
                      stepDuration={0.4}
                      className="flex flex-wrap justify-center"
                      threshold={0.5}
                      rootMargin="0px"
                    />
                  )}
                </h1>
              </div>
            </div>

            {/* Scene 8B: Top text - "The Expertise Behind Every Solution" */}
            <div
              ref={scene8TextBRef}
              className="absolute top-0 left-0 right-0 pt-20 md:pt-28 lg:pt-32 z-[10] opacity-0 will-change-transform"
            >
              <div className="text-center px-8">
                <h2 className="font-sans text-[clamp(24px,5vw,32px)] md:text-[clamp(32px,4vw,40px)] lg:text-[clamp(36px,4vw,48px)] font-medium leading-[1.1] tracking-tight text-[#1a1a1a]">
                  The Expertise Behind Every Solution
                </h2>
              </div>
            </div>

            {/* Scene 8B: Person Cards - Horizontal Scroll */}
            <div
              ref={scene8CardsContainerRef}
              className="absolute inset-0 flex items-center z-[20] opacity-0 will-change-transform pointer-events-none"
            >
              <div className="flex gap-6 md:gap-8 px-8 md:px-16 w-max">
                {/* Person Profile Cards - wrapped for scale/opacity animation */}
                <div ref={(el) => { if (el) scene8CardRefs.current[0] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Ethan Carter"
                    title="Founder & Chief Executive Officer"
                    imageSrc="/about/team/Ethan-Carter.jpg"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[1] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Sophia Bennett"
                    title="Chief Operating Officer"
                    imageSrc="/about/team/Sophia-Bennett.jpg"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[2] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Liam Anderson"
                    title="Chief Technology Officer"
                    imageSrc="/about/team/Liam-Anderson.jpg"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[3] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Olivia Parker"
                    title="Head of Product Design"
                    imageSrc="/about/team/Olivia-Parker.jpg"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[4] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Noah Mitchell"
                    title="Lead Software Engineer"
                    imageSrc="/about/team/Noah-Mitchell.avif"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[5] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Ava Collins"
                    title="Marketing & Brand Strategist"
                    imageSrc="/about/team/Ava-Collins.avif"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[6] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Mason Brooks"
                    title="Business Development Manager"
                    imageSrc="/about/team/Mason-Brooks.jpg"
                    className="pointer-events-auto"
                  />
                </div>
                <div ref={(el) => { if (el) scene8CardRefs.current[7] = el; }} className="will-change-transform">
                  <PersonProfileCard
                    name="Isabella Reed"
                    title="Customer Success Manager"
                    imageSrc="/about/team/Isabella-Reed.jpg"
                    className="pointer-events-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scene 9 - Driven by expertise */}
          <div
            ref={scene9Ref}
            className="absolute inset-0 flex items-center justify-center overflow-hidden z-[5] opacity-0"
          >
            {/* Scene 9: Black background */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Scene 9: Cyan/Blue Grid */}
            <div
              ref={scene9GridCyanRef}
              className="absolute inset-0 z-[1] will-change-opacity"
            >
              <GridBackground
                lineColor="rgba(113, 196, 255, 0.2)"
                dotColor="rgba(113, 196, 255, 0.4)"
                gridSize={50}
                dotSize={1.5}
                vignetteIntensity={60}
              />
            </div>

            {/* Scene 9: Center text content */}
            <div
              ref={scene9TextRef}
              className="absolute inset-0 flex items-center justify-center p-8 md:px-16 lg:px-20 z-[10]"
            >
              <div className="text-center max-w-[1600px] w-full mx-auto">
                <h1 className="font-sans text-[clamp(28px,6vw,36px)] md:text-[clamp(42px,5vw,48px)] lg:text-[clamp(48px,5vw,64px)] 2xl:text-[clamp(60px,4.5vw,68px)] font-medium leading-[1.1] tracking-tight text-white">
                  {scene9Visible && (
                    <BlurText
                      text="Driven by expertise. United by a commitment to educational excellence."
                      animateBy="words"
                      direction="top"
                      delay={100}
                      stepDuration={0.4}
                      className="flex flex-wrap justify-center"
                      threshold={0.5}
                      rootMargin="0px"
                    />
                  )}
                </h1>
              </div>
            </div>
          </div>

        </div>

        {/* ── Animation Styles for Orbital Rings ── */}
        <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-medium {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 45s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 35s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 25s linear infinite;
        }
      `}</style>
      </section>
    </div>
  );
}
