<script lang="ts">
    import type { NonheroSheetData } from "./sheet";

    export let sheetData: NonheroSheetData;
</script>

<div class="nonhero-sheet">
    <h1>{sheetData.name}</h1>

    <section>
        <h2>Combat</h2>
        <p><strong>Threat Level:</strong> {sheetData.system.threatLevel}</p>
        <p><strong>HD:</strong> {sheetData.system.hd}</p>
        <p><strong>Zone:</strong> {sheetData.system.zone}</p>
        <p><strong>Morale:</strong> {sheetData.system.morale ?? "-"}</p>
    </section>

    <section>
        <h2>Identity</h2>
        <p><strong>Appearing:</strong> {sheetData.system.appearing}</p>
        <p><strong>Description:</strong> {sheetData.system.description || "-"}</p>
    </section>

    <section>
        <h2>Base Stats</h2>
        <p><strong>HP:</strong> {sheetData.system.hp.current} / {sheetData.system.hp.max}</p>
        <p><strong>Armor:</strong> {sheetData.system.armor}</p>
        <p><strong>Size:</strong> {sheetData.system.size}</p>
        <p><strong>Being Type:</strong> {sheetData.system.beingType}</p>
    </section>
</div>

<style>
    .nonhero-sheet {
        padding: 1rem;
    }

    section {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border: 1px solid #ccc;
    }

    h2 {
        margin-top: 0;
        font-size: 1.2rem;
    }

    p {
        margin: 0.5rem 0;
    }
</style>
