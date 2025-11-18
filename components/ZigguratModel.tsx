import React, { useMemo } from 'react';
import * as THREE from 'three';
import '@react-three/fiber';

export const ZigguratModel: React.FC = () => {
  
  // Material for the baked mud bricks
  // Uses a warm reddish-brown typical of Ur's fired bricks (Bitumen often used as mortar)
  const brickMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#8B4513', // SaddleBrown
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true, // Enhances the faceted low-poly cinematic look
    });
  }, []);

  const stairMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#703810', // Slightly darker for contrast
      roughness: 1,
      flatShading: true,
    });
  }, []);

  return (
    <group castShadow receiveShadow>
      
      {/* --- TIER 1 (Bottom) --- */}
      {/* Dimensions roughly based on historical scale approx 60m x 45m base */}
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow material={brickMaterial}>
        <boxGeometry args={[60, 15, 45]} />
      </mesh>
      {/* Buttresses/Details on Tier 1 walls */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`buttress-1-${i}`} position={[30.5, 7.5, -20 + i * 4.5]} castShadow receiveShadow material={brickMaterial}>
          <boxGeometry args={[1, 15, 2]} />
        </mesh>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`buttress-2-${i}`} position={[-30.5, 7.5, -20 + i * 4.5]} castShadow receiveShadow material={brickMaterial}>
          <boxGeometry args={[1, 15, 2]} />
        </mesh>
      ))}

      {/* --- TIER 2 (Middle) --- */}
      <mesh position={[0, 15 + 5, 0]} castShadow receiveShadow material={brickMaterial}>
        <boxGeometry args={[40, 10, 30]} />
      </mesh>

      {/* --- TIER 3 (Top) --- */}
      <mesh position={[0, 25 + 3, 0]} castShadow receiveShadow material={brickMaterial}>
        <boxGeometry args={[20, 6, 15]} />
      </mesh>

      {/* --- TEMPLE (Summit) --- */}
      <mesh position={[0, 31 + 2.5, 0]} castShadow receiveShadow material={brickMaterial}>
        <boxGeometry args={[10, 5, 10]} />
      </mesh>

      {/* --- MAIN CENTRAL STAIRCASE --- */}
      {/* Long ramp extending from ground to Tier 1 */}
      <group position={[0, 0, 22.5]}>
        <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, 5, 12]} castShadow receiveShadow material={stairMaterial}>
          <boxGeometry args={[6, 24, 1]} />
        </mesh>
        {/* Side walls for stair */}
        <mesh rotation={[-Math.PI / 6, 0, 0]} position={[3.5, 5, 12]} castShadow receiveShadow material={brickMaterial}>
          <boxGeometry args={[1, 24, 2]} />
        </mesh>
        <mesh rotation={[-Math.PI / 6, 0, 0]} position={[-3.5, 5, 12]} castShadow receiveShadow material={brickMaterial}>
          <boxGeometry args={[1, 24, 2]} />
        </mesh>
      </group>

      {/* --- SIDE STAIRCASES --- */}
      {/* These converge towards the central landing */}
      <group position={[0, 0, 22.5]}>
        {/* Left Side Ramp */}
        <mesh rotation={[0, 0, Math.PI / 7]} position={[15, 5, 0]} castShadow receiveShadow material={stairMaterial}>
           <boxGeometry args={[24, 1, 6]} />
        </mesh>
         {/* Right Side Ramp */}
         <mesh rotation={[0, 0, -Math.PI / 7]} position={[-15, 5, 0]} castShadow receiveShadow material={stairMaterial}>
           <boxGeometry args={[24, 1, 6]} />
        </mesh>
      </group>

      {/* --- Upper Stairs (Tier 1 to 2) --- */}
      <mesh rotation={[-Math.PI / 5, 0, 0]} position={[0, 16, 17]} castShadow receiveShadow material={stairMaterial}>
         <boxGeometry args={[4, 10, 1]} />
      </mesh>

      {/* --- DEBRIS / EROSION --- */}
      {/* Procedurally place some small mounds at corners to simulate sand buildup */}
      <mesh position={[30, 1, 22]} rotation={[0, Math.PI/4, 0]} castShadow receiveShadow>
        <coneGeometry args={[5, 4, 8]} />
        <meshStandardMaterial color="#c2b280" />
      </mesh>
      <mesh position={[-30, 1, 22]} rotation={[0, -Math.PI/4, 0]} castShadow receiveShadow>
        <coneGeometry args={[5, 4, 8]} />
        <meshStandardMaterial color="#c2b280" />
      </mesh>

    </group>
  );
};