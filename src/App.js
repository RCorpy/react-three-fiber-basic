import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Tile from './models/Tile'
import Duck from './models/Duck'

//import Duck from './models/Duck'

import './App.css'

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default function App() {

  let board = {}

  for (let i =0 ; i<8 ; i++){
    for (let j = 0 ; j<8 ; j++){
      board[`${i}${j}`]= {
        tile: <Tile key={`${i}${j}`} position={[i-4,0,j]} color={(i+j)%2 === 0 ? "white": "black"} />,
        piece: null
      }
      if(i===1){
        board[`${i}${j}`].piece = {
          type: <Duck position={[i-4,0,j]} team="white"/>,
          team: "white"
        }
      }
      if(i===6){
        board[`${i}${j}`].piece = {
          type: <Duck position={[i-4,0,j]} team="black" rotation={[0,Math.PI,0]}/>,
          team: "black"
        }
      }
    }
  }

  return (
    <Canvas className="canvas" style={{height: "100vh", width: "100vw"}}>
      
      <CameraControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/*
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      */}
      <Tile position={[2,-3,2]} color="black"/>
      <Suspense fallback={null}>
      {/* <Duck /> */}
      {Object.keys(board).map((key)=>(board[key].tile))}
      {Object.keys(board).map((key)=>(board[key].piece ? board[key].piece.type : null))}

      </Suspense>
    </Canvas>
  )
}
