export default class Histogram<T> extends Map<T, number>
{    
    private sum:number = 0;

    public add(t:T)
    {
        if(this.has(t))
        {
            this.set(t, (this.get(t) ?? 0) + 1);
        }
        else
        {
            this.set(t,1);
        }
        this.sum++;
    }

    public remove(t:T)
    {
        if(this.has(t))
        {
            const newCount = (this.get(t) ?? 1) - 1;
            if(newCount == 0)
            {
                this.delete(t);
            }
            else
            {
                this.set(t, newCount);
            }
            this.sum--;
        }
    }

    public push(t:T)
    {
        return this.add(t);
    }

    public get total()
    {
        return this.sum;
    }

    public percent(t:T) :number
    {
        if(!this.has(t))
        {
            return 0;
        }
        return (this.get(t) ?? 0) / this.sum;
    }
}