import Tag from "./Tag";
import {v4 as uuid}  from 'uuid';
import { browser } from "$app/environment";
import TagCategory from "./$TagCategory";
import Task from "./Task";
import Tracked from "./Tracked";
import Database from "./Database";

export default class Project extends Tracked
{
    name:string ="";
    description:string="";
    acronym:string="";
    projectTag!:Tag;

    static allProjects:Map<string,Project> = new Map<string,Project>();

    onLoaded()
    {
        //atm we just call this to ensure we actually load the class, with methods
    }

    createTaskForProject()
    {
        const task = Task.createNew();
        if(this.projectTag == null || this.projectTag.id == "")
        {
            this.projectTag = TagCategory.Project.createTag(this.name);
        }
        console.log(this.projectTag.id + " : " + this.projectTag.name);
        task.tagIds.add(this.projectTag.id);
        return task;
    }

    static createNew(name:string)
    {
        const project = new Project();
        project.timeCreated = Date.now();
        project.id = uuid();
        project.name = name;
        project.projectTag = TagCategory.Project.createTag(name);
        Project.allProjects.set(project.id, project);       
        Database.saveData();
        return project;
    }

    static loadProjects()
    {
        if(!browser)
        {
            return;
        }
        const json = localStorage.getItem("projects");
        if(json == null)
        {
            console.log("No Projects in Local Storage");
            return;
        }
        console.log("Loading projects Projects from Local Storage");
        Project.allProjects.clear();
        const jsonObject:Array<any> = JSON.parse(json);
        if("forEach" in jsonObject)
        {
            jsonObject.forEach(x=>
            {
                const project:Project = Project.deserialize(x);
                Project.allProjects.set(project.id, project);
            });
        }
        console.log(Project.allProjects.size + " Projects Loaded");       
    }

    static deserialize(x:any)
    {
        const project:Project = new Project();
        Object.assign(project, x);
        project.deserializeFix();
        project.onLoaded();       
        project.projectTag = Tag.getOrCreateTag(project.projectTag);
        return project;
    }

    static debugProjectList()
    {
        Project.allProjects.forEach(t=>{
            console.log(t.id);
        })
    }

    static saveProjects()
    {
        if(!browser)
        {
            return;
        }
        localStorage.setItem("projects", JSON.stringify(
            [...Project.allProjects.values()],
            (_key,value)=> value instanceof Set ? [...value] : value));
    }
}