import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import '@react-three/fiber'; // Augment JSX.IntrinsicElements
import { OrbitControls, Sky, Stars, SoftShadows, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ZigguratModel } from './ZigguratModel';
import { SandStorm } from './SandStorm';
import { Archaeologists } from './Archaeologists';

interface ZigguratExperienceProps {
  sunAzimuth: number;
  sunElevation: number;
  windSpeed: number;
  showHumans: boolean;
  onResetCamera: () => void;
}

// Helper to calculate sun position from spherical coords
const getSunPosition = (azimuthDeg: number, elevationDeg: number): [number, number, number] => {
  const phi = THREE.MathUtils.degToRad(90 - elevationDeg);
  const theta = THREE.MathUtils.degToRad(azimuthDeg);
  
  const r = 100;
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
};

const CameraController: React.FC<{ resetTrigger: number }> = ({ resetTrigger }) => {
  const ref = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (ref.current) {
      ref.current.reset();
      // Set specific initial view angle
      camera.position.set(80, 40, 80);
      camera.lookAt(0, 10, 0);
    }
  }, [resetTrigger, camera]);

  return (
    <OrbitControls
      ref={ref}
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground
      minDistance={20}
      maxDistance={200}
      enablePan={true}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
};

export const ZigguratExperience: React.FC<ZigguratExperienceProps> = ({
  sunAzimuth,
  sunElevation,
  windSpeed,
  showHumans,
  onResetCamera,
}) => {
  const sunPosition = useMemo(
    () => getSunPosition(sunAzimuth, sunElevation),
    [sunAzimuth, sunElevation]
  );

  // Determine light intensity based on elevation (dimmer at sunrise/set)
  const lightIntensity = useMemo(() => {
    return Math.max(0.1, Math.sin(THREE.MathUtils.degToRad(sunElevation)) * 2);
  }, [sunElevation]);

  const ambientIntensity = useMemo(() => {
    return Math.max(0.2, 0.6 * Math.sin(THREE.MathUtils.degToRad(sunElevation)));
  }, [sunElevation]);

  // Fog color shifts from orange/red at low angles to white/blue at noon
  const fogColor = useMemo(() => {
    if (sunElevation < 10) return '#c25e00'; // deep sunset orange
    if (sunElevation < 30) return '#e6aa6b'; // golden hour
    return '#dbeafe'; // hazy blue/white
  }, [sunElevation]);

  return (
    <Canvas shadows dpr={[1, 2]} className="w-full h-full bg-black">
      <PerspectiveCamera makeDefault fov={45} position={[80, 40, 80]} />
      <CameraController resetTrigger={sunAzimuth === 85 && sunElevation === 15 ? 0 : 1} />

      {/* Environment */}
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 50, 350]} />
      
      <Sky
        distance={45000}
        sunPosition={sunPosition}
        inclination={0}
        azimuth={0.25}
        turbidity={10} // Sandy atmosphere
        rayleigh={2}
      />
      
      {sunElevation < 0 && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} color="#ffeebb" />
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={lightIntensity}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0005}
        color={sunElevation < 20 ? "#ffaa00" : "#fff"}
      />

      {/* Scene Objects */}
      <group position={[0, -5, 0]}>
        {/* Ground Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial 
            color="#c2b280" 
            roughness={1}
            metalness={0}
          />
        </mesh>

        <ZigguratModel />
        
        {showHumans && <Archaeologists />}
        
        <SandStorm windSpeed={windSpeed} sunElevation={sunElevation} />
      </group>

      <Environment preset="city" environmentIntensity={0.2} />
    </Canvas>
  );
};