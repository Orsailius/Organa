<script lang="ts">
	import Counter from './Counter.svelte';
    import TagBadge from '$lib/components/TagBadge.svelte';
    import TagCategory from '$lib/datatypes/$TagCategory';
	import Database from '$lib/datatypes/Database';
    import Task from '$lib/datatypes/Task';
    import TaskList from '$lib/components/TaskList.svelte';
    import Project from '$lib/datatypes/Project';
    import ProjectList from '$lib/components/ProjectList.svelte';
    import TaskEditor from '$lib/components/TaskEditor.svelte';
    import { allProjects, allTasks, currentProject } from '$lib/datatypes/Stores';	

	let currentTask:Task|null = null;

	if($allProjects.size > 0)
	{
		Database.setCurrentProject($allProjects.entries().next().value);
	}

	function createTaskForCurrentProject()
	{
		const currentProject = Database.getCurrentProject();
		if(currentProject != null)
		{
			currentTask = currentProject.createTaskForProject();
			Database.saveData();
			$allTasks = Task.allTasks;
		}
	}

	function createProject()
	{
		$currentProject = Database.setCurrentProject(Project.createNew("Test Project"));
		$allProjects = Project.allProjects;		
		console.log("Project created");
	}

	function onClickProject(project:Project) 
	{
		Database.setCurrentProject(project);
		$currentProject = project;
	}

	function onClickTask(task:Task)
	{
		console.log("stuff");
		currentTask = task;
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 bg-slate-200">
		<div class="col-span-1">
			<div class="btn btn-secondary"  on:click={createProject}>
				Create Project
			</div>
			{#if currentProject != null}
			<div class="btn btn-primary" on:click={createTaskForCurrentProject}>
				Create Task in Current Project
			</div>
			{/if}
		</div>
		<div class="col-span-1 lg:col-span-3 center">
			<h1 class="text-3xl">
				<span class="welcome">
					<div class="text-6xl font-bold text-orange-600">
						Organa
					</div>
					{#if $currentProject != null}
					<div>
						{$currentProject.name + " : " + $currentProject.id}
					</div>
					{:else}
					<div>
						No Project Selected
					</div>
					{/if}
					<!--<picture>
						<source srcset={welcome} type="image/webp" />
						<img src={welcome_fallback} alt="Welcome" />
					</picture>-->
				</span>
				Your personal project organizer
			</h1>
		
			<h2 class='btn mt-4' >
				try editing <strong>src/routes/+page.svelte</strong>
			</h2>
		
			<Counter />
			{#if currentTask != null}
				<TaskEditor task={currentTask}/>
			{/if}
		</div>
		<div class="col-span-1">
			<ProjectList onClick={onClickProject}/>
			<div class="divider"></div>
			<TaskList onClick={onClickTask}/>
		</div>
	</div>


</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}


	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	/*.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}*/
</style>
