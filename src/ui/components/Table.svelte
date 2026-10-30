<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    interface Props {
        items: T[];
        row: Snippet<[T, number]>;
        header?: Snippet;
        className?: string;
    }

    let { items, row, header, className = "" }: Props = $props();
</script>

<table class="tw:table-auto w-full tw:bg-[unset] tw:border-0 tw:[&_td]:py-1 tw:[&_th]:text-black tw:[&_th]:text-shadow-none {className}">
    {#if header}
        <thead class="tw:bg-[unset] tw:border-0">
            <tr>{@render header()}</tr>
        </thead>
    {/if}
    <tbody>
        {#each items as item, index}
            <tr>{@render row(item, index)}</tr>
        {/each}
    </tbody>
</table>
