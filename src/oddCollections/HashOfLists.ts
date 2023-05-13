/**
 * 
 * 'remove' is O(size of largest list) 
 * The Set version has O(1) 'remove', but has no random access
 */
export default class HashOfLists<T,K>
{       
    private map:Map<T,Array<K>> = new Map();

    public getUnderlyingMap() : Map<T,Array<K>>
    {
        return this.map;
    }

    public get keyCount()
    {
        return this.map.size;
    }

    public has(t:T) : boolean
    {
        return this.map.has(t);
    }

    public get(t:T) : Array<K> | undefined
    {
        return this.map.get(t);
    }

    public removeBucket(t:T)
    {
        this.map.delete(t);
    }

    public replaceBucket(t:T, bucket: Array<K>)
    {
        this.map.set(t,bucket);
    }

    public getCount(t:T) : number
    {
        return this.map.get(t)?.length ?? 0;
    }

    public add(t:T, k:K)
    {        
        var list;
        if(this.map.has(t))
        {
            list = this.map.get(t); 
        }
        else
        {
            list = new Array<K>();
            this.map.set(t,list);
        }
        list.push(k);
    }

    public recheckList(t:T, list:Array<K>)
    {
        if(list.length == 0)
        {
            this.map.delete(t);
        }
    }

    public move(original:T, next:T, k:K)
    {
        this.remove(original, k);
        this.add(next, k);
    }

    public moveAt(original:T, next:T, originalIndex:number)
    {
        var k:K = this.get(original)![originalIndex];
        this.removeAt(original, originalIndex);
        this.add(next, k);
    }

    public removeAt(t:T, index:number)
    {
        if(this.map.has(t))
        {
            const list = this.map.get(t); 
            if(list != null)
            {     
                list.splice(index, 1);
                if(list.length == 0)
                {
                    this.map.delete(t);
                }
            }
        }
    }

    public remove(t:T, k:K)
    {
        if(this.map.has(t))
        {
            const list = this.map.get(t) as Array<K>;             
            if(list != null && list != undefined)
            {          
                var index:number = list.indexOf(k);   
                if(index != -1)
                {
                    list.splice(index, 1);
                    if(list.length == 0)
                    {
                        this.map.delete(t);
                    }
                }   
            }
        }
    }   
}