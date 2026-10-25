<script lang="ts">
    export let className: string = "";
</script>

<div class={`tw:grid ${className}`}>
	<slot />
</div>
