import useStore from "@/stores/useStore";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

import * as THREE from "three";

const impulseStrength = 120000;
const torqueStrength = 120000;

function BoatModel() {
    const { scene } = useGLTF("./ship.glb");
    const [, getKeys] = useKeyboardControls();

    const boatRef = useRef<RapierRigidBody>(null);
    const setBoatRef = useStore((state) => state.setBoatRef);
    const addShell = useStore((state) => state.addShell);

    useEffect(() => {
        if (boatRef.current) setBoatRef(boatRef.current);
    }, [boatRef, setBoatRef]);

    useFrame(() => {
        if (boatRef.current) {
            const { forward, backward, leftward, rightward, fire } = getKeys();
            const impulse = new THREE.Vector3();
            const torque = new THREE.Vector3();

            if (forward) {
                impulse.z -= impulseStrength;
                if (leftward) torque.y += torqueStrength;
                if (rightward) torque.y -= torqueStrength;
            }
            if (backward) {
                impulse.z += impulseStrength;
                if (leftward) torque.y -= torqueStrength;
                if (rightward) torque.y += torqueStrength;
            }
            if (fire) {
                const position = boatRef.current.translation();
                const rotation = boatRef.current.rotation();
                addShell({ position, rotation });
            }

            const updateImpulse = impulse.applyQuaternion(
                boatRef.current.rotation(),
            );
            boatRef.current.applyImpulse(updateImpulse, true);
            boatRef.current.applyTorqueImpulse(torque, true);
        }
    });

    return (
        <RigidBody
            ref={boatRef}
            friction={1}
            restitution={0.2}
            linearDamping={0.5}
            angularDamping={0.5}
            colliders="cuboid"
        >
            <primitive
                object={scene}
                position={[0, 15, 90]}
                scale={[20, 20, 20]}
                rotation={[0, Math.PI / 2, 0]}
            />
        </RigidBody>
    );
}

export default BoatModel;
