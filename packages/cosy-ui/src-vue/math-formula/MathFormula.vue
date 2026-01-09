<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { IMathFormulaProps, MathFormulaVariant } from "./types";

const props = withDefaults(defineProps<IMathFormulaProps>(), {
	variant: "gradient",
	symbolsCollapsed: true,
	class: "",
});

const showTooltip = ref(false);
const showDetails = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const baseClasses =
	"cosy:my-6 cosy:p-4 cosy:rounded-lg cosy:relative cosy:transition-all cosy:duration-300";

const variantClassMap: Record<MathFormulaVariant, string> = {
	default:
		"cosy:bg-base-200/80 cosy:border-l-2 cosy:border-accent cosy:rounded-r-lg cosy:shadow cosy:hover:shadow-lg",
	gradient:
		"cosy:bg-linear-to-br cosy:from-accent/10 cosy:via-base-200/80 cosy:to-primary/10 cosy:border cosy:border-accent/30 cosy:shadow-inner cosy:hover:border-accent/50 cosy:backdrop-blur-sm",
	glass:
		"cosy:bg-base-100/40 cosy:backdrop-blur-md cosy:border cosy:border-base-300/50 cosy:shadow-xl cosy:hover:bg-base-100/50",
	neon: "cosy:bg-base-200/50 cosy:border-2 cosy:border-accent cosy:shadow-[0_0_15px_rgba(var(--a),0.3)] cosy:hover:shadow-[0_0_25px_rgba(var(--a),0.5)] cosy:backdrop-blur-sm",
	card: "cosy:bg-base-100 cosy:border-2 cosy:border-l-8 cosy:border-accent cosy:shadow-lg cosy:hover:shadow-2xl cosy:hover:-translate-y-1",
	spotlight:
		"cosy:bg-base-200/80 cosy:border cosy:border-accent/20 cosy:shadow-lg cosy:hover:shadow-xl cosy:overflow-hidden",
};

const containerClass = computed(
	() => `${baseClasses} ${variantClassMap[props.variant]} ${props.class || ""}`.trim(),
);

const spotlightStyle = ref<Record<string, string>>({});

const handleMouseMove = (e: MouseEvent) => {
	if (props.variant !== "spotlight" || !containerRef.value) return;
	const rect = containerRef.value.getBoundingClientRect();
	const x = ((e.clientX - rect.left) / rect.width) * 100;
	const y = ((e.clientY - rect.top) / rect.height) * 100;
	spotlightStyle.value = { "--mouse-x": `${x}%`, "--mouse-y": `${y}%` } as Record<
		string,
		string
	>;
};

