'use client'

import { Event } from "@/payload-types"
import { useLivePreview } from "@payloadcms/live-preview-react"

type EventsPageClientProps = { event: Event }

export const EventsPageClient = (props: EventsPageClientProps) => {
  const  { data: event, isLoading } = useLivePreview({
    initialData: props.event,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''
  })

  if(event) return (
    <main className="mx-auto container">
      <h1>{ event.id }</h1>
      <div>{ event.title }</div>
    </main>
  )
  if(isLoading) return <div>Loading...</div>
  throw new Error('Event not found')
}