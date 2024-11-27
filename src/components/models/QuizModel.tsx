import useStore from "@/stores/useStore";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

import * as THREE from "three";

function QuizModel() {
    const { scene } = useGLTF("./quiz.glb");

    const quizRef = useRef<THREE.Object3D>(null);
    const openModal = useStore((state) => state.openModal);

    const handleCollision = () => {
        openModal("quiz", quizRef.current, { x: -100, y: -50, z: 0 });
    };

    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            onCollisionEnter={handleCollision}
        >
            <primitive
                ref={quizRef}
                object={scene}
                scale={[75, 75, 75]}
                rotation={[0, -Math.PI / 1.5, 0]}
                position={[350, -25, -250]}
                onClick={handleCollision}
            />
        </RigidBody>
    );
}

export default QuizModel;
