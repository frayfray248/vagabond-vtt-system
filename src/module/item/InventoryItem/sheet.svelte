<script lang="ts">
    import SheetBox from "@ui/components/SheetBox.svelte";
    import FlexBox from "@ui/components/layout/FlexBox.svelte";
    import KeyValueList from "@ui/components/KeyValueList.svelte";
    import type { InventoryItemSheetData } from "./sheet";

    export let sheetData: InventoryItemSheetData;

    $: rows = [
        { label: "Cost", value: sheetData.system.cost },
        { label: "Slots", value: sheetData.system.slots },
    ];
</script>

<div class="tw:w-full tw:box-border tw:bg-[#000000] tw:p-2">
    <SheetBox>
        <FlexBox direction="row" gap="2">
            <div class="tw:h-29 tw:w-29 tw:shrink-0 tw:overflow-hidden">
                <img
                    class="tw:h-full tw:w-full tw:object-cover tw:object-center"
                    src={sheetData.img}
                    alt={sheetData.name}
                    data-edit="img"
                />
            </div>
            <FlexBox direction="col" gap="1" className="tw:flex-1">
                <h1 class="tw:border-b-0 tw:mb-0">{sheetData.name}</h1>
                <KeyValueList {rows} />
            </FlexBox>
        </FlexBox>
    </SheetBox>
</div>
