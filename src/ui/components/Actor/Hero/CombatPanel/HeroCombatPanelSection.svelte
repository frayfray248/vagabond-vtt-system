<script lang="ts">
    export let title: string;
    export let withBorder = true;

    $: sectionClass = withBorder
        ? "tw:border-b tw:border-[#2b2b2b] tw:px-3 tw:py-2"
        : "tw:px-3 tw:py-2";
</script>

<div class={sectionClass}>
    <p class="tw:text-[0.65rem] tw:font-semibold tw:tracking-[0.14em] tw:uppercase tw:text-[#bebebe]">{title}</p>
    <slot />
</div>
