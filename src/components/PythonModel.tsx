import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

type Props = {
    openModal: () => void;
};

function PythonModel({ openModal }: Props) {
    const { scene } = useGLTF("./python.glb");

    const islandRef = useRef<RigidBody>(null);
    const { camera } = useThree();
    const [collisionDetected, setCollisionDetected] = useState(false);

    const handleCollision = () => {
        setCollisionDetected(true);
        openModal();
    };

    useFrame(() => {
        if (collisionDetected && islandRef.current) {
            const position = islandRef.current.translation();
            camera.position.copy(position);
            camera.position.z += 50;
            camera.position.y += 50;
            camera.lookAt(position.x, position.y + 50, position.z);
        }
    });

    return (
        <RigidBody
            ref={islandRef}
            type="fixed"
            colliders="trimesh"
            restitution={0.2}
            onCollisionEnter={handleCollision}
        >
            <primitive
                object={scene}
                position={[-150, 0, -250]}
                scale={[75, 75, 75]}
                rotation={[0, -Math.PI / 2, 0]}
            />
        </RigidBody>
    );
}

export default PythonModel;
