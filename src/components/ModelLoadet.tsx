import { Suspense } from "react";
import { OrbitControls, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function ModelLoader() {
    const model = useLoader(GLTFLoader, "./space_dreamscape.glb", (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("./draco/");
        loader.setDRACOLoader(dracoLoader);
    });

    console.log(model);
    return (
        <Canvas
            style={{
                position: "absolute",
                inset: "0px",
                zIndex: "0",
            }}
        >
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} />
                <primitive object={model.scene} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
}
