import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const ParticleSystem = () => {
  const particlesRef = useRef();

  // Animate particles
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002; // Rotate particles slowly
    }
  });

  // Generate random particles
  const particles = new Float32Array(5000 * 3); // 5000 particles
  for (let i = 0; i < particles.length; i++) {
    particles[i] = (Math.random() - 0.5) * 10; // Random position in 3D space
  }

  return (
    <Points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const FullScreenBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
};

export default FullScreenBackground;