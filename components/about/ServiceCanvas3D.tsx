"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.4, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#3b82f6"
          roughness={0.3}
          metalness={0.2}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function ServiceCanvas3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-25">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}