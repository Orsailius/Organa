<script lang="ts">
    import type Task from "$lib/datatypes/Task";

    export let task:Task;
    export let onClick:(task:Task)=>void;
</script>

<div class={"btn rounded-md p-2"} on:click={()=>onClick(task)}>
	{task.name + " : " +  task.id }
</div>