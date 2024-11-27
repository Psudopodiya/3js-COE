import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type Props = {
    position: number[];
    rotation: number[];
};

function SeaMonsterModel({ position, rotation }: Props) {
    const { scene } = useGLTF("./sea_monster.glb");

    return (
        <RigidBody colliders="trimesh" type="fixed" restitution={0.2}>
            <primitive
                object={scene}
                position={position}
                scale={[20, 20, 20]}
                rotation={rotation}
            />
        </RigidBody>
    );
}

export default SeaMonsterModel;
