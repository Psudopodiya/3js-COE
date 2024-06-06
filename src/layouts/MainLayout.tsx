import CameraControls from "@/components/CameraControls.tsx";
import BoatModel from "@/components/models/BoatModel.tsx";
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
import { Suspense } from "react";

import PythonModal from "@/components/modals/PythonModal.tsx";
import QuizModal from "@/components/modals/QuizModal.tsx";
import useStore from "@/stores/useStore";

extend({ OrthographicCamera, OrbitControls });

type ModalMap = Record<string, JSX.Element>;
const modalMap: ModalMap = {
    python: <PythonModal />,
    quiz: <QuizModal />,
};

const MainLayout = () => {
    const modal = useStore((state) => state.modal);
    const isModalOpen = useStore((state) => state.isModalOpen);
    const shells = useStore((state) => state.shells);

    const keyMap = isModalOpen ? [] : keyboardMap;

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
                    <Physics debug gravity={[0, -9.8, 0]}>
                        <Suspense>
                            <directionalLight position={[500, 500, 500]} />
                            <OceanModel />
                            <BoatModel />
                            <QuizModel />
                            <PythonModel />
                            <CameraControls />
                            {shells.map((shell, index) => (
                                <Shell
                                    key={index}
                                    boatPosition={shell.position}
                                    rotation={shell.rotation}
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
