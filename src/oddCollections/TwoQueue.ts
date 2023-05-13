export default class TwoQueue<T> implements Iterable<T>
{    
    private first:T|null;
    private second:T|null;

    public [Symbol.iterator](): Iterator<T, any, undefined> 
    {
        var first:boolean = true;
        var done: boolean = false;
        return {          
            next: function()
            {
                if(!first)
                {
                    done = true;
                }
                const value = first? this.first : this.second;
                first = false;
                return {
                    done: done,
                    value: value
                }
            }.bind(this)
        }
    }

    public count():number
    {
        if(this.first == null)
        {
            return 0;
        }
        else if(this.second == null)
        {
            return 1;
        }
        return 2;
    }

    public add(t:T)
    {
        if(this.first == null)
        {
            this.first = t; 
        }
        else if(this.second == null)
        {
            this.second = t;
        }
        else
        {
            this.first = this.second;
            this.second = t;
        }
    }

    public push(t:T)
    {
        return this.add(t);
    }

    public enqueue(t:T)
    {
        return this.add(t);
    }

    public peek()
    {
        return this.first;
    }

    public poll()
    {
        const t:T|null = this.first;
        this.first = this.second;
        this.second = null;
        return t;
    }

    public oldest()
    {
        return this.first;
    }

    public newest()
    {        
        return this.second ?? this.first;
    }
}