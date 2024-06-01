import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function OceanModel() {
    const { nodes } = useGLTF("./ocean.glb");
    return (
        <RigidBody type="fixed" friction={0.7}>
            <primitive object={nodes.Ocean} rotation={[-Math.PI / 2, 0, 0]} />
        </RigidBody>
    );
}
