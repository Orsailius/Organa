import { writable } from "svelte/store";
import Database from "./Database";
import Project from "./Project";
import Task from "./Task";

Database.loadData();

export const allProjects = writable<Map<string,Project>>(Project.allProjects);
export const allTasks= writable<Map<string,Task>>(Task.allTasks);
export const currentProject = writable(Database.getCurrentProject());