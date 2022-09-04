import React from 'react'
import { SpaceProp } from '../../types'

export default function Space(props: SpaceProp) {
  return (
    <div className="flex flex-row align-middle gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200">
    <img
      className="h-12 w-12 rounded-[25%]"
      src={props.spaceImage}
      alt={props.spaceName}
      loading="lazy"
    />
    <div>
      <h1 className="font-semibold">{props.spaceName}</h1>
      <p className="font-light text-sm">{props.spaceId}</p>
    </div>
  </div>
  )
}
