import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Outlet } from "react-router-dom";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import OceanModel from "@/components/OceanModel.tsx";
import BoatModel from "@/components/BoatModel";

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
                    cursor: "pointer",
                }}
            >
                <Suspense>
                    <OrthographicCamera
                        position={[0, -10, -50]}
                        rotation={[Math.PI / 6, 0, 0]}
                    >
                        <directionalLight position={[10, 50, 10]} />
                        <group>
                            <OceanModel />
                            <BoatModel />
                        </group>
                        <OrbitControls
                            minPolarAngle={Math.PI / 4 + Math.PI / 6}
                            maxPolarAngle={Math.PI / 2 + Math.PI / 6}
                            minAzimuthAngle={-Math.PI / 24}
                            maxAzimuthAngle={Math.PI / 24}
                            maxDistance={10}
                            minDistance={0}
                        />
                    </OrthographicCamera>
                </Suspense>
            </Canvas>
        </div>
    );
};
export default MainLayout;
