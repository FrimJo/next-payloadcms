import { isAdminOrCreatedBy } from '@/utils/payload/access-control';
import type { CollectionConfig } from 'payload/types';
import { Users } from './Users';

export const Events = {
  slug: 'events',
  versions: { drafts: { autosave: true } },
  admin: {
    useAsTitle: 'title',
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
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: Users.slug,
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.createdBy)
      },
    },
  ],
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
} satisfies CollectionConfig
