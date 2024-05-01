import React from "react";

import Logo from "@/assets/consultadd.png";

type Props = {
    children?: React.ReactNode;
};

const AuthenticationLayout = ({ children }: Props) => {
    return (
        <div className="flex h-[100vh] w-[100vw] items-center justify-center">
            <div className="flex justify-center rounded-3xl bg-white/20 p-20 px-24 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
                <div className="my-auto flex flex-col items-center">
                    <div className="flex min-w-[70%] flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <img src={Logo} alt="logo" className="w-[8rem]" />
                        </div>
                        <h1 className="text-5xl font-bold ">Get started</h1>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationLayout;
