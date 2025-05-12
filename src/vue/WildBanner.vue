<template>
  <div class="w-full px-8 z-50 mx-auto">
    <div
      class="mt-0 hero p-4 rounded-2xl bg-base-300/50 dark:bg-base-200/50 backdrop-blur-xl hover:shadow-2xl transform duration-100"
    >
      <div class="text-center hero-content">
        <div class="max-w-md flex flex-row justify-center items-center mx-auto">
          <p class="text-2xl md:text-3xl font-bold text-base-content">
            <slot />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>