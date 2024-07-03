import gsap from "gsap";

import useStore from "@/stores/useStore";
import { useEffect, useRef } from "react";

import GlassCard from "@/components/GlassCard";

type Props = {
    children?: React.ReactNode;
    top?: string;
    right?: string;
};

const DefaultModal: React.FC<Props> = ({ children ,top = "10%", right = "10%"}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const closeModal = useStore((state) => state.closeModal);

    useEffect(() => {
            gsap.fromTo(
                cardRef.current,
                { y: -50 },
                { y: 0, duration: 2, ease: "power1.out" },
            );
    }, []);

    return (
        <GlassCard
            ref={cardRef}
            style={{
                height: "65%",
                width: "28%",
                position: "absolute",
                top: top,
                right: right,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <button
                className="absolute top-[-1rem] right-[-4rem] mt-5 p-4 w-12 h-12 rounded-full bg-white/65 border-none text-black text-2xl ring-1 ring-black/5 backdrop-blur-xl z-10"
                onClick={closeModal}
            >
                <img src="/cross.png" alt="close"/>
            </button>
            {children}
        </GlassCard>
    );
};

export default DefaultModal;
