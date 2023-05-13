import Database from "./Database";
import type IHasId from "./IHasID";
import type Tag from "./Tag";

export default class Tracked implements IHasId
{
    id: string="";    
    tagIds:Set<string> = new Set<string>();
    timeCreated:number = -1;
    timeStarted:number = -1;
    timeFinished:number = -1;

    addTag(tag:Tag)
    {
        this.tagIds.add(tag.id);
        Database.saveData();
        console.log("Added tag " + tag);
    }

    deserializeFix()
    {
        var pojotags = this.tagIds;
        console.log(pojotags);
        this.tagIds = new Set<string>();
        if("forEach" in pojotags)
        {
            pojotags.forEach(id=>
            {           
                this.tagIds.add(id);
            });
        }
    }

}