const handleClickOutside = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (!target.closest("[data-math-tooltip]")) {
		showTooltip.value = false;
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
	<div
		ref="containerRef"
		class="formula-container"
		:class="containerClass"
		:data-variant="variant"
		:style="spotlightStyle"
		@mousemove="handleMouseMove">
		<div v-if="variant === 'spotlight'" class="spotlight-effect cosy:absolute cosy:inset-0 cosy:pointer-events-none" />

		<div class="cosy:absolute cosy:top-2 cosy:right-2 cosy:z-10" data-math-tooltip>
			<button
				type="button"
				class="cosy:w-5 cosy:h-5 cosy:text-accent cosy:hover:text-accent-focus cosy:hover:scale-110 cosy:transition-all cosy:duration-200"
				@click.stop="showTooltip = !showTooltip">
				<span aria-hidden="true" class="cosy:inline-block cosy:w-4 cosy:h-4">ℹ️</span>
			</button>
			<div
				v-if="showTooltip"
				class="cosy:absolute cosy:top-6 cosy:right-0 cosy:w-64 cosy:p-3 cosy:bg-base-100 cosy:border cosy:border-base-300 cosy:rounded-lg cosy:shadow-xl cosy:z-20 cosy:text-sm cosy:animate-fade-in">
				<div class="cosy:flex cosy:items-start cosy:gap-2">
					<span class="cosy:w-4 cosy:h-4 cosy:text-accent cosy:mt-0.5 cosy:shrink-0">ℹ️</span>
					<div class="cosy:text-base-content">
						<p class="cosy:font-medium cosy:mb-1 not-prose">数学公式</p>
						<p class="cosy:text-xs cosy:leading-relaxed not-prose cosy:opacity-70">
							公式是数学中表达数量关系、结构规律的符号表达式，是解决数学问题的重要工具。
						</p>
					</div>
				</div>
				<div class="cosy:absolute cosy:-top-1 cosy:right-3 cosy:w-2 cosy:h-2 cosy:bg-base-100 cosy:border-l cosy:border-t cosy:border-base-300 cosy:transform cosy:rotate-45" />
			</div>
		</div>

		<div v-if="title || number" class="cosy:flex cosy:items-center cosy:mb-2 cosy:relative cosy:z-1">
			<span
				class="cosy:text-accent cosy:mr-2 cosy:text-lg"
				:class="variant === 'neon' ? 'cosy:drop-shadow-[0_0_8px_rgba(var(--a),0.8)]' : ''">
				fx
			</span>
			<span
				v-if="title"
				class="cosy:font-bold cosy:text-base-content"
				:class="variant === 'neon' ? 'cosy:drop-shadow-[0_0_4px_rgba(var(--a),0.3)]' : ''">
				{{ title }}
			</span>
			<span
				v-if="number"
				class="cosy:ml-2 cosy:text-xs cosy:text-base-content/70 cosy:px-2 cosy:py-0.5 cosy:rounded-full"
				:class="variant !== 'default' ? 'cosy:bg-accent/20' : 'cosy:bg-base-300'">
				公式{{ number }}
			</span>
		</div>

		<div class="cosy:overflow-x-auto cosy:text-lg cosy:text-base-content formula-block cosy:relative cosy:z-1">
			<slot />
		</div>

		<div
			v-if="$slots.desc"
			class="cosy:mt-2 cosy:text-sm cosy:text-base-content/70 cosy:border-t cosy:border-base-content/10 cosy:pt-2 cosy:relative cosy:z-1">
			<slot name="desc" />
		</div>

		<div
			v-if="$slots.symbols"
			class="cosy:mt-2 cosy:pt-3 cosy:border-t cosy:border-base-content/10 cosy:relative cosy:z-1"
			:class="variant === 'default' ? 'cosy:border-base-300' : 'cosy:border-accent/20'">
			<details class="group" :open="!symbolsCollapsed">
				<summary
					class="cosy:cursor-pointer cosy:text-sm cosy:font-medium cosy:flex cosy:items-center cosy:gap-1 cosy:transition-colors"
					:class="variant === 'neon' ? 'cosy:text-accent cosy:hover:text-accent cosy:drop-shadow-[0_0_4px_rgba(var(--a),0.5)]' : 'cosy:text-accent cosy:hover:text-accent-focus'">
					<span class="cosy:w-4 cosy:h-4 group-open:cosy:rotate-180 cosy:transition-transform cosy:duration-200">ℹ️</span>
					符号说明
				</summary>
				<div class="cosy:mt-2 cosy:text-sm cosy:text-base-content/70">
					<slot name="symbols" />
				</div>
			</details>
		</div>

		<div v-if="$slots.details" class="cosy:mt-2 cosy:border-t cosy:border-base-content/10 cosy:pt-2 cosy:relative cosy:z-1">
			<div class="cosy:flex cosy:justify-end">
				<button
					type="button"
					class="cosy:flex cosy:items-center cosy:gap-2 cosy:text-sm cosy:font-medium cosy:text-accent cosy:hover:text-accent-focus cosy:transition-colors cosy:duration-200"
					@click="showDetails = !showDetails">
					<span class="cosy:w-4 cosy:h-4 cosy:transition-transform cosy:duration-200" :class="showDetails ? 'cosy:rotate-180' : ''">⌄</span>
					<span class="cosy:w-4 cosy:h-4 cosy:transition-transform cosy:duration-200 cosy:hidden" />
				</button>
			</div>
			<div
				v-show="showDetails"
				class="cosy:mt-2 cosy:text-sm cosy:text-base-content/80 cosy:animate-fade-in">
				<slot name="details" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.formula-block {
	font-family: "KaTeX_Main", "Times New Roman", Times, serif;
	word-break: break-word;
}

.spotlight-effect {
	background: radial-gradient(
		circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
		rgba(var(--a), 0.15) 0%,
		transparent 50%
	);
	opacity: 0;
	transition: opacity 0.3s ease;
}

.formula-container:hover .spotlight-effect {
	opacity: 1;
}

@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fade-in 0.2s ease-out;
}
</style>

