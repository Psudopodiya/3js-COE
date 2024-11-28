import CameraControls from "@/components/CameraControls.tsx";
import WelcomeText from "@/components/WelcomeText";
import BoatModel from "@/components/models/BoatModel.tsx";
import LightHouseModel from "@/components/models/LightHouseModel.tsx";
import OceanModel from "@/components/models/OceanModel.tsx";
import PythonModel from "@/components/models/PythonModel.tsx";
import QuizModel from "@/components/models/QuizModel.tsx";
import Shell from "@/components/models/Shell.tsx";
import { keyboardMap } from "@/constants";
import {
    KeyboardControls,
    OrbitControls,
    OrthographicCamera,
} from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";

import LightHouseModal from "@/components/modals/LightHouseModal.tsx";
import PythonModal from "@/components/modals/PythonModal.tsx";
import QuizModal from "@/components/modals/QuizModal.tsx";

import useStore from "@/stores/useStore";
import * as THREE from "three";

extend({ OrthographicCamera, OrbitControls });

type ModalMap = Record<string, JSX.Element>;
const modalMap: ModalMap = {
    python: <PythonModal />,
    quiz: <QuizModal />,
    lightHouse: <LightHouseModal />,
};

const MainLayout = () => {
    const modal = useStore((state) => state.modal);
    const isModalOpen = useStore((state) => state.isModalOpen);
    const shells = useStore((state) => state.shells);

    const [sound, setSound] = useState<THREE.Audio | null>(null);

    useEffect(() => {
        // Create audio context and elements only on the client side
        const listener = new THREE.AudioListener();
        const audioSound = new THREE.Audio(listener);

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load("./bink's_sake.mp3", function (buffer) {
            audioSound.setBuffer(buffer);
            audioSound.setLoop(true);
            audioSound.setVolume(0.1);
            setSound(audioSound);
        });

        // Cleanup function
        return () => {
            if (audioSound) {
                audioSound.stop();
            }
        };
    }, []);

    const handleStartAudio = () => {
        if (sound && !sound.isPlaying) {
            sound.play();
        }
    };

    const keyMap = isModalOpen ? [] : keyboardMap;

    return (
        <div
            className="relative h-[100vh] w-[100vw] items-center overflow-hidden"
            onClick={handleStartAudio}
        >
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
                            <directionalLight position={[500, 500, 500]} />
                            <OceanModel />
                            <BoatModel />
                            <WelcomeText />
                            <QuizModel />
                            <PythonModel />
                            <LightHouseModel />
                            <CameraControls />
                            {shells.map((shell) => (
                                <Shell
                                    key={shell.shellIndex}
                                    shellIndex={shell.shellIndex}
                                    boatPosition={shell.position}
                                    rotation={shell.rotation}
                                    power={shell.power}
                                    boatVelocity={shell.boatVelocity}
                                />
                            ))}
                        </Suspense>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </div>
    );
};

export default MainLayout;
