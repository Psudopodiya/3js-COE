import { useGLTF } from "@react-three/drei";

function PythonModel() {
    const { scene } = useGLTF("./python.glb");
    return (
        <primitive
            object={scene}
            position={[-150, 0, -250]}
            scale={[50, 50, 50]}
            rotation={[0, -Math.PI / 2, 0]}
        />
    );
}

export default PythonModel;
