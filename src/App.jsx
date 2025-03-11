import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <meshStandardMaterial color={hovered ? '#ff0000' : '#00ffff'} />
    </mesh>
  );
}

function Scene() {
  return (
    <div className="h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Box />
        <OrbitControls />
      </Canvas>
      <div className="absolute top-0 left-0 text-white p-4">
        <h1 className="text-2xl font-bold">Interactive 3D Scene</h1>
        <p className="text-sm mt-2">Click the cube to scale it</p>
        <p className="text-sm">Hover to change its color</p>
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
