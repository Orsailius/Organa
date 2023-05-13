import HashOfLists from "./HashOfLists";
import Histogram from "./Histogram";

/**
 * O(1) add
 * probabilistic amortized O(1) getRandom
 * 
 * Two get approaches
 * 1) set nulls, random retries, shrink list after retry amount becomes asymptotic
 *      - not truly O(1) (probabilistic amortized), should be random
 *      - going with this, might implement 2 as well
 * 2) pseudo random lists, always pull/push from start, middle or end of linked link
 *      - not truly random, O(1)
 */
export default class Playlist<T> 
{
    private hashOfLists:HashOfLists<number,T|null> = new HashOfLists();
    private actualCount:Histogram<number> = new Histogram();
    private lowestSet:number = 0;

    add(t:T)
    {
        this.hashOfLists.add(0, t);
        this.actualCount.add(0);
        this.lowestSet = 0;
    }

    size()
    {
        return this.actualCount.total;
    }

    getRandom()
    {
        var list = this.hashOfLists.get(this.lowestSet);
        if(list == null)
        {
            return null;
        }
        var index = 0;
        var ret:T|null = null;
        if(list.length == 1)
        {
            ret = list[index];
            this.actualCount.remove(this.lowestSet);
            this.hashOfLists.removeBucket(this.lowestSet);
            //            
            this.lowestSet++;
            this.hashOfLists.add(this.lowestSet, ret);
            this.actualCount.add(this.lowestSet);
            return ret;
        }
        else
        {
            index = ~~(Math.random() * list.length);
            ret = list[index];
            while(ret == null)
            {
                index = ~~(Math.random() * list.length);
                ret = list[index];
            }
            list[index] = null;
            this.actualCount.remove(this.lowestSet);
            var actual = this.actualCount.get(this.lowestSet) ?? 0;
            if(actual <= list.length/2)
            {
                //resize ar
                this.hashOfLists.replaceBucket(this.lowestSet, list.filter(x=>x != null));
            }
            this.hashOfLists.add(this.lowestSet+1, ret);
            this.actualCount.add(this.lowestSet+1);
            return ret;
        }
    }
}