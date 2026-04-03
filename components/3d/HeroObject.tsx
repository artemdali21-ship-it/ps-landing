"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import type { Mesh } from "three";

function KineticShape({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const meshRef = useRef<Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1 + mouseY * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.1) * 0.05 + mouseX * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#C41230"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroObject({
  mouseX = 0,
  mouseY = 0,
}: {
  mouseX?: number;
  mouseY?: number;
}) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FAF6F0" />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color="#C41230" />
        <pointLight position={[0, -10, 5]} intensity={0.8} color="#F3ECE2" />
        <KineticShape mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
