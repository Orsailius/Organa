<script lang="ts">
    import type Project from "$lib/datatypes/Project";
    import { allProjects } from "$lib/datatypes/Stores";
    import ProjectSlide from "./ProjectSlide.svelte";    

    export let onClick:(project:Project)=>void
</script>

<div class="">
    {#each [...$allProjects] as entry (entry[0])}
        <ProjectSlide project={entry[1]} onClick={onClick}/>
    {/each}
</div>