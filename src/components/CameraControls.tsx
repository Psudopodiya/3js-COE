import useStore from "@/stores/useStore";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import * as THREE from "three";

function CameraControls() {
    const focusRef = useStore((state) => state.focusRef);

    const [smoothedCameraPosition] = useState(
        () => new THREE.Vector3(10, 10, 10),
    );
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        if (focusRef) {
            const bodyPosition = focusRef.translation();
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(bodyPosition);
            cameraPosition.z += 200;
            cameraPosition.y += 150;

            const cameraTarget = new THREE.Vector3();
            cameraTarget.copy(bodyPosition);
            cameraTarget.y += 50;

            smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
            smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

            state.camera.position.copy(smoothedCameraPosition);
            state.camera.lookAt(smoothedCameraTarget);
        }
    });
    return null;
}

export default CameraControls;
