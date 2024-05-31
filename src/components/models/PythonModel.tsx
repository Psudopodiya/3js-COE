import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

type Props = {
    openModal: (key: string) => void;
};

function PythonModel({ openModal }: Props) {
    const { scene } = useGLTF("./python.glb");

    const { camera } = useThree();
    const [collisionDetected, setCollisionDetected] = useState(false);

    const handleCollision = () => {
        setCollisionDetected(true);
        openModal("python");
    };

    useFrame(() => {
        if (collisionDetected) {
            camera.position.x = 0;
            camera.position.z = -50;
            camera.position.y = -50;
            camera.lookAt(-15, -50, -100);
        }
    });

    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            restitution={0.2}
            onCollisionEnter={handleCollision}
        >
            <primitive
                object={scene}
                position={[-250, 0, -250]}
                scale={[75, 75, 75]}
                rotation={[0, -Math.PI / 2, 0]}
            />
        </RigidBody>
    );
}

export default PythonModel;
