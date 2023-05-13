import TagCategory from "./$TagCategory";
import type IHasId from "./IHasID";
import {v4 as uuid}  from 'uuid';
import { browser } from "$app/environment";

export default class Tag implements IHasId
{
    id: string = "";
    category = TagCategory.Other;
    name:string = "";
    private style:string|null = null;

    static allTags:Map<string,Tag> = new Map<string,Tag>();

    static getTag(id:string)
    {
        return this.allTags.get(id);
    }

    static hasTagNamed(name:string)
    {
        for (let [key, value] of Tag.allTags.entries()) 
        {
            if (value.name == name)
            {
                return true;
            }
        }
        return false;
    }

    static createTag(name:string)
    {
        const tag = new Tag();
        tag.name = name;
        tag.id = uuid();
        this.allTags.set(tag.id,tag);
        return tag;
    }

    //tag is a json Tag object
    static getOrCreateTag(tag:Tag)
    {
        var possible = this.getTag(tag.id);
        if(possible == null)
        {
            possible = new Tag();
            Object.assign(possible, tag);
        }
        return possible;
    }

    constructor()
    {
        
    }
    
    getStyle()
    {
        return this.style ?? this.category.style;
    }

    setStyle(style:string)
    {
        this.style = style;
    }

    onLoaded()
    {

    }
   
    get icon()
    {
        return this.category.icon;
    }

    static loadTags()
    {
        if(!browser)
        {
            return;
        }
        const json = localStorage.getItem("tags");
        if(json == null)
        {
            console.log("No Tags in Local Storage");
            return;
        }
        console.log("Loading tags from Local Storage");
        Tag.allTags.clear();
        const jsonObject:Array<any> = JSON.parse(json);
        if("forEach" in jsonObject)
        {
            jsonObject.forEach(x=>
            {
                const tag:Tag = Tag.deserialize(x);
                Tag.allTags.set(tag.id, tag);
                console.log("Loaded tag " + tag.id);
            });
        }
        console.log(Tag.allTags.size + " Tags Loaded");       
    }

    static deserialize(x:any)
    {
        const tag:Tag = new Tag();
        Object.assign(tag, x);
        tag.onLoaded();       
        tag.category = TagCategory.values[tag.category.id as number];
        return tag;
    }

    static saveTags()
    {
        if(!browser)
        {
            return;
        }
        localStorage.setItem("tags", JSON.stringify([...Tag.allTags.values()]));
    }
}