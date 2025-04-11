import { useTasks } from "@/context/taskContext";
import { edit, rightSign, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const {
    tasks,
    getTask,
    openModalForEdit,
    deleteTask,
    modalMode,
    toggleComplete,
  } = useTasks();

  // Always get the latest task from the tasks array
  const latestTask = Array.isArray(tasks)
  ? tasks.find((t) => t._id === task._id) || task
  : task;


  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{latestTask.title}</h4>
        <p>{latestTask.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(latestTask.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(latestTask.priority)}`}>
          {latestTask.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-[1.2rem]">
            <button
              className={`transition-colors duration-200 ${
                latestTask.completed ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => toggleComplete(latestTask._id)}
            >
              {rightSign}
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(latestTask._id);
                openModalForEdit(latestTask);
              }}
            >
              {edit}
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(latestTask._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;


