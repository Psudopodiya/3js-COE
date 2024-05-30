import { useEffect, useMemo } from "react";

interface KeyboardState {
    [key: string]: boolean;
}

export function useKeyboard() {
    const keyboard: KeyboardState = useMemo(() => ({}), []);

    const keydown = (e: KeyboardEvent) => (keyboard[e.key] = true);
    const keyup = (e: KeyboardEvent) => (keyboard[e.key] = false);

    useEffect(() => {
        document.addEventListener("keydown", keydown);
        document.addEventListener("keyup", keyup);

        return () => {
            document.removeEventListener("keydown", keydown);
            document.removeEventListener("keyup", keyup);
        };
    });

    return keyboard;
}
