<script lang="ts">

export let name: string;
export let value: number;


</script>

<div class="tw:border">
    <div class="tw:bg-black tw:text-center tw:text-white tw:text-xs tw:px-4">{game!.i18n!.localize(`VAGABOND.Stats.${name}.Long`).toUpperCase()}</div>
    <div class="tw:text-center tw:py-1 tw:font-bold">
        {value}
    </div>
</div>
