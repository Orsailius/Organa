<script lang="ts">
    import { allTasks } from "$lib/datatypes/Stores";
    import type Task from "$lib/datatypes/Task";
    import TaskSlide from "./TaskSlide.svelte";

    export let onClick:(task:Task)=>void
</script>

<div class="">
    {#each [...$allTasks] as entry (entry[0])}
        <TaskSlide task={entry[1]} onClick={onClick}/>
    {/each}
</div>