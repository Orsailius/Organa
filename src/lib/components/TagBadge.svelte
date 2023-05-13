<script lang="ts">
    import Tag from "$lib/datatypes/Tag";

    export let tagId:string;
    //chacing tag doesn't seem to update right, maybe we export tag instead? resolve in parent?
</script>

{#if Tag.getTag(tagId) != null}
    <div class={"badge " + Tag.getTag(tagId)?.getStyle()}>
        {Tag.getTag(tagId)?.name}
    </div>
{:else}
    <div class={"badge badge-error"}>
        No Tag for: {tagId}
    </div>
{/if}