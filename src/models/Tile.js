import React, { useRef, useState} from 'react'

export default function Tile({position, color}) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
        //useFrame((/*state,delta*/) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        ref={ref}
        position={position}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 0.01, 1]} />
        <meshStandardMaterial color={!clicked ? (hovered ? 'orange' : color) : 'green'} />
      </mesh>
    )
  }

