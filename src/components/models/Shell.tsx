import useStore from "@/stores/useStore.tsx";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
    shellIndex: number;
    boatPosition: THREE.Vector3;
    rotation: THREE.Quaternion;
    power: number;
    boatVelocity: THREE.Vector3;
};

const dampingFactor = 0.98;

function Shell({
    shellIndex,
    boatPosition,
    rotation,
    power,
    boatVelocity,
}: Props): JSX.Element {
    const rigidBodyRef = useRef<RapierRigidBody | null>(null);
    const [position, setPosition] = useState<THREE.Vector3 | undefined>();
    const [velocity, setVelocity] = useState<THREE.Vector3 | undefined>();

    const sphere = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const { removeShell } = useStore((state) => state);
    const handleCollision = () => removeShell(shellIndex);

    useFrame(() => {
        if (rigidBodyRef.current && velocity) {
            const gravity = new THREE.Vector3(0, -9.81, 0);
            const newVelocity = velocity.clone().add(gravity);

            newVelocity.multiplyScalar(dampingFactor);

            rigidBodyRef.current.setLinvel(newVelocity, true);
            setVelocity(newVelocity);
        }
    });

    useEffect(() => {
        if (boatPosition && rotation) {
            const backwardDirection = new THREE.Vector3(
                0,
                0,
                1,
            ).applyQuaternion(rotation);

            const shellOffset = backwardDirection.clone().multiplyScalar(50);
            const updatedPosition = new THREE.Vector3()
                .copy(boatPosition)
                .add(shellOffset);
            updatedPosition.y += 32;

            setPosition(updatedPosition);

            const forwardDirection = backwardDirection.clone().negate();
            const initialVelocity = forwardDirection
                .clone()
                .multiplyScalar(power)
                .add(boatVelocity)
                .add(new THREE.Vector3(0, 300, 0));
            setVelocity(initialVelocity);

            console.log("Shell initial position:", updatedPosition);
            console.log("Boat position:", boatPosition);
            console.log("Boat velocity:", boatVelocity);
            console.log("Power:", power);
        }
    }, [boatPosition, rotation, power, boatVelocity]);

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