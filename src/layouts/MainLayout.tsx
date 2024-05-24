import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Outlet } from "react-router-dom";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import OceanModel from "@/components/OceanModel.tsx";

extend({ OrthographicCamera, OrbitControls });

const MainLayout = () => {
    return (
        <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
            <div className="relative z-10">
                {" "}
                <Outlet />
            </div>
            <Canvas
                style={{
                    position: "absolute",
                    inset: "0px",
                    zIndex: "0",
                    cursor: "pointer"
                }}
            >
                <Suspense>
                    <OrthographicCamera position={[0, -1, -10]}>
                        <directionalLight position={[10, 10, 10]} />
                        <OceanModel />
                        <OrbitControls />
                    </OrthographicCamera>
                </Suspense>
            </Canvas>
        </div>
    );
};
export default MainLayout;
