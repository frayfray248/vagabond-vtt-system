<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import Button from "@/ui/components/control/Button.svelte";
    import Table from "@/ui/components/Table.svelte";

    export let sheetData: HeroSheetData;

    const inventoryItems = sheetData.inventory.items.concat(sheetData.inventory.weapons)
    const occupiedSlots = inventoryItems.reduce((total, item) => total + (item.system.slots ?? 0), 0)
    const maxSlots = sheetData.system.maxSlots
    const currencies = ["copper", "silver", "gold"] as const
</script>

<div class="tw:flex tw:items-stretch tw:divide-x tw:divide-[#b0b0b0] tw:border-b tw:border-[#b0b0b0]">
    <section class="tw:flex tw:flex-1 tw:flex-col tw:gap-1 tw:px-3 tw:py-2">
        <h4 class="tw:m-0 tw:border-b-0 tw:text-xs tw:uppercase tw:text-black">Slots</h4>
        <div class="tw:flex tw:gap-4 tw:font-bold" class:tw:text-red-500={occupiedSlots > maxSlots}>
            <span>Max: {maxSlots}</span>
            <span>Occupied: {occupiedSlots}</span>
        </div>
    </section>
    <section class="tw:flex tw:flex-1 tw:flex-col tw:gap-1 tw:px-3 tw:py-2">
        <h4 class="tw:m-0 tw:border-b-0 tw:text-xs tw:uppercase tw:text-black">Wealth</h4>
        <div class="tw:flex tw:gap-4 tw:font-bold">
            {#each currencies as currency}
                <label
                    class="tw:flex tw:items-center tw:gap-1"
                    title={game!.i18n!.localize(`VAGABOND.Wealth.${currency.capitalize()}.Long`)}
                >
                    <input
                        class="tw:w-14 tw:h-6 tw:text-center tw:font-bold"
                        type="number"
                        min="0"
                        name={`system.wealth.${currency}`}
                        value={sheetData.system.wealth[currency]}
                    />
                    {game!.i18n!.localize(`VAGABOND.Wealth.${currency.capitalize()}.Short`)}
                </label>
            {/each}
        </div>
    </section>
</div>

<Table items={inventoryItems}>
    {#snippet header()}
        <th>Item Name</th>
        <th>Cost</th>
        <th>Slots</th>
        <th></th>
    {/snippet}
    {#snippet row(item)}
        <td>
            <a data-action="openItem" data-item-id={item.id} title="Open item sheet" class="tw:cursor-pointer">{item.name}</a>
        </td>
        <td>{item.system.cost}</td>
        <td>{item.system.slots}</td>
        <td>
                <i data-action="deleteItem" data-item-id={item.id} title="Delete item" class="fas fa-trash tw:cursor-pointer"></i>
        </td>
    {/snippet}
</Table>
