import useStore from "@/stores/useStore";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import * as THREE from "three";

function CameraControls() {
    const isModalOpen = useStore((state) => state.isModalOpen);
    const focusRef = useStore((state) => state.focusRef);
    const boatRef = useStore((state) => state.boatRef);
    const position = useStore((state) => state.position);

    const [smoothedCameraPosition] = useState(
        () => new THREE.Vector3(10, 10, 10),
    );
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        let bodyPosition;
        if (boatRef) {
            bodyPosition = boatRef.translation();
        }
        if (focusRef && isModalOpen) {
            bodyPosition = focusRef.position;
        }
        if (bodyPosition) {
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(bodyPosition);
            cameraPosition.z += 300 + position.z;
            cameraPosition.y += 200 + position.y;
            cameraPosition.x += position.x;

            const cameraTarget = new THREE.Vector3();
            cameraTarget.copy(bodyPosition);
            cameraTarget.y += 50 + position.y;
            cameraTarget.x += position.x;

            smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
            smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

            state.camera.position.copy(smoothedCameraPosition);
            state.camera.lookAt(smoothedCameraTarget);
        }
    });
    return null;
}

export default CameraControls;
