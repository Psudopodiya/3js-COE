import gsap from "gsap";

import useStore from "@/stores/useStore";
import { useEffect, useRef } from "react";

import GlassCard from "@/components/GlassCard.tsx";
import CourseFeatures from "../CourseFeatures";

const PythonModal = () => {
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
            <div className="space-y-3">

            <h1 className="text-2xl font-bold mx-[40%]">Python</h1>
            <CourseFeatures
                duration="3 hours"
                lectures={46}
                skillLevel="All level"
                language="English"
                assessments={true}
                quizzes="NA"
            />
            
            <button
                className="absolute top-[-1rem] right-[-5rem] mt-5 p-5 w-16 h-16 rounded-full bg-white/65 border-none text-black text-2xl ring-1 ring-black/5 backdrop-blur-xl z-10"
                onClick={closeModal}
            >
                <img src="../public/cross.png" />
            </button>
            </div>
            
        </GlassCard>
    );
};

export default PythonModal;
