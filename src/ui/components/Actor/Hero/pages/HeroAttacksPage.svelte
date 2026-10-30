<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import Table from "@/ui/components/Table.svelte";

    export let sheetData: HeroSheetData;

    const weapons = sheetData.inventory.weapons
</script>


<Table items={weapons}>
    {#snippet header()}
        <th>Weapon</th>
        <th>Types</th>
        <th>Properties</th>
        <th>Range</th>
        <th>Grip</th>
        <th>Damage</th>
    {/snippet}
    {#snippet row(item)}
        <td>
            <a data-action="openItem" data-item-id={item.id} title="Open item sheet" class="tw:cursor-pointer">{item.name}</a>
        </td>
        <td>{item.system.types.filter(skill => skill).map(skill => game.i18n?.localize(`VAGABOND.Skills.${skill.capitalize()}.Long`)).join(", ")}</td>
        <td>{item.system.properties.filter(prop => prop).map(prop => prop.capitalize())}</td>
        <td>{item.system.range.capitalize()}</td>
        <td>{item.system.grip}</td>
        <td>{item.system.damage}</td>
    {/snippet}
</Table>
