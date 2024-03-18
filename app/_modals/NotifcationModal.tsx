"use client";
import React from "react";
import { FaBullhorn, FaCommentAlt, FaCrown, FaDev } from "react-icons/fa";
import useNotificationModal from "../_hooks/useNotificationModal";
import { MdError } from "react-icons/md";

const NotificationBoardModal = () => {
  const NotificationModal = useNotificationModal();
  const content = (
    <>
      <div className="flex flex-col h-full gap-6">
        <div className="flex flex-col">
          <div className="inline-flex gap-3 items-center text-text-color text-2xl">
            <FaBullhorn size={25} />
            Announcements
          </div>
          <div className="h-full mt-3">
            <div className=" h-10 inline-flex justify-between w-full items-center text-this-white">
              <p className="inline-flex gap-2">
                <FaDev size={20} className="" />
                Website is Live!
              </p>
              <p className="text-xs text-text-color">03/02/24-18:00</p>
            </div>
            <p className="text-xs text-text-color">
              Enjoy the typing battle with ur friends! Feel free to ping us
              incase of any bugs.
            </p>
            <div className=" h-10 inline-flex justify-between w-full items-center text-this-white">
              <p className="inline-flex gap-2">
                <MdError size={20} className="text-red-500" />
                Android Users
              </p>
              <p className="text-xs text-text-color">18/03/24-17:11</p>
            </div>
            <p className="text-xs text-text-color">
              We are aware that some android users are facing problem while
              typing. We are actively working upon this issue. Till then enjoy
              keynkong on PC and iPhone
            </p>
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
