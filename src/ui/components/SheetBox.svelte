<script lang="ts">
    let { class: className = "", children } = $props();
</script>

<section
    class={`tw:rounded-[0.6rem] tw:border tw:border-[#2b2b2b] tw:bg-[#efefef] tw:p-2 ${className}`}
>
    {#if children}
        {@render children()}
    {/if}
</section>
