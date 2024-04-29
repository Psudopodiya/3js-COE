import React from "react";

import Logo from "@/assets/consultadd.png";

type Props = {
    children?: React.ReactNode;
};

const AuthenticationLayout = ({ children }: Props) => {
    return (
        <div className="h-full w-full flex justify-center items-center ">
            <div className="flex rounded-3xl justify-center bg-white/20 backdrop-blur-xl ring-1 ring-black/5 p-20 px-24 shadow-2xl">
                <div className="my-auto flex flex-col items-center">
                    <div className="flex min-w-[70%] flex-col gap-2 text-white">
                        <div className="flex items-center gap-2">
                            <img src={Logo} alt="logo" className="w-[8rem]" />
                        </div>
                        <h1 className="text-5xl font-bold text-white">Get started</h1>
                        {children}
                    </div>
                </div>
            </div>
         </div>
    );
};

export default AuthenticationLayout;
