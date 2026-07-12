<script lang="ts">
    import type { HeroSheetData } from "@/module/actor/Hero/sheet";

    export let sheetData: HeroSheetData;
</script>

<div>
    <p>Max Mana: {sheetData.system.mana.max}</p>
    <p>Casting Max: {sheetData.system.castingMax}</p>
    <p>Max Slots: {sheetData.system.maxSlots}</p>
</div>
