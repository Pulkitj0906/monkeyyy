"use client";
import { useEffect, useState } from "react";
import useJoinJungleModal from "../_hooks/useJoinJungleModal";
import socket from "../race/socket";
import Image from "next/image";
import OppTempWords from "../_hooks/useOppTempWords";

const JoinJunglemodal = () => {
  const [page, setPage] = useState(1);
  const [sec, setSec] = useState(10);
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const [err, setErr] = useState(false);
  const { isOpen, OnOpen, OnClose, SetTime } = useJoinJungleModal();
  const [joinJungleIdInput, setJoinJungleIdInput] = useState("");
  const [createJungleIdInput, setCreateJungleIdInput] = useState("");
  const { SetUsername } = OppTempWords();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    if (name) {
      setIsLoading(true);
      socket.auth = { name };
      socket.connect();
    }
  };
  useEffect(() => {
    socket.on("connected", () => {
      setPage(2);
    });
  }, []);
  const handleJoin = (id: string) => {
    if (id) {
      socket.emit("joinJungle", id);
      setPage(3);
    }
  };
  const raceBegins = () => {
    setStart(true);
    let fnId = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          clearInterval(fnId);
          OnClose(); // Close the modal when sec reaches 0
          SetTime(Date.now());
          return 0; // Return the same value to prevent further decrements
        }
      });
    }, 1000);
    return () => clearInterval(fnId);
  };

  useEffect(() => {
    socket.on("start", (data) => {
      socket.auth.name === data.monkey1
        ? SetUsername(data.monkey2)
        : SetUsername(data.monkey1);
      raceBegins();
    });
  }, []);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 6000);
    });
  }, []);

  useEffect(() => {
    socket.on("Noti", (noti: string) => {
      alert(noti);
    });
  }, []);

  return (
    <>
      {!isOpen ? null : (
        <div
          className="
        absolute
        inset-0
        bg-black/30
        z-50
        h-full
        w-full
        flex
        justify-center
        items-center
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-3 bg-transparent ring-this-white ring-1 rounded-xl caret-this-yellow p-1 py-2"
                  />
                  {err && (
                    <p className="text-this-yellow text-xs">
                      User already exists
                    </p>
                  )}
                  <button
                    onClick={handleConnect}
                    className="mt-3 hover:bg-this-white hover:text-sub-alt self-end bg-sub-alt p-2 rounded-lg"
                  >
                    Next
                  </button>
                </label>
              ))}
            {page === 2 && (
              <>
                <label htmlFor="jungle" className="flex flex-col">
                  <p className="text-this-white">
                    which jungle would to you like to join?
                  </p>
                  <input
                    autoFocus
                    id="jungle"
                    type="text"
                    value={joinJungleIdInput}
                    onChange={(e) => setJoinJungleIdInput(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleJoin(joinJungleIdInput);
                    }}
                    className="w-full mt-3 bg-transparent ring-this-white ring-1 rounded-xl caret-this-yellow p-1 py-2"
                  />
                  <button
                    onClick={() => handleJoin(joinJungleIdInput)}
                    className="mt-3 hover:bg-this-white hover:text-sub-alt self-end bg-sub-alt p-2 rounded-lg"
                  >
                    Join
                  </button>
                </label>
                <p className="self-center text-this-white/90 m-3">or</p>
                <label htmlFor="create" className="flex flex-col">
                  <p className="text-this-white">create a jungle</p>
                  <input
                    placeholder="jungle name of your choice"
                    id="create"
                    type="text"
                    value={createJungleIdInput}
                    onChange={(e) => setCreateJungleIdInput(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleJoin(createJungleIdInput);
                    }}
                    className="w-full mt-3 bg-transparent ring-this-white ring-1 rounded-xl caret-this-yellow p-1 py-2 placeholder:text-text-color"
                  />
                  <button
                    onClick={() => handleJoin(createJungleIdInput)}
                    className="mt-3 hover:bg-this-white hover:text-sub-alt self-end bg-sub-alt p-2 rounded-lg"
                  >
                    Create
                  </button>
                </label>
              </>
            )}
            {page === 3 && (
              <>
                <h1 className="text-xl">Your Jungle</h1>
                <p className="text-text-color animate-pulse">
                  {!start
                    ? `Waiting for the other monkey to join.`
                    : `All Monkeys connected`}
                  <br />
                  {start && (
                    <span>
                      Game starts in{" "}
                      <span className="animate-ping text-this-white text-xl">
                        {sec / 2}
                      </span>
                    </span>
                  )}
                  {/* Each player reduces the time by 1 second. So, in reality the timer reduces by 2 seconds in 1 second. */}
                </p>
              </>
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
