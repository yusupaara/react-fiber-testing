import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from "@react-three/drei";
import Bumi from './components/Bumi';
import Plane from './components/Plane';
import BumiNew from './components/Scene';
import { Mesh } from 'three';
import ControlPanel from './components/ControlPanel'
import useGeoloaction from './hooks/useGeolocation';
// import { useEffect } from 'react';
// import usePlanes from './hooks/usePlanes';

// const nullIsland = {
//   id: 'nullIsland',
//   type: 'island',
//   lat: 0,
//   lng: 0,
// }

// function Rotari({tanda}) {
//   const meshRef = useRef();

//   useFrame(() => {
//     if (!meshRef.current){
//       return;
//     }

//     meshRef.current.rotation.y += 0.001;
//     meshRef.current.rotation.x += 0.00;
//   });

//   return (
//     <mesh ref={meshRef}>
//       <Bumi marker={tanda} />
//     </mesh>
//   )
// }

function Rotari() {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current){
      return;
    }

    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <BumiNew />
    </mesh>
  )
}

export default function App() {
  const [activeMarkerId, setActiveMarkerId] = useState('me')
  const userLocation = useGeoloaction()
  // const planes = usePlanes(userLocation)
  // const markers = useMemo(() => userLocation ? [{ id: 'me', type: 'person', ...userLocation }, ...planes] : [nullIsland], [userLocation, planes])

  const markers = [
    { id: 'me', ...userLocation}
  ]

  console.log(userLocation);
  
  const activeMarker = markers.find(marker => marker.id === activeMarkerId)

  // If current marker id is no longer in markers list, default to first item in the marker list
  // useEffect(() => {
  //   const activeMarker = markers.find(marker => marker.id === activeMarkerId)
  //   if (!activeMarker) {
  //     setActiveMarkerId(markers[0].id)
  //   }
  // }, [userLocation, activeMarkerId, markers])

  return (
    <>
      <div className="title">
        {/* <h1>3D Nearby Plane Tracker</h1> */}
      </div>
      <Canvas style={{
        height: 'calc(100vh - 170px)',
        width: '100vw'
      }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 7]} intensity={900} />
        <Stars />
        {/* <Bumi marker={activeMarker} /> */}
        {/* <Plane /> */}
        {/* <Rotari tanda={activeMarker} /> */}
        <Rotari />

      </Canvas>
      <div className="controls">
        <ControlPanel markers={markers} activeMarkerId={activeMarkerId} setActiveMarkerId={setActiveMarkerId} />
      </div>
    </>
  )
}