import { User } from '@/payload-types';
import type { Access } from 'payload/types';

export const isAdminOrCreatedBy: Access<unknown, User> = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return { createdBy: { equals: user.id, } };
}