<script lang="ts">
    export let title: string;
</script>

<section
    class="tw:col-1 tw:row-[1/3] tw:flex tw:flex-col tw:overflow-hidden tw:rounded-[0.6rem] tw:border tw:border-[#2b2b2b] tw:bg-[#0a0a0a] tw:text-[#f2f2f2]"
>

    <div class="tw:flex tw:flex-col tw:gap-0">
        <slot />
    </div>
</section>
