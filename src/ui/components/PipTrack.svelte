<script lang="ts">
    export let value: number;
    export let max: number;

    $: clampedValue = Math.max(0, Math.min(max, value));
</script>

<div class="tw:mt-1.5 tw:flex tw:items-center tw:gap-1.5">
    {#each Array(max) as _, index}
        <span
            class={`tw:block tw:h-3 tw:w-3 tw:rounded-full tw:border tw:border-[#d9d9d9] ${index < clampedValue ? "tw:bg-white" : "tw:bg-transparent"}`}
        ></span>
    {/each}
</div>
