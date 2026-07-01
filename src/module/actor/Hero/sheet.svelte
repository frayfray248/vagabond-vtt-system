<script lang="ts">
    import type { HeroSheetData } from "./sheet";
    export let sheetData: HeroSheetData;
</script>

<div class="hero-sheet">
    <h1>{sheetData.name}</h1>

    <section>
        <h2>Basic Info</h2>
        <p><strong>Level:</strong> {sheetData.system.level}</p>
        <p><strong>XP:</strong> {sheetData.system.xp}</p>
    </section>

    <section>
        <h2>Health & Resources</h2>
        <p><strong>HP:</strong> {sheetData.system.hp.current} / {sheetData.system.hp.max}</p>
        <p><strong>Mana:</strong> {sheetData.system.mana.current} / {sheetData.system.mana.max}</p>
        <p><strong>Fatigue:</strong> {sheetData.system.fatigue} / 5</p>
        <p><strong>Luck Pool:</strong> {sheetData.system.luckPool}</p>
    </section>

    <section>
        <h2>Defenses</h2>
        <p><strong>Endure:</strong> {sheetData.system.endure}</p>
        <p><strong>Reflex:</strong> {sheetData.system.reflex}</p>
        <p><strong>Will:</strong> {sheetData.system.will}</p>
        <p><strong>Armor:</strong> {sheetData.system.armor}</p>
    </section>

    <section>
        <h2>Stats</h2>
        <ul>
            {#each Object.entries(sheetData.system.stats) as [stat, value]}
                <li><strong>{stat}:</strong> {value}</li>
            {/each}
        </ul>
    </section>

    <section>
        <h2>Skills</h2>
        <ul>
            {#each Object.entries(sheetData.system.skills) as [skill, value]}
                <li><strong>{skill}:</strong> {value}</li>
            {/each}
        </ul>
    </section>

    <section>
        <h2>Speed</h2>
        <p><strong>Normal:</strong> {sheetData.system.speed.normal}'</p>
        <p><strong>Crawl:</strong> {sheetData.system.speed.crawl}'</p>
        <p><strong>Travel:</strong> {sheetData.system.speed.travel} mi</p>
        {#if sheetData.system.speed.swim}
            <p><strong>Swim:</strong> {sheetData.system.speed.swim}'</p>
        {/if}
        {#if sheetData.system.speed.fly}
            <p><strong>Fly:</strong> {sheetData.system.speed.fly}'</p>
        {/if}
    </section>

    <section>
        <h2>Other</h2>
        <p><strong>Size:</strong> {sheetData.system.size}</p>
        <p><strong>Being Type:</strong> {sheetData.system.beingType}</p>
        <p><strong>Max Slots:</strong> {sheetData.system.maxSlots}</p>
        <p><strong>Casting Max:</strong> {sheetData.system.castingMax}</p>
        {#if sheetData.system.senses && sheetData.system.senses.length > 0}
            <p><strong>Senses:</strong> {sheetData.system.senses.join(', ')}</p>
        {/if}
        {#if sheetData.system.immune}
            <p><strong>Immune:</strong> {sheetData.system.immune}</p>
        {/if}
        {#if sheetData.system.weak}
            <p><strong>Weak:</strong> {sheetData.system.weak}</p>
        {/if}
        {#if sheetData.system.statuses && sheetData.system.statuses.length > 0}
            <p><strong>Statuses:</strong> {sheetData.system.statuses.join(', ')}</p>
        {/if}
    </section>
</div>

<style>
    .hero-sheet {
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

    ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    li {
        padding: 0.25rem 0;
    }

    p {
        margin: 0.5rem 0;
    }
</style>
