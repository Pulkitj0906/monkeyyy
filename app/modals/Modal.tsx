import React from "react";

interface ModalProps{
    content: React.ReactElement;
    onClose: () => void;
    isOpen: boolean;
}

const Modal:React.FC<ModalProps> = ({content,onClose,isOpen}) => {

    if (!isOpen) {
        return null
    }
  return (
    <div onClick={onClose} className="absolute inset-0 z-50 bg-black/80 h-full md:py-8 py-4 md:px-28 px-10">
      <div className="abolsolute inset-0 bg-background-color h-full rounded-lg p-4">
        {content}
      </div>
    </div>
  );
};

export default Modal;
