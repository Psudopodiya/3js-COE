import ModelLoader from "@/components/SpaceModel";

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <div className="relative h-[100vh] w-[100vw] items-center overflow-hidden">
                <div className="relative z-10">{children}</div>
                <ModelLoader />
            </div>
        </>
    );
};
export default MainLayout;
