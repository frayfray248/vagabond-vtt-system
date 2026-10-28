<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";

    export let sheetData: HeroSheetData;

    console.log(Object.keys(sheetData))
    const inventoryItems = sheetData.items.filter(item => item.type === "inventoryItem")
</script>

<table class="tw:table-auto w-full">
    <thead>
        <tr>
            <th>Item Name</th>
            <th>Cost</th>
            <th>Slots</th>
        </tr>
    </thead>
    <tbody>
        {#each inventoryItems as item}
            <tr>
                <td>{item.name}</td>
                <td>{item.cost}</td>
                <td>{item.slots}</td>
            </tr>
        {/each}
    </tbody>
</table>
