<script lang="ts">
    import type { HeroSystemData } from "@/module/actor/Hero/model";
    import KeyValueList from "@ui/components/KeyValueList.svelte";
    import HeroCombatPanelShell from "@ui/components/Actor/Hero/CombatPanel/HeroCombatPanelShell.svelte";
    import PipTrack from "@ui/components/PipTrack.svelte";
    import HeroCombatPanelSection from "@ui/components/Actor/Hero/CombatPanel/HeroCombatPanelSection.svelte";
    import FlexBox from "@ui/components/layout/FlexBox.svelte";
    import Button from "@/ui/components/control/Button.svelte";
    import Grid from "@/ui/components/layout/Grid.svelte";

    export let system: HeroSystemData;

    const toSigned = (value: number): string => {
        if (value > 0) return `+${value}`;
        return `${value}`;
    };

    const fatigueMax = 5;

    $: saveRows = [
        { label: "Reflex", value: toSigned(system.reflex) },
        { label: "Endure", value: toSigned(system.endure) },
        { label: "Will", value: toSigned(system.will) },
    ];

    $: speedRows = [
        { label: "Crawl", value: system.speed.crawl ?? 0 },
        { label: "Walk", value: system.speed.normal },
        { label: "Travel", value: system.speed.travel ?? 0 },
    ];
</script>

<HeroCombatPanelShell title="Combat">
    <HeroCombatPanelSection title="Hit Points">
        <span class="tw:mt-0.5 tw:text-xl tw:font-bold tw:leading-none"
            >{system.hp.current} / {system.hp.max}</span
        >
        <span
            class="edit tw:ml-2 fa fa-pencil tw:cursor-pointer"
            data-edit-target="hp"
        ></span>
    </HeroCombatPanelSection>
    <HeroCombatPanelSection title="Mana">
        <span class="tw:mt-0.5 tw:text-xl tw:font-bold tw:leading-none">
            {system.mana.current} / {system.mana.max}
        </span>
        <span
            class="edit tw:ml-2 fa fa-pencil tw:cursor-pointer"
            data-edit-target="mana"
        ></span>
    </HeroCombatPanelSection>

    <HeroCombatPanelSection title="Armor">
        <p class="tw:mt-0.5 tw:text-xl tw:font-bold tw:leading-none">
            {system.armor}
        </p>
    </HeroCombatPanelSection>

    <HeroCombatPanelSection title="Saves">
        <KeyValueList rows={saveRows} />
    </HeroCombatPanelSection>

    <HeroCombatPanelSection title="Fatigue">
        <PipTrack name="fatigue" value={system.fatigue} max={fatigueMax} />
    </HeroCombatPanelSection>

    <HeroCombatPanelSection title="Speed">
        <KeyValueList rows={speedRows} />
    </HeroCombatPanelSection>

    <HeroCombatPanelSection title="Luck" withBorder={false}>
        <Grid className="tw:grid-cols-3 tw:text-center tw:place-items-center">
            <div><Button
                className="incdec"
                data-incdec="-1"
                data-incdec-target="luckPool">-1</Button
            ></div>
            <p class="tw:text-4xl tw:font-bold tw:leading-none">
                {system.luckPool}
            </p>
            <div><Button
                className="incdec"
                data-incdec="+1"
                data-incdec-target="luckPool">+1</Button
            ></div>
        </Grid>
    </HeroCombatPanelSection>
</HeroCombatPanelShell>
