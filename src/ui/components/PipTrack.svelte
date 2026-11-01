<script lang="ts">
    export let value: number;
    export let max: number;
    export let name: string;

    let root: HTMLDivElement;

    $: clampedValue = Math.max(0, Math.min(max, value));

    const setValue = (newValue: number) => {
        const nextValue = Math.max(
            0,
            Math.min(max, newValue === value ? newValue - 1 : newValue)
        );

        if (nextValue === value) return;

        value = nextValue;
    };
</script>

<div
    bind:this={root}
    class="tw:mt-1.5 tw:flex tw:items-center tw:gap-1.5"
    data-action="piptrack"
    data-name={name}
    data-value={value}
>
    {#each Array(max) as _, index}
        <span
            onclick={() => setValue(index + 1)}
            class={`tw:block tw:h-3 tw:w-3 tw:rounded-full tw:border tw:border-[#d9d9d9] ${index < clampedValue ? "tw:bg-white" : "tw:bg-transparent"}`}
        ></span>
    {/each}
</div>