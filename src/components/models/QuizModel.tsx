import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

type Props = {
    openModal: (key: string) => void;
};

function QuizModel({ openModal }: Props) {
    const { scene } = useGLTF("./quiz.glb");
    const { camera } = useThree();

    const [collisionDetected, setCollisionDetected] = useState(false);

    const handleCollision = () => {
        setCollisionDetected(true);
        openModal("quiz");
    };

    useFrame(() => {
        if (collisionDetected) {
            camera.position.x = 150;
            camera.position.y = -50;
            camera.position.z = -100;
            camera.lookAt(150, -50, -100);
        }
    });

    return (
        <RigidBody
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
