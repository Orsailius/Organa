
export default abstract class SuperEnum<T extends SuperEnum<T>>
{
    name:string;
    id?:number;
    
    toString()
    {
        return this.name;
    }  

    static create <T extends SuperEnum<T> & (new()=>SuperEnum<T>),K>(cls:T, cls2:K, name:string[])
    {
        addStaticArray(cls, "values",cls2);
        addStaticSize(cls, "size",cls2);
        addStaticGetRandom(cls, "getRandom",cls2);
        createSuperEnumValues(cls, name, cls2); 
        var ret:typeof cls & typeof cls2 = Object.getPrototypeOf(cls).constructor();
        return cls;
    }
}

function createSuperEnumValues<
T extends SuperEnum<T>,
Obj extends SuperEnum<T>,
Key extends PropertyKey,
Subtype>
(obj:{new():Obj;values:Array<Subtype>}, prop: Key[], suc:Subtype): 
asserts obj is {new():Obj;values:Array<Subtype>} & Readonly<Record<Key, Subtype>> 
{   
    prop.forEach(c=>
    {
        const instance = new obj();
        instance.name = c.toString();
        instance.id = obj.values.length;
        obj.values.push(instance as unknown as Subtype);
        Object.defineProperty(obj, c, {
            enumerable: true,
            configurable: false,
            writable: false,
            value: instance
        });
    });
}

function addStaticArray<
T extends SuperEnum<T>,
Obj extends SuperEnum<T>,
Key extends PropertyKey,
Subtype>
(obj:{new():Obj;}, prop: Key, sub:Subtype): 
asserts obj is {new():Obj} & Readonly<Record<Key, Array<Subtype>>> 
{   
    obj = Object.defineProperty(obj, prop, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Array<Subtype>()
      });
}

export function addStaticSize<
T extends SuperEnum<T>,
Obj extends SuperEnum<T>,
Key extends PropertyKey,
Subtype>
(obj:{new():Obj; values:Array<Subtype>}, prop: Key, sub:Subtype): 
asserts obj is {new():Obj;values:Array<Subtype>} & Readonly<Record<Key, ()=>number>> 
{   
    obj = Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: true,
        get() : number
        {
            return obj.values.length;
        }
      });
}

export function addStaticGetRandom<
T extends SuperEnum<T>,
Obj extends SuperEnum<T>,
Key extends PropertyKey,
Subtype>
(obj:{new():Obj; values:Array<Subtype>}, prop: Key, sub:Subtype): 
asserts obj is {new():Obj;values:Array<Subtype>} & Readonly<Record<Key, ()=>Subtype>> 
{   
    obj = Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: true,
        value : function()
        {
            return obj.values[~~(Math.random() * obj.values.length)];
        }
      });
}