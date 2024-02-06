import {create} from 'zustand'

interface SupportModalStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useSupportModal = create<SupportModalStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useSupportModal;