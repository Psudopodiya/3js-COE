import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import Spline from "@splinetool/react-spline";

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const containerRef = useRef(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );
    const renderer = new THREE.WebGLRenderer();

    useEffect(() => {
        // Set up camera position
        camera.position.z = 5;

        // Add renderer to the container
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Function to handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Clean up
        return () => {
            window.removeEventListener("resize", handleResize);
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className='h-[100vh] w-[100vw] overflow-hidden items-center'
        > 
            <div className="h-[100vh] w-[100vw]">
              {children}
            </div>
            
            <Spline className="absolute top-0 left-0 -z-10" scene="https://prod.spline.design/mV5nfwaATZXRyD7U/scene.splinecode" />
        </div>
    );
};

export default MainLayout;
