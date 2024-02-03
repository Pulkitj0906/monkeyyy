"use client";
import React from "react";
import Modal from "./Modal";
import { FaBullhorn, FaCommentAlt, FaCrown, FaDev } from "react-icons/fa";
import LeaderBoardItems from "./components/LeaderBoardItems";
import useNotificationModal from "../hooks/useNotificationModal";

const NotificationBoardModal = () => {
  const NotificationModal = useNotificationModal();
  const content = (
    <>
      <div className="flex flex-col h-full">
        <div className=" h-52 flex flex-col">
          <div className="inline-flex gap-3 items-center text-text-color text-2xl">
            <FaBullhorn size={25} />
            Announcements
          </div>
          <div className="h-full mt-3">
            <div className=" h-10 inline-flex justify-between w-full items-center text-this-white">
                <p className="inline-flex gap-2"><FaDev size={20} className=""/>Website is Live!</p>
                <p className="text-xs text-text-color">03/02/24-18:00</p>
            </div>
          </div>
        </div>
        <div className=" h-52">
          <div className="inline-flex gap-3 items-center text-text-color text-2xl">
            <FaCommentAlt size={25} />
            Notifications
          </div>
          <div className=" h-full flex justify-center items-center">
            <p className="text-this-white text-sm">Nothing to show</p>
          </div>
        </div>
      </div>
    </>
  );
  if (!NotificationModal.isOpen) {
    return null;
  }
  return (
    <div
      onClick={NotificationModal.OnClose}
      className="absolute inset-0 z-50 bg-black/80 h-full md:py-8 py-4 md:px-28 px-10"
    >
      <div className="absolute top-0 right-0 bg-background-color h-full rounded-lg p-8 w-96">
        {content}
      </div>
    </div>
  );
};

export default NotificationBoardModal;
