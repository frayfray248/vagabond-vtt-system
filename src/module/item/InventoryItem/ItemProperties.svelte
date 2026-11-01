<script lang="ts">
    import Input from "@ui/components/form/Input.svelte";
    import SheetBox from "@ui/components/SheetBox.svelte";
    import Table from "@ui/components/Table.svelte";

    export let cost: number;
    export let slots: number;

    const properties = [
        { label: "Cost", name: "system.cost", value: () => cost },
        { label: "Slots", name: "system.slots", value: () => slots },
    ];
</script>

<h2 class="tw:mb-2 tw:text-lg tw:font-bold tw:text-black">Item Properties</h2>
<Table items={properties}>
    {#snippet row(property)}
        <th scope="row" class="tw:w-1/4 tw:text-left">
            <label for={property.name}>{property.label}</label>
        </th>
        <td>
            <Input
                name={property.name}
                value={property.value()}
                type="number"
                placeholder="0"
            />
        </td>
    {/snippet}
</Table>
