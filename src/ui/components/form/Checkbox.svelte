<script lang="ts">
    export let checked: boolean = false;
    export let name: string = "";
    export let label: string = "";
</script>

<label>
    <div
        class="tw:flex tw:items-center tw:justify-center tw:h-3 tw:w-3 tw:rounded-full tw:border tw:border-current"
    >
        {#if checked}
            <div class=" tw:h-2 tw:w-2 tw:bg-black tw:rounded-full"></div>
        {/if}
    </div>
    <input type="checkbox" class="tw:hidden" {name} {checked} />
</label>
