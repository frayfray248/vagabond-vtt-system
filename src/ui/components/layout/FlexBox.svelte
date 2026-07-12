<script lang="ts">

	export let direction: "row" | "row-reverse" | "col" | "col-reverse" = "row";
	export let gap: "0" | "1" | "2" | "3" | "4" | "6" | "8" = "2";
	export let justify: "start" | "center" | "end" | "between" | "around" | "evenly" = "start";
	export let items: "start" | "center" | "end" | "baseline" | "stretch" = "stretch";
    export let className: string = "";
</script>

<div
	class="tw:flex {className}"
	class:tw:flex-row={direction === "row"}
	class:tw:flex-row-reverse={direction === "row-reverse"}
	class:tw:flex-col={direction === "col"}
	class:tw:flex-col-reverse={direction === "col-reverse"}
	class:tw:gap-0={gap === "0"}
	class:tw:gap-1={gap === "1"}
	class:tw:gap-2={gap === "2"}
	class:tw:gap-3={gap === "3"}
	class:tw:gap-4={gap === "4"}
	class:tw:gap-6={gap === "6"}
	class:tw:gap-8={gap === "8"}
	class:tw:justify-start={justify === "start"}
	class:tw:justify-center={justify === "center"}
	class:tw:justify-end={justify === "end"}
	class:tw:justify-between={justify === "between"}
	class:tw:justify-around={justify === "around"}
	class:tw:justify-evenly={justify === "evenly"}
	class:tw:items-start={items === "start"}
	class:tw:items-center={items === "center"}
	class:tw:items-end={items === "end"}
	class:tw:items-baseline={items === "baseline"}
	class:tw:items-stretch={items === "stretch"}
>
	<slot />
</div>
