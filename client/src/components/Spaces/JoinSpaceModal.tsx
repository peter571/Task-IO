import React from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { JoinSpaceProp } from '../../types'

export default function JoinSpaceModal(props: JoinSpaceProp) {
  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <form className='div-container w-full py-4' action="onSubmit">
            <input placeholder='Enter Space id' className='form__input py-2' type="text" />
            <button className='btn'>
                Join space
            </button>
        </form>
    </ModalWrapper>
  )
}
