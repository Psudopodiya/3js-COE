import { useGLTF } from "@react-three/drei";

export default function OceanModel() {
    const { nodes } = useGLTF("./ocean.glb");
    return (
        <primitive
            object={nodes.Ocean}
            rotation={[-Math.PI / 2, 0, 0]}
        />
    );
}
