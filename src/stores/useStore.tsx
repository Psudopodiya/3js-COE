import { RapierRigidBody } from "@react-three/rapier";
import { create } from "zustand";

interface Store {
    modal: string;
    isModalOpen: boolean;
    focusRef: RapierRigidBody | null;
    boatRef: RapierRigidBody | null;
    openModal: (key: string, ref: RapierRigidBody | null) => void;
    closeModal: () => void;
    setFocusRef: (ref: RapierRigidBody | null) => void;
    setBoatRef: (ref: RapierRigidBody | null) => void;
}

const useStore = create<Store>((set) => ({
    modal: "",
    isModalOpen: false,
    focusRef: null,
    boatRef: null,
    openModal: (key: string, ref: RapierRigidBody | null) => {
        set({ modal: key, isModalOpen: true });
        set({ focusRef: ref });
    },
    closeModal: () => {
        set({ modal: "", isModalOpen: false });
        set((state) => ({
            focusRef: state.boatRef,
        }));
    },
    setFocusRef: (ref: RapierRigidBody | null) => {
        set({ focusRef: ref });
    },
    setBoatRef: (ref: RapierRigidBody | null) => {
        set({ boatRef: ref });
        set({ focusRef: ref });
    },
}));

export default useStore;
