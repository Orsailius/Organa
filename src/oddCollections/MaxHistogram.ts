/**
 * Doesn't contain a remove since it would be O(n) to find the max again?
 * use a priority queue? heap?
 * Maybe we make another data structure
 * This is meant to be something we just throw a bunch of data into
 */
export default class MaxHistogram<T> extends Map<T, number>
{    
    private sum:number = 0;
    private maxKey:T;
    private maxAmount:number = 0;

    public add(t:T)
    {
        if(this.has(t))
        {
            const newAmount = (this.get(t) ?? 0) + 1;
            if(newAmount > this.maxAmount)
            {
                this.maxAmount = newAmount;
                this.maxKey = t;
            }
            this.set(t, newAmount);
        }
        else
        {
            if(this.maxAmount == 0)
            {
                this.maxAmount = 1;
                this.maxKey = t;
            }
            this.set(t,1);
        }
        this.sum++;
    }

    public getMax()
    {
        return {
            key: this.maxKey,
            amount: this.maxAmount
        };
    }

    public getMaxAmount() : number
    {
        return this.maxAmount;
    }
    
    public getMaxKey() : T
    {
        return this.maxKey;
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