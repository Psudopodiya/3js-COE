import React, { CSSProperties, forwardRef } from "react";

type Props = {
    children?: React.ReactNode;
    style?: CSSProperties;
};

const GlassCard = forwardRef<HTMLDivElement, Props>(
    ({ children, style }, ref) => {
        return (
            <div
                ref={ref}
                className="flex h-[100vh] w-[100vw] items-center justify-center"
            >
                <div
                    style={style}
                    className="flex h-3/4 w-3/4 justify-center rounded-3xl bg-white/20 p-20 px-24 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl"
                >
                    {children}
                </div>
            </div>
        );
    },
);

export default GlassCard;
