import {create} from 'zustand'

interface NotificationModalStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useNotificationModal = create<NotificationModalStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useNotificationModal;