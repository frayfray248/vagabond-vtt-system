<script lang="ts">
    export let name: string;
    export let value: string | number;
    export let type: "text" | "number" = "text";
    export let label: string;
    export let placeholder: string;
</script>

<div class="tw:flex tw:flex-col tw:p-1">
    <label for={name} class="tw:text-xs tw:m-0">{label}</label>
    <input
        id={name}
        {name}
        class="tw:text-xs tw:hover:bg-gray-300 tw:m-0 tw:font-bold tw:p-0 tw:h-full tw:rounded-none tw:border-none tw:bg-transparent tw:shadow-none"
        {type}
        {placeholder}
        {value}
    />
</div>
