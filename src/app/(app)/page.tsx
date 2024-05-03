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
    <main className="mx-auto container">
      <div>First name: {firstUser?.firstName}</div>
      <div>Email: {firstUser?.email}</div>
    </main>
  )
}
