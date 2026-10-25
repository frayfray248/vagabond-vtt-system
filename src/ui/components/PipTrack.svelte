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

        root.dispatchEvent(new CustomEvent("piptrack:change", {
            bubbles: true,
            detail: { value, name }
        }));
    };
</script>

<div
    bind:this={root}
    class="piptrack tw:mt-1.5 tw:flex tw:items-center tw:gap-1.5"
>
    {#each Array(max) as _, index}
        <span
            onclick={() => setValue(index + 1)}
            class={`tw:block tw:h-3 tw:w-3 tw:rounded-full tw:border tw:border-[#d9d9d9] ${index < clampedValue ? "tw:bg-white" : "tw:bg-transparent"}`}
        ></span>
    {/each}
</div>