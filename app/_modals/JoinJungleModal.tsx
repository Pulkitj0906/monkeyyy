"use client";
import { useEffect, useState } from "react";
import useJoinJungleModal from "../_hooks/useJoinJungleModal";
import socket from "../race/socket";
import Image from "next/image";
import OppTempWords from "../_hooks/useOppTempWords";
import { randomWord } from "../_words/useWords";
import { FaCheck, FaCopy } from "react-icons/fa";

const JoinJunglemodal = () => {
  const [page, setPage] = useState(1);
  const [sec, setSec] = useState(5);
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const JoinJungleModal = useJoinJungleModal();
  const [joinJungleIdInput, setJoinJungleIdInput] = useState("");
  const [createJungleIdInput, setCreateJungleIdInput] = useState("");
  const { SetUsername } = OppTempWords();
  const [isLoading, setIsLoading] = useState(false);
  const [noti, setNoti] = useState(false);

  const handleConnect = () => {
    if (name) {
      setIsLoading(true);
      socket.auth = { name };
      socket.connect();
    }
  };

  useEffect(() => {
    randomWord(1, "english")
      .then((word) => {
        setCreateJungleIdInput(
          `${word}-jungle#${Math.floor(Math.random() * 9000) + 1000}`
        );
      })
      .catch((error) => {
        console.error("Error fetching random word:", error);
      });
  }, []);

  const handleJoin = (id: string) => {
    if (id && JoinJungleModal.isOpen) {
      socket.emit("joinJungle", id);
      setPage(3);
    }
  };

  const raceBegins = () => {
    JoinJungleModal.SetIsStarted(true);
    let fnId = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          clearInterval(fnId);
          JoinJungleModal.OnClose(); // Close the modal when sec reaches 0
          JoinJungleModal.SetTime(Date.now());
          return 0; // Return the same value to prevent further decrements
        }
      });
    }, 1000);
    return () => clearInterval(fnId)
  };

  const startHandler = (data: {
    monkey1: string;
    monkey2: string;
    treeId: string;
  }) => {
    socket.auth.name === data.monkey1
      ? SetUsername(data.monkey2)
      : SetUsername(data.monkey1);
    raceBegins();
  };

  const connectErrorHandler = (err: Error) => {
    if (err.message !== "xhr poll error") {
      setIsLoading(false);
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };

  const notiHandler = () => {
    alert(
      `Oops! This jungle's already a duo!\nTry joining another jungle for now.🌴🐒`
    );
    window.location.reload();
  };

  const Toaster = () => {
    setNoti(true);
    setTimeout(() => setNoti(false), 3000);
  };

  useEffect(() => {
    socket.on("connected", () => {setPage(2)});
    socket.on("Noti", notiHandler);
    socket.on("connect_error", connectErrorHandler);
    socket.on("start", startHandler);

    return () => {
      socket.off("connected", () => {setPage(2)});
      socket.off("Noti", notiHandler);
      socket.off("connect_error", connectErrorHandler);
      socket.off("start", startHandler);
    };
  }, [socket, notiHandler, connectErrorHandler, startHandler]);
  return (
    <>
      {!JoinJungleModal.isOpen ? null : (
        <div
          className="
        absolute
        inset-0
        bg-black/15
        z-50
        h-full
        w-full
        flex
        justify-center
        items-center
        rounded-md
          "
        >
          <div
            className="
      text-white
      bg-this-grey
      shadow-2xl
      p-10
      px-16
      rounded-2xl
      flex
      flex-col
      w-1/2
      relative
      overflow-hidden
      z-20
      "
          >
            <p className="text-this-yellow text-2xl mb-5">Banana Hunt</p>
            {page === 1 &&
              (isLoading ? (
                <>
                  <h3 className="text-this-white animate-pulse">
                    Hold on Tight!!{" "}
                  </h3>
                  <p className="text-this-yellow">
                    We are convincing a monkey to race for u!{" "}
                  </p>
                </>
              ) : (
                <label
                  htmlFor="monkey"
                  className="flex flex-col"
                  onSubmit={() => setPage(2)}
                >
                  <p className="text-this-white">
                    what would your monkey be called?
                  </p>
                  <input
                    autoFocus
                    required
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleConnect();
                    }}
                    id="monkey"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-3 bg-transparent outline-none ring-this-yellow ring-2 rounded-xl caret-this-yellow p-1 py-2"
                  />
                  {err && (
                    <p className="text-this-yellow text-xs">
                      User already exists
                    </p>
                  )}
                  <button
                    onClick={handleConnect}
                    className="mt-3 hover:bg-this-white self-end bg-this-yellow text-sub-alt p-2 rounded-lg"
                  >
                    Next
                  </button>
                </label>
              ))}
            {page === 2 && (
              <>
                <label htmlFor="jungle" className="flex flex-col">
                  <p className="text-this-white">
                    which jungle would you like to join?
                  </p>
                  <input
                    autoFocus
                    id="jungle"
                    type="text"
                    value={joinJungleIdInput}
                    placeholder="Enter/paste invitation jungle name"
                    onChange={(e) => setJoinJungleIdInput(e.target.value.trim())}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleJoin(joinJungleIdInput);
                    }}
                    className="w-full outline-none mt-3 bg-transparent ring-this-yellow ring-2 rounded-xl caret-this-yellow p-1 py-2"
                  />
                  <button
                    onClick={() => handleJoin(joinJungleIdInput)}
                    disabled={joinJungleIdInput ? false : true}
                    className="mt-3 hover:bg-this-white text-sub-alt self-end bg-this-yellow p-2 rounded-lg disabled:cursor-not-allowed disabled:bg-sub-alt disabled:text-this-white"
                  >
                    Join
                  </button>
                </label>
                <label
                  htmlFor="create"
                  className="flex flex-col my-3 items-start"
                >
                  <p className="text-this-white">
                    {`Don't have an invite, `}
                    <button
                      onClick={() => handleJoin(createJungleIdInput)}
                      disabled={joinJungleIdInput ? true : false}
                      className="hover:bg-this-white text-sub-alt self-end bg-this-yellow p-2 rounded-lg disabled:cursor-not-allowed disabled:bg-sub-alt disabled:text-this-white"
                    >
                      Create
                    </button>{" "}
                    your jungle
                  </p>
                </label>
              </>
            )}
            {page === 3 && (
              <div className="flex flex-col gap-y-4 justify-around items-center">
                <p
                  className={`${
                    !JoinJungleModal.isStarted
                      ? "animate-pulse"
                      : "text-this-yellow"
                  } text-center`}
                >
                  {!JoinJungleModal.isStarted
                    ? `Waiting for the other monkey to join...`
                    : `All Monkeys connected`}
                </p>
                <div className="w-full p-8 pt-4 ring-this-yellow ring-1 rounded-lg flex flex-col justify-center items-center gap-y-4">
                  <h2 className="text-xl font-semibold">Your Jungle Name </h2>
                  <div className="flex w-full">
                    <div className="bg-[#2c2e31] w-full h-10 rounded-full flex justify-between items-center text-lg py-7 px-2">
                      <p className="pl-4">
                        {joinJungleIdInput
                          ? joinJungleIdInput
                          : createJungleIdInput}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            joinJungleIdInput
                              ? joinJungleIdInput
                              : createJungleIdInput
                          );
                          Toaster();
                        }}
                        className="bg-this-yellow text-white rounded-full flex justify-center items-center p-3.5 relative group"
                      >
                        {!noti ? <FaCopy size={22} /> : <FaCheck size={22} />}
                        <span className="absolute scale-0 group-hover:scale-100 rounded-md -bottom-8 py-1 text-xs w-28 bg-black">
                          {!noti ? "Copy JungleId" : "Copied!"}
                          <span className="absolute -top-1 left-12 rotate-45 h-4 w-4 bg-black -z-10"></span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-text-color text-center">
                  {!JoinJungleModal.isStarted ? (
                    `Kindly ask ur other friend to join with the same jungleId. `
                  ) : (
                    <span>
                      Game starts in{" "}
                      <span className="animate-ping text-white text-2xl">
                        {sec}
                      </span>
                    </span>
                  )}
                </p>
                <div
                  className={`absolute transition duration-500 opacity-5  ${
                    noti && "translate-x-36 bg-this-yellow opacity-100"
                  }rounded-md px-2 text-xs  flex justify-center items-center gap-x-2 bottom-4 left-0`}
                ></div>
              </div>
            )}
            <div className="absolute inset-0 left-[-24px] w-full h-14">
              <Image
                alt="branch"
                className="h-14 w-28 rotate-[-45deg] z-50"
                src="/branch1.png"
                width={999}
                height={999}
              />
              <Image
                alt="branch"
                className="absolute h-14 w-10 top-8 left-10 z-[-1] grayscale"
                src="/monkeyyellow.png"
                width={999}
                height={999}
              />
              <Image
                alt="branch"
                className="absolute h-14 w-14 top-0 right-0 z-[-1]"
                src="/banana.png"
                width={999}
                height={999}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinJunglemodal;
