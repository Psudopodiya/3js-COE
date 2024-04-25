import React from "react";
import Logo from "@/assets/consultadd.png";

type Props = {
    children?: React.ReactElement;
};

const Authentication = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fb815a]">
            <div className="flex min-h-[80vh] min-w-[70%] justify-center gap-4 rounded-3xl bg-white p-10 shadow-2xl">
                <div className="my-auto flex w-1/2 flex-col items-center">
                    <div className="flex min-w-[70%] flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <img src={Logo} alt="logo" className="w-[8rem]" />
                        </div>
                        <h1 className="text-5xl font-bold">Get started</h1>
                        {children}
                    </div>
                </div>

                <div className="flex  w-1/2 flex-col items-center rounded-3xl bg-[#fb815a]">
                </div>
            </div>
        </div>
    );
};

export default Authentication;
