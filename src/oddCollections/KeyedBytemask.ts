import Bytemask from "./Bytemask";

export default class KeyedBytemask<T>
{
    private mask:Bytemask;
    private map:Map<T,number>;

    constructor(arr:Array<T>)
    {
        this.map = new Map();
        for(var i = 0; i < arr.length;i++)
        {
            this.map.set(arr[i],i);
        }
        this.mask = new Bytemask();
    }

    add(option:T)
    {
        var number = this.map.get(option);
        if(number == null)
        {
            return;
        }
        this.mask.add(number);
    }

    remove(option:T)
    {
        var number = this.map.get(option);
        if(number == null)
        {
            return;
        }
        this.mask.remove(number);
    }

    not(option:T)
    {
        var number = this.map.get(option);
        if(number == null)
        {
            return;
        }
        this.mask.not(number);
    }

    has(option:T):boolean
    {
        var number = this.map.get(option);
        if(number == null)
        {
            return false;
        }
        return this.mask.has(number);
    }

}