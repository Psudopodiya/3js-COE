import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

import * as THREE from "three";

const impulseStrength = 5000;
const torqueStrength = 5000;

export default function OceanModel() {
    const { nodes } = useGLTF("./boat.glb");
    const [, getKeys] = useKeyboardControls();

    const boatRef = useRef<RigidBody>(null);
    const [smoothedCameraPosition] = useState(
        () => new THREE.Vector3(10, 10, 10),
    );
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        if (!boatRef.current) return;

        const { forward, backward, leftward, rightward } = getKeys();

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

        const updateImpulse = impulse.applyQuaternion(
            boatRef.current.rotation(),
        );
        boatRef.current.applyImpulse(updateImpulse, true);
        boatRef.current.applyTorqueImpulse(torque, true);

        const bodyPosition = boatRef.current.translation();
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 100;
        cameraPosition.y += 50;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 50;

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);
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
                object={nodes.Canoe}
                position={[0, 5, 0]}
                scale={[0.1, 0.1, 0.1]}
                rotation={[0, Math.PI / 2, 0]}
            />
        </RigidBody>
    );
}
