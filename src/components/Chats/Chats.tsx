import React from 'react'
import Chat from './Chat'
import pic from '../../assets/somepic.png'

export default function Chats() {
  return (
    <div className='gap-4'>
      <h1 className='font-bold'>Chats</h1>
      <div className='basis-1/4 flex flex-col gap-4'>
      <Chat profileImage={pic} userName={'Koecha'} previewText={'Hey Koecha'} />
      <Chat profileImage={pic} userName={'Koecha'} previewText={'Hey Koecha'} />
      <Chat profileImage={pic} userName={'Koecha'} previewText={'Hey Koecha'} />
      <Chat profileImage={pic} userName={'Koecha'} previewText={'Hey Koecha'} />
      <Chat profileImage={pic} userName={'Koecha'} previewText={'Hey Koecha'} />
    </div>
    </div>
  )
}
