import React from "react";
import Innput from "./Input";
import { FaGoogle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Body = () => {
  return (
    <>
      <div className="relative h-full  w-full flex flex-col md:flex-row my-2">
        <div className="absolute h-full bg-black/60 w-full  flex justify-center items-center rounded-md">
          <p className="animate-bounce text-this-white">
            To be introduced soon...
          </p>
        </div>
        <div className=" basis-1/2 flex justify-center items-center">
          <div className="flex-col flex text-this-white gap-1.5">
            register
            <input
              type="text"
              placeholder="username"
              className="bg-sub-alt p-3 placeholder:text-text-color h-8 rounded-lg w-56 caret-this-yellow"
            />
            <Innput placeholder="email" />
            <Innput placeholder="verify email" />
            <Innput placeholder="password" />
            <Innput placeholder="verify password" />
            <button className="bg-sub-alt opacity-25 p-1 inline-flex items-center justify-center gap-2 rounded-lg">
              <FaUserPlus />
              Sign up
            </button>
          </div>
        </div>
        <div className=" basis-1/2 flex justify-center items-center">
          <div className="flex-col flex text-this-white gap-1.5">
            <p className="inline-flex justify-between">
              login{" "}
              <span className="text-text-color text-xs self-end items-end">
                Forgot Password?
              </span>
            </p>
            <Innput placeholder="email" />
            <Innput placeholder="password" />
            <button className="bg-sub-alt p-1 inline-flex items-center justify-center gap-2 rounded-lg">
              <FaSignInAlt />
              Sign in
            </button>
            <p className="inline-flex justify-center">or</p>
            <button className="bg-sub-alt p-1 inline-flex items-center justify-center gap-2 rounded-lg">
              <FaGoogle />
              Google Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
