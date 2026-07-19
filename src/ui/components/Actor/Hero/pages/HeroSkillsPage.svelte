<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import Checkbox from "@/ui/components/form/Checkbox.svelte";
    import { HERO_SKILL_KEY_STAT_MAP } from "@/module/actor/Hero/model";
    import FlexBox from "@/ui/components/layout/FlexBox.svelte";

    export let sheetData: HeroSheetData;

    const skills = Object.entries(sheetData.system.skills).map(
        ([name, field]) => ({
            name,
            value: field.value,
            trained: field.trained,
        }),
    );

</script>

<table class="tw:table-auto w-full">
    <tbody>
        {#each skills as skill}
            <tr>
                <td class="tw:w-px tw:px-2">
                    <FlexBox
                        justify="center"
                        items="center"
                        className="tw:border tw:px-1 tw:rounded-md tw:border-[#b0b0b0]"
                    >
                        T
                        <Checkbox
                            name={`system.skills.${skill.name}.trained`}
                            checked={skill.trained}
                        />
                    </FlexBox>
                </td>
                <td class="tw:w-px tw:px-2 tw:font-bold">{skill.value}</td>
                <td class="">
                    {game!.i18n!.localize(
                        `VAGABOND.Skills.${skill.name.capitalize()}.Long`,
                    )}
                    <span class="tw:text-[#b0b0b0]"
                        >[
                        {game!.i18n!.localize(
                            `VAGABOND.Stats.${HERO_SKILL_KEY_STAT_MAP[skill.name as keyof typeof HERO_SKILL_KEY_STAT_MAP].capitalize()}.Short`,
                        )}
                        ]</span
                    >
                </td>
                <td>
                    <div
                        class="rollable fas fa-dice tw:text-red-500 tw:cursor-pointer" data-roll-label={`Hindered ${game!.i18n!.localize(
                        `VAGABOND.Skills.${skill.name.capitalize()}.Long`)} check`} data-roll-formula="1d20-1d6" data-roll-target={skill.value}
                    ></div>
                    <div
                        class="rollable fas fa-dice tw:cursor-pointer" data-roll-label={`${game!.i18n!.localize(
                        `VAGABOND.Skills.${skill.name.capitalize()}.Long`)} check`} data-roll-formula="1d20" data-roll-target={skill.value}
                    ></div>
                    <div
                        class="rollable fas fa-dice tw:text-green-500 tw:cursor-pointer" data-roll-label={`Favoured ${game!.i18n!.localize(
                        `VAGABOND.Skills.${skill.name.capitalize()}.Long`)} check`} data-roll-formula="1d20+1d6" data-roll-target={skill.value}
                    ></div>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
