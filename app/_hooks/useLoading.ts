import { create } from "zustand";

interface ModeProps {
  isLoading: boolean;
  setisLoading: (newisLoading: boolean) => void;
}

const useLoading = create<ModeProps>((set) => ({
  isLoading: true,
  setisLoading: (newisLoading) =>
    set({
      isLoading: newisLoading,
    }),
}));

export default useLoading;
