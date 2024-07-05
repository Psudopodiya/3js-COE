import useStore from "@/stores/useStore.tsx";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
    shellIndex: number;
    boatPosition: THREE.Vector3;
    rotation: THREE.Quaternion;
};

const dampingFactor = 0.98;

function Shell({ shellIndex, boatPosition, rotation }: Props): JSX.Element {
    const rigidBodyRef = useRef<RapierRigidBody | null>(null);

    const [position, setPosition] = useState<THREE.Vector3 | undefined>();

    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(rotation);
    const initialVelocity = direction
        .multiplyScalar(500)
        .add(new THREE.Vector3(0, 300, 0));

    const [velocity, setVelocity] = useState(initialVelocity);
    const sphere = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const { removeShell } = useStore((state) => state);
    const handleCollision = () => removeShell(shellIndex);

    useFrame(() => {
        if (rigidBodyRef.current) {
            const gravity = new THREE.Vector3(0, -9.81, 0);
            const newVelocity = velocity.clone().add(gravity);

            newVelocity.multiplyScalar(dampingFactor);

            rigidBodyRef.current.setLinvel(newVelocity, true);
            setVelocity(newVelocity);
        }
    });

    useEffect(() => {
        if (boatPosition && rotation) {
            const updatedPosition = new THREE.Vector3();
            updatedPosition.copy(boatPosition);

            const backwardOffset = direction
                .clone()
                .normalize()
                .multiplyScalar(-50);
            updatedPosition.add(
                new THREE.Vector3(backwardOffset.x, 0, backwardOffset.z),
            );

            updatedPosition.y += 30;
            setPosition(updatedPosition);
        }
    }, [boatPosition, rotation]);

    return (
        <>
            {position && (
                <RigidBody
                    ref={rigidBodyRef}
                    position={position}
                    onCollisionEnter={handleCollision}
                >
                    <mesh geometry={sphere} material={material} />
                </RigidBody>
            )}
        </>
    );
}

export default Shell;
