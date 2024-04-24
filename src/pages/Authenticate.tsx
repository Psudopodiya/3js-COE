// import SignUp from 'src/components/SignUp'
import React from "react";

type Props = {
    children?: React.ReactNode;
};

const Authentication = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fb815a]">
            <div className="gap- flex  min-w-[75%] justify-center rounded-3xl bg-white p-10 shadow-2xl">
                <div className="flex w-1/2 flex-col items-center py-6">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            {/* <img src={Logo} alt="logo" className="size-10" /> */}
                            <p className="text-xl"> easyclass</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl font-bold">Get started</h1>
                            <p>
                                {" "}
                                Already have an account ?{" "}
                                <a
                                    href=""
                                    className="text-gray-400 underline hover:text-blue-400"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>

                        {children}
                    </div>
                </div>

                <div className="flex  w-1/2 flex-col items-center rounded-3xl bg-orange-300">
                    <div
                        className="h-[65%] w-full rounded-t-3xl bg-contain"
                        // style={{ backgroundImage: `url(${abstractImage})` }}
                    ></div>
                    <div className="mt-16 text-3xl font-bold">
                        Create your own courses
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
