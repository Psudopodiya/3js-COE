import { RapierRigidBody } from "@react-three/rapier";
import { create } from "zustand";

import * as THREE from "three";

interface Store {
    modal: string;
    isModalOpen: boolean;
    position: { x: number; y: number; z: number };
    focusRef: THREE.Object3D | null;
    boatRef: RapierRigidBody | null;
    shells: unknown[];
    shellIndex: number;
    openModal: (
        key: string,
        ref: THREE.Object3D | null,
        position: { x: number; y: number; z: number },
    ) => void;
    closeModal: () => void;
    setFocusRef: (ref: THREE.Object3D | null) => void;
    setBoatRef: (ref: RapierRigidBody | null) => void;
    addShell: (newShell: NonNullable<unknown>) => void;
    removeShell: (shellIndex: number) => void;
    incrementShellIndex: () => void;
}

const useStore = create<Store>((set) => ({
    modal: "",
    isModalOpen: false,
    position: { x: 0, y: 0, z: 0 },
    focusRef: null,
    boatRef: null,
    shells: [],
    shellIndex: 0,
    openModal: (
        key: string,
        ref: THREE.Object3D | null,
        position: { x: number; y: number; z: number },
    ) => {
        set({ modal: key, isModalOpen: true });
        set({ focusRef: ref });
        set({ position: position });
    },
    closeModal: () => {
        set({ modal: "", isModalOpen: false });
        set({ position: { x: 0, y: 0, z: 0 } });
    },
    setFocusRef: (ref: THREE.Object3D | null) => {
        set({ focusRef: ref });
    },
    setBoatRef: (ref: RapierRigidBody | null) => {
        set({ boatRef: ref });
    },
    addShell: (newShell: NonNullable<unknown>) => {
        set((state) => ({
            shells: [...state.shells, newShell],
        }));
    },
    removeShell: (shellIndex: number) => {
        set((state) => ({
            shells: state.shells.filter(
                (shell: unknown) => shell.shellIndex !== shellIndex,
            ),
        }));
    },
    incrementShellIndex: () => {
        set((state) => ({
            shellIndex: state.shellIndex + 1,
        }));
    },
}));

export default useStore;
