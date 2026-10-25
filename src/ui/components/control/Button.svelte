<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button";
    export let disabled: boolean = false;
    export let className: string = "";
    export let onClick: (event: MouseEvent) => void = () => {};
</script>

<button
    {type}
    {disabled}
    class={`tw:inline-flex tw:items-center tw:justify-center tw:rounded tw:border tw:border-[#2b2b2b] tw:bg-[#2b2b2b] tw:px-3 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-[#f2f2f2] tw:transition-colors hover:tw:bg-[#414141] focus-visible:tw:outline-2 focus-visible:tw:outline-offset-2 focus-visible:tw:outline-[#2b2b2b] disabled:tw:cursor-not-allowed disabled:tw:opacity-50 ${className}`}
    on:click={onClick}
    {...$$restProps}
>
    <slot />
</button>