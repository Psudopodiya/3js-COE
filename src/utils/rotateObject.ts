import React from "react";
import * as THREE from "three";

const rotateObject = (
    ref: React.RefObject<THREE.Object3D>,
    direction: THREE.Vector3,
    axis: THREE.Vector3,
    angle: number
) => {
    if (ref.current) {
        ref.current.rotation.y += angle;
        direction.applyAxisAngle(axis, angle);
    }
};

export default rotateObject;