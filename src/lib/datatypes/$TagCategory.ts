import SuperEnum from "../../oddCollections/SuperEnum";
import Tag from "./Tag";

class $TagCategory extends SuperEnum<$TagCategory>
{
    name:string ="";
    icon:string ="";
    style:string ="";

    createTag(name:string)
    {
        const tag = Tag.createTag(name);
        tag.category = this;
        return tag;
    }
}

const values =[
    "Other",
    "Project",
    "Language",
    "ProcessStep",
    "Tool"
]

const TagCategory = SuperEnum.create($TagCategory, new $TagCategory(), values);
export default TagCategory;

