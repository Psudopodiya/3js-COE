import useStore from "@/stores/useStore";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

function LightHouseModel() {
    const model = useGLTF("./lighthouse.glb");

    const lightHouseRef = useRef<THREE.Object3D>(null);
    const openModal = useStore((state) => state.openModal);

    const handleCollision = () => {
        openModal("lightHouse", lightHouseRef.current, {
            x: 25,
            y: -50,
            z: -50,
        });
    };

    return (
        <RigidBody
            type="fixed"
            colliders="cuboid"
            onCollisionEnter={handleCollision}
        >
            <primitive
                ref={lightHouseRef}
                object={model.scene}
                scale={[50, 50, 50]}
                rotation={[0, -Math.PI / 1.2, 0]}
                position={[0, -20, -500]}
                onClick={handleCollision}
            />
        </RigidBody>
    );
}

export default LightHouseModel;
