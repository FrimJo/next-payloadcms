'use client'

import { Event } from "@/payload-types"
import { useLivePreview } from "@payloadcms/live-preview-react"


type EventsPageClientProps = {event: Event}

export const EventsPageClientProps = (props: EventsPageClientProps) => {
  const  { data, isLoading } = useLivePreview({
    initialData: props,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL ?? '',
    depth: 1
  })
  console.log('EventsPageClientProps data', data)
  if(isLoading) return <div>Loading...</div>
  return (
    <main className="mx-auto container">
      <h1>{data.event.id}</h1>
      <div>{data.event.title}</div>
    </main>
  )
}