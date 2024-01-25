import { create } from "zustand";

interface LangProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  lang: string;
  setLang: (newlang: string) => void;
}

const useLangModal = create<LangProps>((set) => ({
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
  lang: "english",
  setLang: (newlang) =>
    set({
      lang: newlang,
    }),
}));

export default useLangModal;
