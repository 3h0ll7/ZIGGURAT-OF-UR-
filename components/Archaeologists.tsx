import React from 'react';
import * as THREE from 'three';
import '@react-three/fiber';

const positions = [
  [0, 1, 30],     // Base of central stair
  [10, 1, 35],    // Walking approach
  [-5, 16, 16],   // On first tier landing
  [0, 32, 0],     // Near top temple
  [40, 1, -20],   // Inspecting corner
  [-35, 1, 0],    // Inspecting side
];

export const Archaeologists: React.FC = () => {
  return (
    <group>
      {positions.map((pos, idx) => (
        <group key={idx} position={new THREE.Vector3(pos[0], pos[1], pos[2])}>
          {/* Body */}
          <mesh castShadow position={[0, 0.9, 0]}>
            <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
            <meshStandardMaterial color="#334455" roughness={0.8} />
          </mesh>
          {/* Head */}
          <mesh castShadow position={[0, 1.65, 0]}>
             <sphereGeometry args={[0.25, 8, 8]} />
             <meshStandardMaterial color="#dcb" roughness={0.5} />
          </mesh>
          {/* A small clipboard or tool */}
          {idx % 2 === 0 && (
            <mesh position={[0.3, 1, 0.2]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[0.3, 0.4, 0.05]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};