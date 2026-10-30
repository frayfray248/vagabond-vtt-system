<script lang="ts">
    import FlexBox from "@ui/components/layout/FlexBox.svelte";

    export let img: string;
    export let name: string;
</script>

<div class="tw:mb-4">
    <FlexBox direction="row" gap="2">
        <div class="tw:w-8 tw:shrink-0 tw:overflow-hidden">
            <img
                class="tw:h-full tw:w-full tw:object-cover tw:object-center"
                src={img}
                alt={name}
                data-edit="img"
            />
        </div>
        <FlexBox direction="col" gap="1" className="tw:flex-1">
            <input
                name="name"
                class="tw:text-2xl tw:font-bold tw:text-black tw:m-0 tw:p-0 tw:h-auto tw:rounded-none tw:border-none tw:bg-transparent tw:shadow-none tw:hover:bg-gray-300"
                type="text"
                value={name}
                placeholder="Item name"
            />
        </FlexBox>
    </FlexBox>
</div>
