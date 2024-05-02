import { Outlet } from "react-router-dom";
import SpaceModel from "@/components/SpaceModel";

const MainLayout = () => {
    return (
        <>
            <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
                <div className="relative z-10">
                    {" "}
                    <Outlet />
                </div>
                <SpaceModel />
            </div>
        </>
    );
};
export default MainLayout;
