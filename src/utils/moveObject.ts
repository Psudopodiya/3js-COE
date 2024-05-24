import React from "react";
import * as THREE from "three";

const moveObject = (
    ref: React.RefObject<THREE.Object3D>,
    direction: THREE.Vector3,
    speed: number
) => {
    if (ref.current) {
        ref.current.position.add(direction.clone().multiplyScalar(speed));
    }
};

export default moveObject;