import type { CollectionConfig } from 'payload/types'

export const Users = {
  slug: 'users',
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'firstName',
      type: 'text',
      required: true
    },
  ],
} satisfies CollectionConfig
