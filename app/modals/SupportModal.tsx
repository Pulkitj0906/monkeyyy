"use client";
import React from "react";
import Modal from "./Modal";
import {
  FaBullhorn,
  FaCommentAlt,
  FaCrown,
  FaDev,
  FaDonate,
  FaHeart,
} from "react-icons/fa";
import useSupportModal from "../hooks/useSupportModal";

const SupportModal = () => {
  const SupportModal = useSupportModal();
    if (!SupportModal.isOpen) {
      return null;
    }
  return (
    <div
      onClick={SupportModal.OnClose}
      className="
            absolute 
            inset-0 
            z-50 
            bg-black/80 
            h-full
            flex
            justify-center
            items-center
            "
    >
      <div className="absolute bg-background-color text-this-white p-5 rounded-lg mx-12 w-1/2">
        <h1 className="text-text-color text-2xl">Support</h1>
        <div className="mt-4 text-this-white">
          Thank you so much for thinking about supporting this project. It would
          not be possible without you and your continued support.🤍
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <button className="bg-sub-alt mt-4 hover:bg-this-white hover:text-sub-alt w-full md:w-96 p-6 rounded-lg inline-flex md:flex-col md:gap-4 justify-center items-center">
            <FaDonate size={34} />
            <p className="grow">Help Farzad</p>{" "}
          </button>
          <button className="bg-sub-alt mt-4 hover:bg-this-white hover:text-sub-alt w-full md:w-96 p-6 rounded-lg inline-flex md:flex-col md:gap-4 justify-center items-center">
            <FaDonate size={34} />
            <p className="grow">Help Pulkit</p>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
