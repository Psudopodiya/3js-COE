import gsap from "gsap";

import useStore from "@/stores/useStore";
import { useEffect, useRef } from "react";

import GlassCard from "@/components/GlassCard.tsx";

const DefaultModal = () => {
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
                height: "75%",
                width: "28%",
                position: "absolute",
                top: "10%",
                right: "10%",
            }}
        >
            <button
                    className="absolute top-[-1rem] right-[-5rem] mt-5 p-5 w-16 h-16 rounded-full bg-white/65 border-none text-black text-2xl ring-1 ring-black/5 backdrop-blur-xl z-10"
                    onClick={closeModal}
                >
                <img src='../public/cross.png' />
                </button>
            <h1 className="text-5xl font-bold">Python</h1>
        </GlassCard>
    );
};

export default DefaultModal;
