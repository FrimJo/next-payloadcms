import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  const users = data.docs

  return (
    <main>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}
