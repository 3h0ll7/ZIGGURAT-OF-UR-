import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import '@react-three/fiber'; // Augment JSX.IntrinsicElements
import * as THREE from 'three';

interface SandStormProps {
  windSpeed: number;
  sunElevation: number;
}

export const SandStorm: React.FC<SandStormProps> = ({ windSpeed, sunElevation }) => {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null);
  
  // Create initial positions
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200; // Spread wide
      const y = Math.random() * 20;          // Keep low to ground
      const z = (Math.random() - 0.5) * 200;
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    // Wind direction vector (roughly moving across x axis)
    const moveSpeed = windSpeed * 10 * delta; 
    
    for (let i = 0; i < count; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];

      // Move particle
      x += moveSpeed;
      
      // Add turbulence
      y += Math.sin(state.clock.elapsedTime + x) * 0.02 * windSpeed;

      // Reset if out of bounds
      if (x > 100) {
        x = -100;
        y = Math.random() * 20; 
        z = (Math.random() - 0.5) * 200;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  // Adjust particle color/opacity based on light
  const particleColor = sunElevation < 10 ? 0xcc8855 : 0xddccaa;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color={particleColor}
        transparent
        opacity={Math.min(0.6, windSpeed * 0.1)} // More visible with higher wind
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};