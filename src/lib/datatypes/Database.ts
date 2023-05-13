import { browser } from "$app/environment";
import TagCategory from "./$TagCategory";
import Project from "./Project";
import Tag from "./Tag";
import Task from "./Task";

export default class Database
{
    private static currentProject:Project|null|undefined = null;

    static saveData()
    {
        if(!browser)
        {
            return;
        }
        if(Database.currentProject != null)
        {
            localStorage.setItem("currentProjectId", Database.currentProject.id);
        }
        console.log("Saving Data")
        //
        Tag.saveTags();
        Task.saveTasks();
        Project.saveProjects();
    }
    
    static loadData()
    {    
        if(!browser)
        {
            return;
        }
        Tag.loadTags();
        Database.createMissingPermatags();
        //
        Task.loadTasks();
        Project.loadProjects();
        //
        const currentProjectId = localStorage.getItem("currentProjectId");
        Database.currentProject = currentProjectId == null ? null : Project.allProjects.get(currentProjectId);
    }

    static createMissingPermatags()   
    {        
        if(!Tag.hasTagNamed("Planning"))
        {
            TagCategory.ProcessStep.createTag("Planning").setStyle("badge-primary");
            TagCategory.ProcessStep.createTag("Implementing").setStyle("badge-warning");
            TagCategory.ProcessStep.createTag("Testing").setStyle("badge-accent");
            TagCategory.ProcessStep.createTag("Finished").setStyle("badge-success");
        }
        console.log(Tag.allTags.size + " Total tags");
    }

    static setCurrentProject(project:Project)
    {
        Database.currentProject = project;
        Database.saveData();
        return project;
    }

    static getCurrentProject()
    {
        return this.currentProject;
    }

    static get project()
    {
        return this.currentProject!;
    }

    static deleteData()
    {
        Task.allTasks.clear();
        Project.allProjects.clear();
        this.saveData();
    }
}


