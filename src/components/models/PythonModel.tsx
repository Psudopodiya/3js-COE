import useStore from "@/stores/useStore";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

function PythonModel() {
    const { scene } = useGLTF("./python.glb");

    const pythonRef = useRef<RapierRigidBody | null>(null);
    const openModal = useStore((state) => state.openModal);

    const handleCollision = () => {
        openModal("python", pythonRef.current);
    };

    return (
        <RigidBody
            ref={pythonRef}
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
