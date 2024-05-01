// import InteractiveSpline from "@/components/InteractiveSpline";
import ModelLoader from "@/components/ModelLoadet";
type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    console.log("Rendering children:", children);
    return (
        <>
            <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
                <div className="pointer-events-auto">{children}</div>
            </div>
            <ModelLoader />
        </>
    );
};
export default MainLayout;
