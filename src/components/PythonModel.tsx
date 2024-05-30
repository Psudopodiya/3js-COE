import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

function PythonModel() {
    const { scene } = useGLTF("./python.glb");
    return (
        <RigidBody type="fixed" colliders="trimesh" restitution={0.2}>
        <primitive
            object={scene}
            position={[-150, 0, -250]}
            scale={[50, 50, 50]}
            rotation={[0, -Math.PI / 2, 0]}
            
        />
        </RigidBody>
    );
}

export default PythonModel;
