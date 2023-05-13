<script lang="ts">
    import Database from "$lib/datatypes/Database";
    import type Task from "$lib/datatypes/Task";
    import TagBadge from "./TagBadge.svelte";
    import Icon from '@iconify/svelte';

    export let task:Task;

</script>

<div class={"rounded-md bg-slate-300 p-2"}>
    <h1 class='text-2xl font-semibold'>
        Task Editor
    </h1>
	<div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Task Name</span>
        </label>
        <input type="text" placeholder="Type the Task name here" 
            class="input input-bordered input-primary w-full max-w-xs" />
        <label class="label">
          <span class="label-text-alt">What you will refer to this task as</span>
        </label>
    </div>
    <div class="mt-2">
        <div class='text-lg font-semibold'>
            Tags
        </div>
    </div>
    <div class="columns-5">
        <div class="badge badge-primary pl-1" on:click={()=>
        {          
            task.addTag(Database.project.projectTag);
        }}>
            <div class="mr-1">
                <Icon icon="majesticons:plus-line" />
            </div>           
            Add Tag
        </div>
        {#if task.tagIds.size > 0}
            {#each [...task.tagIds] as tagId}
                <TagBadge tagId={tagId}/>
            {/each}
        {/if}
    </div>
</div>