export default class Splay<T>
{  
    /**
     * We expect the distance function to be at least a semimetric
     */
    private distance:(a:T,b:T)=>number
    private maxElements:number;
    private size:number;
    private array:Array<T>;

    constructor(maxElements:number, distance:(a:T,b:T)=>number)
    {
        this.distance = distance;
        this.maxElements = maxElements;
        this.array = new Array(maxElements);
        this.size = 0;
    }

    add(a:T)
    {
        if(this.size < this.maxElements)
        {
            this.array[this.size] = a;
            this.size++;
            return null;
        }
        else
        {
            var minDSum = Number.MAX_VALUE;
            var minIndex = 0;
            for(var i = 0 ;i < this.array.length;i++)
            {                
                var dsum = this.calculateDSum(i, a);
                if(dsum < minDSum)
                {
                    minDSum = dsum;
                    minIndex = i;
                }
            }
            const newSum = this.calculateDSumOuter(a);
            if(newSum <= minDSum)
            {
                return a;
            }
            var kicked = this.array[minIndex];
            this.array[minIndex] = a;
            return kicked;
        }
    }


    private calculateDSum(i: number, a: T) 
    {
        var dsum = 0;
        for (var j = 0; j < this.array.length; j++) 
        {
            if (i == j) 
            {
                continue;
            }
            dsum += this.distance(this.array[i], this.array[j]);
        }
        dsum += this.distance(this.array[i], a);
        return dsum;
    }

    private calculateDSumOuter(b:T) 
    {
        var dsum = 0;
        for (var j = 0; j < this.array.length; j++) 
        {
            dsum += this.distance(b, this.array[j]);
        }
        return dsum;
    }
}