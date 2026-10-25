<script lang="ts">
    export let value: number;
    export let name: string;
</script>

<input type="number" value={value} placeholder={`${value}`} name={name} />
