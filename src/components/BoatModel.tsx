import { useGLTF } from "@react-three/drei";

export default function OceanModel() {
    const { nodes } = useGLTF("./toon_sea.glb");
    return (
        <primitive
            object={nodes.Canoe}
            position={[3, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, Math.PI / 2, 0]}
        />
    );
}
