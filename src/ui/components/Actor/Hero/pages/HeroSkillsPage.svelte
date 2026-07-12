<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";

    export let sheetData: HeroSheetData;

    const skills = Object.entries(sheetData.system.skills).map(([name, value]) => ({ name, value }));

</script>

<div>
    {#each skills as skill, index}
        <p>{game!.i18n!.localize(`VAGABOND.Skills.${skill.name.capitalize()}.Long`)}: {skill.value}</p>
    {/each}
</div>