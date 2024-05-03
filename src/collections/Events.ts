import type { CollectionConfig } from 'payload/types';

export const Events = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    preview: (data, { locale }) => `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''}/events/${data.id}?locale=${locale}`,
    livePreview: {
      url:  ({data, locale}) => `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''}/events/${data.id}?locale=${locale}`
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
  ],
} satisfies CollectionConfig
