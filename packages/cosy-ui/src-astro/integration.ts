import { defineIntegration } from 'astro-integration-kit';

export const integration = defineIntegration({
  name: 'cosy-ui',
  setup() {
    return {
      hooks: {
        'astro:config:setup': ({ logger }) => {
          logger.info('cosy-ui integration setup');
        },
      },
    };
  },
});
