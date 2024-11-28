import { Text } from "@react-three/drei";
import React from "react";

const WelcomeText: React.FC = () => {
    return (
        <Text
            color="black"
            anchorX="center"
            anchorY="middle"
            fontSize={0.5}
            rotation={[0, 0, 0]}
            position={[0, 155, 120]}
            scale={[20, 20, 20]}
        >
            Welcome to Landing Page
        </Text>
    );
};

export default WelcomeText;
