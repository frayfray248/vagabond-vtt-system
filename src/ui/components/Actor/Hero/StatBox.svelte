<script lang="ts">
    import Input from "@/ui/components/form/Input.svelte";

    export let name: string;
    export let value: number;
</script>

<div class="tw:border">
    <div class="tw:bg-black tw:text-center tw:text-white tw:text-xs tw:px-4">
        {game!
            .i18n!.localize(`VAGABOND.Stats.${name.capitalize()}.Long`)
            .toUpperCase()}
    </div>
    <div class="tw:text-center  tw:font-bold">
        <input
            type="number"
            name={`system.stats.${name}`}
            {value}
            class="tw:hover:bg-gray-300 tw:m-0 tw:font-bold tw:p-0 tw:h-full tw:rounded-none tw:border-none tw:bg-transparent tw:shadow-none tw:text-2xl"
        />
    </div>
</div>
