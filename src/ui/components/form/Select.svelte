<script lang="ts">
    export let name: string;
    export let options: Array<{ value: string; label: string }>;
    export let label: string;
    export let selected: string;
</script>

<div class="tw:flex tw:flex-col tw:p-1">
    <label class="tw:text-xs tw:m-0">{label}</label>
    <select
        {name}
        class="tw:text-xs tw:hover:bg-gray-300 tw:m-0 tw:font-bold tw:p-0 tw:h-full tw:rounded-none tw:border-none tw:bg-transparent tw:shadow-none"
    >
        {#each options as option}
            <option
                class="tw:text-xs tw:bg-gray-300 tw:m-0 tw:p-0 tw:h-full tw:rounded-none tw:border-none tw:shadow-none"
                value={option.value}
                selected={option.value === selected}>{option.label}</option
            >
        {/each}
    </select>
</div>