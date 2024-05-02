import { Suspense, useRef } from "react";
import {
    OrbitControls,
    Loader,
    useGLTF,
    PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

export default function SpaceModel() {
    const model = useGLTF("./space_dreamscape.glb");
    const cameraRef = useRef<any>();

    const handleClick = (event: any) => {
        const subject_list = [
            "Sphere",
            "Sphere 2",
            "Sphere 3",
            "Sphere 4",
            "Sphere 5",
            "Ellipse",
            "Ellipse 2",
            "Ellipse 3",
        ];
        let planet = event.object;

        if (subject_list.includes(planet.userData.name)) {
            const center = new THREE.Vector3();
            const boundingBox = new THREE.Box3().setFromObject(planet);
            boundingBox.getCenter(center);

            gsap.to(cameraRef.current.position, {
                duration: 1,
                x: -1 * center.x,
                y: -1 * center.y,
                z: -0.05 * center.z,
            });
        }
    };

    return (
        <Canvas
            style={{
                position: "absolute",
                inset: "0px",
                zIndex: "0",
            }}
        >
            <Suspense fallback={<Loader />}>
                <PerspectiveCamera
                    ref={cameraRef}
                    fov={75}
                    position={[0, 0, -8]}
                >
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 10, 10]} />
                    <primitive object={model.scene} onClick={handleClick} />
                    <OrbitControls
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                        minAzimuthAngle={-Math.PI / 6}
                        maxAzimuthAngle={Math.PI / 6}
                        maxDistance={10}
                        minDistance={0}
                    />
                </PerspectiveCamera>
            </Suspense>
        </Canvas>
    );
}
