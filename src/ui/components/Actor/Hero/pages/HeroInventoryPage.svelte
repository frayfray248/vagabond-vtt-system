<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import Button from "@/ui/components/control/Button.svelte";
    import Table from "@/ui/components/Table.svelte";

    export let sheetData: HeroSheetData;

    const inventoryItems = sheetData.inventory
</script>

<Table items={inventoryItems}>
    {#snippet header()}
        <th>Item Name</th>
        <th>Cost</th>
        <th>Slots</th>
        <th></th>
    {/snippet}
    {#snippet row(item)}
        <td>{item.name}</td>
        <td>{item.system.cost}</td>
        <td>{item.system.slots}</td>
        <td>
            <Button data-action="deleteItem" data-item-id={item.id} title="Delete item">
                <i class="fas fa-trash"></i>
            </Button>
        </td>
    {/snippet}
</Table>
