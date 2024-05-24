import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useKeyboard } from "@/hooks/useKeyboard.ts";
import { useFrame } from "@react-three/fiber";
import { moveObject, rotateObject } from "@/utils";

import * as THREE from "three";


const speed = 1;
const rotationAngle = 0.05;


export default function OceanModel() {
    const { nodes } = useGLTF("./toon_sea.glb");
    const keyboard = useKeyboard();
    const boatRef = useRef<THREE.Object3D | null>(null);

    const directionVector = new THREE.Vector3(0, 0, 1);
    const rotationAxis = new THREE.Vector3(0, 1, 0);

    useFrame(() => {
        if (!boatRef.current) return;

        if (keyboard["ArrowUp"]) {
            moveObject(boatRef, directionVector, -speed);
            if (keyboard["ArrowRight"]) rotateObject(boatRef, directionVector, rotationAxis, -rotationAngle);
            if (keyboard["ArrowLeft"]) rotateObject(boatRef, directionVector, rotationAxis, rotationAngle);
        }
        if (keyboard["ArrowDown"]) {
            moveObject(boatRef, directionVector, speed);
            if (keyboard["ArrowRight"]) rotateObject(boatRef, directionVector, rotationAxis, rotationAngle);
            if (keyboard["ArrowLeft"]) rotateObject(boatRef, directionVector, rotationAxis, -rotationAngle);
        }
    });

    return (
        <primitive
            ref={boatRef}
            object={nodes.Canoe}
            position={[3, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[0, Math.PI / 2, 0]}
        />
    );
}
