import type Tag from "./Tag";
import {v4 as uuid}  from 'uuid';
import { browser } from "$app/environment";
import Database from "./Database";
import Tracked from "./Tracked";

export default class Task extends Tracked
{
    name:string ="";
    description:string="";

    static allTasks:Map<string,Task> = new Map<string,Task>();

   
    onLoaded()
    {
        //atm we just call this to ensure we actually load the class, with methods
    }

    static createNew()
    {
        const task = new Task();
        task.timeCreated = Date.now();
        task.id = uuid();
        Task.allTasks.set(task.id, task);
        return task;
    }

    static loadTasks()
    {
        if(!browser)
        {
            return;
        }
        const json = localStorage.getItem("tasks");
        if(json == null)
        {
            console.log("No Tasks in Local Storage");
            return;
        }
        Task.allTasks.clear();
        const jsonObject:Array<any> = JSON.parse(json);
        if("forEach" in jsonObject)
        {
            jsonObject.forEach(x=>
            {
                const task:Task = new Task();
                Object.assign(task, x);          
                console.log(task);  
                task.deserializeFix();
                task.onLoaded();
                Task.allTasks.set(task.id, task);
            });
            console.log(Task.allTasks.size + " Projects Loaded");       
        }
    }

    static debugTaskList()
    {
        Task.allTasks.forEach(t=>{
            console.log(t.id);
        })
    }

    static saveTasks()
    {
        if(!browser)
        {
            return;
        }
        localStorage.setItem("tasks", JSON.stringify(
            [...Task.allTasks.values()],
            (_key,value)=> value instanceof Set ? [...value] : value));
    }
}