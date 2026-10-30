<script lang="ts">
    import SheetBox from "@ui/components/SheetBox.svelte";
    import FlexBox from "@ui/components/layout/FlexBox.svelte";
    import Input from "@ui/components/form/Input.svelte";
    import type { InventoryItemSheetData } from "./sheet";

    export let sheetData: InventoryItemSheetData;
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
                <input
                    name="name"
                    class="tw:text-2xl tw:font-bold tw:text-black tw:m-0 tw:p-0 tw:h-auto tw:rounded-none tw:border-none tw:bg-transparent tw:shadow-none tw:hover:bg-gray-300"
                    type="text"
                    value={sheetData.name}
                    placeholder="Item name"
                />
                <FlexBox direction="row" gap="2">
                    <Input name="system.cost" label="Cost" type="number" value={sheetData.system.cost} placeholder="0" />
                    <Input name="system.slots" label="Slots" type="number" value={sheetData.system.slots} placeholder="0" />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    </SheetBox>
</div>
