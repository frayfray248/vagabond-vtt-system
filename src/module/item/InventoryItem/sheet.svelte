<script lang="ts">
    import SheetBox from "@/ui/components/SheetBox.svelte";
    import ItemHeader from "./ItemHeader.svelte";
    import ItemProperties from "./ItemProperties.svelte";
    import type { InventoryItemSheetData } from "./sheet";

    export let sheetData: InventoryItemSheetData;
</script>

<div class="tw:w-full tw:box-border tw:bg-[#000000] tw:p-2">
    <SheetBox class="tw:mt-2">
        <ItemHeader img={sheetData.img} name={sheetData.name} />
        <ItemProperties
            cost={sheetData.system.cost}
            slots={sheetData.system.slots}
        />
    </SheetBox>
</div>
