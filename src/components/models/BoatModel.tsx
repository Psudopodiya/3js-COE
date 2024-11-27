import useStore from "@/stores/useStore";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const impulseStrength = 400000;
const torqueStrength = 400000;

function BoatModel() {
    const { scene } = useGLTF("./ship.glb");
    const [, getKeys] = useKeyboardControls();

    const boatRef = useRef<RapierRigidBody>(null);
    const { setBoatRef, addShell, shellIndex, incrementShellIndex } = useStore(
        (state) => state,
    );

    const [canFire, setCanFire] = useState(true);
    const [fireStartTime, setFireStartTime] = useState<number>(Date.now());

    //console.log(nodes);

    useEffect(() => {
        if (boatRef.current) setBoatRef(boatRef.current);
    }, [boatRef, setBoatRef]);

    useFrame(() => {
        if (boatRef.current) {
            const { forward, backward, leftward, rightward, fire } = getKeys();
            const impulse = new THREE.Vector3(0, 0, 0);
            const torque = new THREE.Vector3(0, 0, 0);

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
            if (!fire && !canFire) {
                const fireDuration = (Date.now() - fireStartTime) / 1000;
                const power = Math.min(fireDuration * 500, 2000);

                const position = boatRef.current.translation();
                const rotation = boatRef.current.rotation();
                const boatVelocity = boatRef.current.linvel();
                addShell({
                    shellIndex,
                    position: new THREE.Vector3(position.x, position.y, position.z),
                    rotation: new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w),
                    power,
                    boatVelocity: new THREE.Vector3(boatVelocity.x, boatVelocity.y, boatVelocity.z),
                });
                incrementShellIndex();

                setCanFire(true);
            } else if (fire && canFire) {
                setFireStartTime(Date.now());
                setCanFire(false);
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
