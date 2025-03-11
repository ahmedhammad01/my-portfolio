import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stars from './components/Stars';
import './App.css';

function Box() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#ff0000' : '#00ffff'} 
        metalness={0.5}
        roughness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <div className="h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#000008']} />
        <fog attach="fog" args={['#000008', 5, 15]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Stars />
          <Box />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 text-white p-4">
        <h1 className="text-2xl font-bold bg-black/50 p-2 rounded-lg">Interactive 3D Portfolio</h1>
        <div className="mt-4 bg-black/50 p-2 rounded-lg">
          <p className="text-sm">Click the cube to scale it</p>
          <p className="text-sm">Hover to change its color</p>
          <p className="text-sm">Drag to rotate the view</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/my-portfolio">
      <Routes>
        <Route path="/" element={<Scene />} />
      </Routes>
    </Router>
  );
}

export default App;
