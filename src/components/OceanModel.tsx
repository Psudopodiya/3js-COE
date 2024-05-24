import { useGLTF } from "@react-three/drei";

export default function OceanModel() {
    const { nodes } = useGLTF("./ocean.glb");

    return (
        <mesh
            geometry={nodes.Ocean.geometry}
            material={nodes.Ocean.material}
            rotation={[-Math.PI / 2, 0, 0]}
        />
    );
}
