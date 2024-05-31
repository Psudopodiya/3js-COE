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
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";

import PythonModal from "@/components/modals/PythonModal.tsx";
import QuizModal from "@/components/modals/QuizModal.tsx";

extend({ OrthographicCamera, OrbitControls });

type ModalMap = Record<string, JSX.Element>;

const MainLayout = () => {
    const [modal, setModal] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (key: string) => {
        setIsModalOpen(true);
        setModal(key);
    };
    const closeModal = () => setIsModalOpen(false);

    const map = isModalOpen ? [] : keyboardMap;
    const modalMap: ModalMap = {
        python: <PythonModal closeModal={closeModal} />,
        quiz: <QuizModal closeModal={closeModal} />,
    };

    return (
        <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
            <div className="relative z-10">
                {isModalOpen && modalMap[modal]}
            </div>
            <KeyboardControls map={map}>
                <Canvas
                    style={{
                        position: "absolute",
                        inset: "0px",
                        zIndex: "0",
                        cursor: "pointer",
                    }}
                >
                    <Physics debug gravity={[0, -9.8, 0]}>
                        <Suspense>
                            <OrthographicCamera position={[0, -100, -100]}>
                                <directionalLight position={[500, 500, 500]} />
                                <group>
                                    <OceanModel />
                                    <BoatModel />
                                    <QuizModel openModal={openModal} />
                                    <PythonModel openModal={openModal} />
                                </group>
                                <OrbitControls
                                    minPolarAngle={Math.PI / 4 + Math.PI / 6}
                                    maxPolarAngle={Math.PI / 2 + Math.PI / 6}
                                    minAzimuthAngle={-Math.PI / 24}
                                    maxAzimuthAngle={Math.PI / 24}
                                />
                            </OrthographicCamera>
                        </Suspense>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </div>
    );
};
export default MainLayout;
