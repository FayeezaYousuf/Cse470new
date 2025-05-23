"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();

  const router = useRouter();
  const { name } = user;
  const userId = user._id;

  return (
    <header className="px-6 py-4 w-full flex items-center justify-between bg-[#c3acce]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to Taskyfy"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-6">
        <button
          className="px-8 py-3 bg-[#f5d3c5] text-black font-bold rounded-[50px]
          hover:bg-[#a26769] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        
        <button
          className="px-8 py-3 bg-[#f5d3c5] text-black font-bold rounded-[50px]
          hover:bg-[#a26769] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Course" : "Login / Register"}
        </button>

        <div className="flex gap-4 items-center">
         
        </div>
      </div>
    </header>
  );
}

export default Header;

