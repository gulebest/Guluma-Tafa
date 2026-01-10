import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei";

function Loader() {
  return (
    <Html center className="canvas-loader">
      <span>Loading 3D...</span>
    </Html>
  );
}

function AccentMesh() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x += delta * 0.18;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.35, 128, 16]} />
        <meshStandardMaterial
          color="#58a6ff"
          emissive="#58a6ff"
          emissiveIntensity={0.25}
          metalness={0.45}
          roughness={0.35}
          wireframe
        />
      </mesh>
      <Sparkles count={45} speed={0.6} opacity={0.4} scale={[7, 2.6, 2]} color="#7aa2ff" />
    </Float>
  );
}

export default function PortfolioAccentCanvas() {
  return (
    <div className="portfolio-accent-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Suspense fallback={<Loader />}>
          <color attach="background" args={["#0a192f"]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 4, 5]} intensity={1.0} />
          <pointLight position={[-4, -2, -5]} intensity={0.45} color="#7aa2ff" />

          <AccentMesh />

          {/* Keep controls subtle: allows a small “feel” of interaction without becoming a toy. */}
          <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} />
        </Suspense>
      </Canvas>
    </div>
  );
}
