import configPromise from '@payload-config'
import { getPayload } from "payload"
import { EventsPageClient } from './page.client'

type EventPageProps =  { params: { id: string } }

export default async function EventPage(props: EventPageProps) {
  const payload = await getPayload({
    config: configPromise,
  })

  const event = await payload.findByID({
      collection: 'events',
      id: props.params.id,
      draft: false
  })

  return <EventsPageClient event={event}/>
}

export async function generateStaticParams() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
      collection: 'events',
      draft: false
  })

  return data.docs.map((event) => ({
    id: String(event.id),
  }))
}