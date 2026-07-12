<script lang="ts">
    type Row = {
        label: string;
        value: string | number;
    };

    export let rows: Row[] = [];
</script>

<div class="tw:mt-1.5 tw:space-y-1 tw:text-xs">
    {#each rows as row}
        <div class="tw:flex tw:items-center tw:justify-between">
            <span>{row.label}</span>
            <span>{row.value}</span>
        </div>
    {/each}
</div>
