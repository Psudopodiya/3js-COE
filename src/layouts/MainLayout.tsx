import CameraControls from "@/components/CameraControls.tsx";
import BoatModel from "@/components/models/BoatModel.tsx";
import OceanModel from "@/components/models/OceanModel.tsx";
import PythonModel from "@/components/models/PythonModel.tsx";
import QuizModel from "@/components/models/QuizModel.tsx";
import { keyboardMap } from "@/constants";
import {
    KeyboardControls,
    OrbitControls,
    OrthographicCamera,
} from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect } from "react";

import PythonModal from "@/components/modals/PythonModal.tsx";
import QuizModal from "@/components/modals/QuizModal.tsx";
import useStore from "@/stores/useStore";
import * as THREE from "three";

extend({ OrthographicCamera, OrbitControls });

type ModalMap = Record<string, JSX.Element>;
const modalMap: ModalMap = {
    python: <PythonModal />,
    quiz: <QuizModal />,
};

const AudioPlayer = () => {
    const { camera } = useThree();

    useEffect(() => {
        const listener = new THREE.AudioListener();
        camera.add(listener);

        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();

        audioLoader.load("./bink's_Sake.mp3", function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });

        return () => {
            sound.stop();
            camera.remove(listener);
        };
    }, [camera]);

    return null;
};

const MainLayout = () => {
    const modal = useStore((state) => state.modal);
    const isModalOpen = useStore((state) => state.isModalOpen);

    const keyMap = isModalOpen ? [] : keyboardMap;

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./bink's_sake.mp3", function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.1);
        sound.play();
    });

    return (
        <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
            <div className="relative z-10">
                {isModalOpen && modalMap[modal]}
            </div>
            <KeyboardControls map={keyMap}>
                <Canvas
                    shadows
                    camera={{ fov: 75 }}
                    style={{
                        position: "absolute",
                        inset: "0px",
                        zIndex: "0",
                        cursor: "pointer",
                    }}
                >
                    <Physics gravity={[0, -9.8, 0]}>
                        <Suspense>
                            <AudioPlayer />
                            <directionalLight position={[500, 500, 500]} />
                            <OceanModel />
                            <BoatModel />
                            <QuizModel />
                            <PythonModel />
                            <CameraControls />
                        </Suspense>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </div>
    );
};

export default MainLayout;
