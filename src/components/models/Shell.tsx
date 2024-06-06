import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
    boatPosition: THREE.Vector3;
    rotation: THREE.Quaternion;
};

const dampingFactor = 0.9;

function Shell({ boatPosition, rotation }: Props): JSX.Element {
    const rigidBodyRef = useRef<RapierRigidBody | null>(null);

    const [position, setPosition] = useState<THREE.Vector3 | undefined>();

    const [velocity, setVelocity] = useState(new THREE.Vector3(0, 0, -1000));
    const sphere = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });

    useFrame(() => {
        if (rigidBodyRef.current) {
            rigidBodyRef.current?.setLinvel(velocity, true);
            velocity.multiplyScalar(dampingFactor);
            setVelocity(velocity.clone());
        }
    });

    useEffect(() => {
        if (boatPosition && rotation) {
            const updatedPosition = new THREE.Vector3();
            updatedPosition.copy(boatPosition);
            updatedPosition.y += 10;
            updatedPosition.z -= 15;
            setPosition(updatedPosition);
        }
    }, []);

    return (
        <>
            {position && (
                <RigidBody ref={rigidBodyRef} position={position}>
                    <mesh geometry={sphere} material={material} />
                </RigidBody>
            )}
        </>
    );
}

export default Shell;
