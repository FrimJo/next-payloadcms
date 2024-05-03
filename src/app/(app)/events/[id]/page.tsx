import configPromise from '@payload-config'
import { getPayload } from "payload"
import { EventsPageClientProps } from './page.client'

type EventPageProps = {params: {id: string}}
export default async function EventPage(props: EventPageProps){
  const payload = await getPayload({
    config: configPromise,
  })

  const event = await payload.findByID({
      collection: 'events',
      id: props.params.id,
  })

  return <EventsPageClientProps event={event}/>
}

export async function generateStaticParams() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
      collection: 'events',
  })

  return data.docs.map((event) => ({
    id: String(event.id),
  }))
}