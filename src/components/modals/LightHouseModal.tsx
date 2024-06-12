import gsap from "gsap";

import { Button } from "@/components/ui/button.tsx";
import useStore from "@/stores/useStore";
import { useEffect, useRef } from "react";

import GlassCard from "@/components/GlassCard.tsx";

const LightHouseModal = () => {
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
                width: "35%",
                position: "absolute",
                top: "10%",
                left: "5%",
            }}
        >
            <Button
                className="absolute right-4 top-4 rounded-xl bg-black text-white hover:text-black"
                variant="secondary"
                size="lg"
                onClick={closeModal}
            >
                close
            </Button>
            <h1 className="text-5xl font-bold">Light House</h1>
        </GlassCard>
    );
};

export default LightHouseModal;
