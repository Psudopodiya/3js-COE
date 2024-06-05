import useStore from "@/stores/useStore";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

import * as THREE from "three";

function PythonModel() {
    const { scene } = useGLTF("./python.glb");

    const pythonRef = useRef<THREE.Object3D | null>(null);
    const openModal = useStore((state) => state.openModal);

    const handleCollision = () => {
        openModal("python", pythonRef.current, { x: 150, y: -50, z: 75 });
    };

    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            restitution={0.2}
            onCollisionEnter={handleCollision}
        >
            <primitive
                ref={pythonRef}
                object={scene}
                position={[-250, 0, -250]}
                scale={[75, 75, 75]}
                rotation={[0, -Math.PI / 2, 0]}
                onClick={handleCollision}
            />
        </RigidBody>
    );
}

export default PythonModel;
