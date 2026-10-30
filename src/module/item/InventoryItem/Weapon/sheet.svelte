<script lang="ts">
    import SheetBox from "@ui/components/SheetBox.svelte";
    import Input from "@ui/components/form/Input.svelte";
    import Table from "@ui/components/Table.svelte";
    import ItemHeader from "../ItemHeader.svelte";
    import ItemProperties from "../ItemProperties.svelte";
    import type { WeaponSheetData } from "./sheet";
    import { HERO_SKILL } from "@module/actor/Hero/model";
    import { WEAPON_GRIP, WEAPON_PROPERTY, WEAPON_RANGE } from "./model";

    export let sheetData: WeaponSheetData;

    const weaponProperties = ["types", "properties", "range", "grip", "damage"];
</script>

<div class="tw:w-full tw:box-border tw:bg-[#000000] tw:p-2 tw:text-black">
    <SheetBox class="tw:mt-2">
        <ItemHeader img={sheetData.img} name={sheetData.name} />

        <div class="tw:mb-4">
            <ItemProperties
                cost={sheetData.system.cost}
                slots={sheetData.system.slots}
            />
        </div>
        <h2 class="tw:mb-2 tw:text-lg tw:font-bold tw:text-black">Weapon Properties</h2>
        <Table items={weaponProperties}>
            {#snippet row(property)}
                {#if property === "types"}
                    <th scope="row" class="tw:w-1/4 tw:text-left">Types</th>
                    <td>
                        <div class="tw:flex tw:flex-wrap tw:gap-x-3 tw:gap-y-1">
                            {#each Object.values(HERO_SKILL) as skill}
                                <label
                                    class="tw:flex tw:items-center tw:gap-1 tw:text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        name="system.types"
                                        value={skill}
                                        checked={sheetData.system.types.includes(
                                            skill,
                                        )}
                                    />
                                    {skill}
                                </label>
                            {/each}
                        </div>
                    </td>
                {:else if property === "properties"}
                    <th scope="row" class="tw:text-left">Properties</th>
                    <td>
                        <div class="tw:flex tw:flex-wrap tw:gap-x-3 tw:gap-y-1">
                            {#each Object.values(WEAPON_PROPERTY) as property}
                                <label
                                    class="tw:flex tw:items-center tw:gap-1 tw:text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        name="system.properties"
                                        value={property}
                                        checked={sheetData.system.properties.includes(
                                            property,
                                        )}
                                    />
                                    {property}
                                </label>
                            {/each}
                        </div>
                    </td>
                {:else if property === "range"}
                    <th scope="row" class="tw:text-left">
                        <label for="weapon-range">Range</label>
                    </th>
                    <td>
                        <select
                            id="weapon-range"
                            name="system.range"
                            class="tw:w-full tw:text-xs"
                        >
                            {#each Object.values(WEAPON_RANGE) as range}
                                <option
                                    value={range}
                                    selected={sheetData.system.range === range}
                                    >{range}</option
                                >
                            {/each}
                        </select>
                    </td>
                {:else if property === "grip"}
                    <th scope="row" class="tw:text-left">
                        <label for="weapon-grip">Grip</label>
                    </th>
                    <td>
                        <select
                            id="weapon-grip"
                            name="system.grip"
                            class="tw:w-full tw:text-xs"
                        >
                            {#each Object.values(WEAPON_GRIP) as grip}
                                <option
                                    value={grip}
                                    selected={sheetData.system.grip === grip}
                                    >{grip}</option
                                >
                            {/each}
                        </select>
                    </td>
                {:else}
                    <th scope="row" class="tw:text-left">
                        <label for="weapon-damage">Damage</label>
                    </th>
                    <td>
                        <Input
                            name="system.damage"
                            value={sheetData.system.damage}
                            placeholder="Enter damage"
                        />
                    </td>
                {/if}
            {/snippet}
        </Table>
    </SheetBox>
</div>
