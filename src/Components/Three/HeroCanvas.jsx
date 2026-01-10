import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  return (
    <Html center className="canvas-loader">
      <span>Loading 3D...</span>
    </Html>
  );
}

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 6, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, -1, -4]} intensity={0.5} color="#7aa2ff" />
    </>
  );
}

export function CameraRig({ distance = 7, lerpSpeed = 0.08, prefersReducedMotion }) {
  const target = useRef(new THREE.Vector3(0, 0, distance));

  useFrame(({ camera, mouse }) => {
    if (prefersReducedMotion) return;
    target.current.set(mouse.x * 1.4, mouse.y * 0.9, distance);
    camera.position.lerp(target.current, lerpSpeed);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function FloatingGem({ prefersReducedMotion, isMobile }) {
  const meshRef = useRef(null);
  const colorA = useMemo(() => new THREE.Color("#7cc6ff"), []);
  const colorB = useMemo(() => new THREE.Color("#5b8dff"), []);
  const blendedColor = useMemo(() => colorA.clone().lerp(colorB, 0.35), [colorA, colorB]);
  const { viewport } = useThree();

  // Slightly dial back distortion on very small viewports for performance.
  const isNarrow = viewport.width < 6 || isMobile;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (prefersReducedMotion) return;
    meshRef.current.rotation.y += delta * 0.6;
    meshRef.current.rotation.x += delta * 0.3;
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : isMobile ? 0.8 : 1.1}
      rotationIntensity={prefersReducedMotion ? 0 : isMobile ? 0.55 : 0.8}
      floatIntensity={prefersReducedMotion ? 0 : isMobile ? 0.65 : 0.9}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          speed={1.6}
          distort={isNarrow ? 0.2 : 0.32}
          color={blendedColor}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
      <Sparkles
        count={prefersReducedMotion ? 10 : isMobile ? 18 : 40}
        speed={prefersReducedMotion ? 0 : 0.7}
        opacity={0.6}
        scale={5}
        color="#7aa2ff"
      />
    </Float>
  );
}

function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <circleGeometry args={[4, 32]} />
      <meshBasicMaterial
        color="#58a6ff"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HeroScene({ prefersReducedMotion, isMobile }) {
  return (
    <>
      <color attach="background" args={["#0d1117"]} />
      <fog attach="fog" args={["#0d1117", 6, 14]} />
      <SceneLighting />
      <FloatingGem prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
      <GroundGlow />
      <CameraRig prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}

export default function HeroCanvas() {
  const [dpr, setDpr] = useState([1, 1.8]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track motion preference and viewport size so we can dial back effects on mobile or when reduced motion is requested.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 640px)");

    const handleMotionChange = () => setPrefersReducedMotion(motionMedia.matches);
    const handleMobileChange = () => setIsMobile(mobileMedia.matches);

    handleMotionChange();
    handleMobileChange();

    motionMedia.addEventListener("change", handleMotionChange);
    mobileMedia.addEventListener("change", handleMobileChange);

    return () => {
      motionMedia.removeEventListener("change", handleMotionChange);
      mobileMedia.removeEventListener("change", handleMobileChange);
    };
  }, []);

  // Lower DPR for small screens to keep perf in check and be gentler when motion is reduced.
  useEffect(() => {
    if (prefersReducedMotion) {
      setDpr([1, 1]);
      return;
    }

    setDpr(isMobile ? [1, 1.2] : [1, 1.8]);
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        shadows
        dpr={dpr}
        frameloop={prefersReducedMotion ? "demand" : "always"}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <Suspense fallback={<Loader />}>
          <HeroScene prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
