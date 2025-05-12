<template>
  <BannerBox :background-class-index="backgroundClassIndex">
    <div
      class="py-16 px-8 text-center w-full rounded-2xl"
      data-type="smart-banner"
    >
      <h2 class="text-4xl mb-4">
        {{ banner.getTitle(lang) }}
      </h2>

      <p
        v-if="banner.getDescription(lang).length > 0"
        class="text-lg text-center max-w-2xl mx-auto"
      >
        {{ banner.getDescription(lang) }}
      </p>

      <div class="flex flex-row justify-center gap-8 mx-auto w-full mt-24">
        <FeatureCard
          v-for="feature in banner.getFeatures()"
          :key="feature.getTitle(lang)"
          :emoji="feature.emoji"
          :title="feature.getTitle(lang)"
          :link="feature.link"
        />
      </div>

      <div class="mt-12">
        <component
          :is="banner.getComponent()"
          v-if="banner.getComponent()"
          v-bind="banner.getComponentProps()"
        />
      </div>
    </div>
  </BannerBox>
</template>

<script setup lang="ts">
import Banner from '../../models/Banner';
import BannerBox from './BannerBox.vue';
import FeatureCard from './FeatureCard.vue';

defineProps({
    lang: {
        type: String,
        default: 'en',
        validator: (value: string) => ['en', 'zh-cn'].includes(value)
    },
    banner: {
        type: Banner,
        required: true
    },
    backgroundClassIndex: {
        type: Number,
        default: 0
    }
})
</script>