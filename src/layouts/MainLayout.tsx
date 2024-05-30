import BoatModel from "@/components/BoatModel";
import OceanModel from "@/components/OceanModel.tsx";
import PythonModel from "@/components/PythonModel.tsx";
import { keyboardMap } from "@/constants";
import {
    KeyboardControls,
    OrbitControls,
    OrthographicCamera,
} from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";

import PythonHome from "@/pages/pythonHome.tsx";

extend({ OrthographicCamera, OrbitControls });

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openPython = () => setIsModalOpen(true);
    const closePython = () => setIsModalOpen(false);

    const map = isModalOpen ? [] : keyboardMap;

    return (
        <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
            <div className="relative z-10">
                {isModalOpen && <PythonHome closeModal={closePython} />}
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
                            <OrthographicCamera position={[0, -50, -100]}>
                                <directionalLight position={[10, 60, 200]} />
                                <group>
                                    <OceanModel />
                                    <BoatModel />
                                    <PythonModel openModal={openPython} />
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
