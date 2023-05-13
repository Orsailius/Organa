export default class Bytemask
{
    private buffer:ArrayBuffer;
    private view:Uint8Array;

    constructor()
    {
        this.buffer = new ArrayBuffer(1);
        this.view = new Uint8Array(this.buffer);
    }

    //for performance we don't check this is < 8
    add(option:number)
    {
        this.view[0] = this.view[0] | (1 << option);
    }

    remove(option:number)
    {
        this.view[0] = this.view[0] & ~(1 << option);
    }

    not(option:number)
    {
        this.view[0] = this.view[0] ^ (1 << option);
    }

    has(option:number):boolean
    {
        return ((this.view[0] >> option) & 1) == 1;
    }

    toString():string
    {
        var str:string = "";
        for(var i =0; i < 8;i++)
        {
            if(this.has(i))
            {
                str+="1";
            }
            else
            {
                str+="0";
            }
        }
        return str;
    }
}