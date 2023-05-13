
class Node<T>
{
    value:T;
    prev:Node<T> | null;
    next:Node<T> | null;

    constructor(t:T)
    {
        this.value = t;
    }
}

export default class DoublyLinkedList<T>
{
    head:Node<T> | null;
    tail:Node<T> | null;
    size:number = 0;

    addToFront(t:T)
    {
        var node = new Node(t);
        if(this.head == null)
        {
            this.head = node;
            this.tail = node;
        }
        else
        {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;        
        }
        this.size++;
    }

    addToBack(t:T)
    {
        var node = new Node(t);
        if(this.tail == null)
        {
            this.head = node;
            this.tail = node;
        }
        else
        {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;        
        }
        this.size++;
    }    

    removeFront()
    {
        if(this.head != null)
        {
            if(this.head == this.tail)
            {
                this.head = null;
                this.tail = null;
            }
            else
            {
                this.head = this.head.next;
                if(this.head != null)
                {
                    this.head.prev = null;
                }
            }
            this.size--;
        }
    }

    removeBack()
    {
        if(this.tail != null)
        {
            if(this.head == this.tail)
            {
                this.head = null;
                this.tail = null;
            }
            else
            {
                this.tail = this.tail.prev;
                if(this.tail != null)
                {
                    this.tail.next = null;
                }
            }
            this.size--;
        }
    }
}