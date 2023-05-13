<script lang="ts">
    import type Project from "$lib/datatypes/Project";

    export let project:Project;
    export let onClick:(project:Project)=>void;
</script>

<div class={"btn rounded-md p-2"} on:click={()=>onClick(project)}>
	{project.name + " : " +  project.id }
</div>