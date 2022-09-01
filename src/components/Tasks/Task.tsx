import React from 'react'

type Status = 'pending' | 'completed'

export interface TaskProp {
    title: string
    description: string
    status: Status
    dateline: string
}

export default function Task(props: TaskProp) {
  return (
    <div className='border p-2 rounded-md cursor-pointer hover:bg-gray-200'>
        <h1>Title: {props.title}</h1>
        <p>Description: {props.description}</p>
        <p>{props.status}</p>
        <p>To submit: {props.dateline}</p>
    </div>
  )
}
