import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // Overrides for Starlight's own UI strings, one JSON file per language in src/content/i18n.
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
