export default class HashOfSets<T,K>
{       
    private map:Map<T,Set<K>> = new Map();

    public getUnderlyingMap() : Map<T,Set<K>>
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

    public get(t:T) : Set<K> | undefined
    {
        return this.map.get(t);
    }

    public getCount(t:T) : number
    {
        return this.map.get(t)?.size ?? 0;
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
            list = new Set<K>();
            this.map.set(t,list);
        }
        list.add(k);
    }

    public remove(t:T, k:K)
    {
        if(this.map.has(t))
        {
            const list = this.map.get(t); 
            if(list != null)
            {
                if(list.has(k))
                {
                    list.delete(k);
                    if(list.size == 0)
                    {
                        this.map.delete(t);
                    }
                }
            }
        }
    }   
}