'use client'
import React from "react";
import Modal from "./Modal";
import { FaCrown } from "react-icons/fa";
import LeaderBoardItems from "./components/LeaderBoardItems";
import useLeaderModal from "../hooks/useLeaderModal";

const LeaderBoardModal = () => {
    const LeaderModal=useLeaderModal()
  const content = (
    <>
      <div className="flex flex-col h-full">
        <div className=" flex flex-wrap md:justify-between">
          <header className="text-this-white text-3xl w-3/4">
            All-Time English Leaderboards
          </header>
          <div className="flex gap-3  grow">
            <button className="bg-this-yellow text-this-grey w-full rounded-lg py-1">
              all time
            </button>
            <button className="bg-sub-alt text-this-white w-full rounded-lg py-1">
              daily
            </button>
          </div>
        </div>
        <div className=" flex grow flex-col lg:flex-row mt-4 text-this-white">
          <div className="grow p-2">
            <h1 className="text-this-white">Time 15</h1>
            <div className="container text-xs ">
              <div className="flex justify-between text-text-color">
                <div className="flex items-center gap-5">
                  <p>#</p>
                  <p>name</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>wpm</p>
                  <p className="text-text-color/50">accuracy</p>
                </div>
              </div>
              <LeaderBoardItems name="Farzad" id={1} accuracy={98.73} wpm={101.23}/>
              <LeaderBoardItems name="Pulkit" id={2} accuracy={97.28} wpm={100.23}/>
            </div>
          </div>
          <div className="grow p-2">
            <h1 className="text-this-white">Time 60</h1>
            <div className="container text-xs ">
              <div className="flex justify-between text-text-color">
                <div className="flex items-center gap-5">
                  <p>#</p>
                  <p>name</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>wpm</p>
                  <p className="text-text-color/50">accuracy</p>
                </div>
              </div>
              <LeaderBoardItems name="Pulkit" id={1} accuracy={98.73} wpm={101.23}/>
              <LeaderBoardItems name="Farzad" id={2} accuracy={97.28} wpm={100.23}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
    return (
        <Modal
            content={content}
            onClose={LeaderModal.OnClose}
            isOpen={LeaderModal.isOpen}
        />
        ); 
};

export default LeaderBoardModal;
