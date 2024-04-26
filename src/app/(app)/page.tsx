import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  const [firstUser] = data.docs
  return (
    <main>
      {firstUser?.firstName}
      <pre>{JSON.stringify(firstUser, null, 2)}</pre>
    </main>
  );
}
