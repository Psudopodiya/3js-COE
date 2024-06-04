import useStore from "@/stores/useStore";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

function QuizModel() {
    const { scene } = useGLTF("./quiz.glb");

    const quizRef = useRef<RapierRigidBody | null>(null);
    const openModal = useStore((state) => state.openModal);

    const handleCollision = () => {
        openModal("quiz", quizRef.current);
    };

    return (
        <RigidBody
            ref={quizRef}
            type="fixed"
            colliders="trimesh"
            onCollisionEnter={handleCollision}
        >
            <primitive
                object={scene}
                scale={[75, 75, 75]}
                rotation={[0, -Math.PI / 1.5, 0]}
                position={[250, -25, -250]}
            />
        </RigidBody>
    );
}

export default QuizModel;
