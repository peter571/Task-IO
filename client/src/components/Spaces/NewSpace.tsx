import React from 'react'
import { NewSpaceProp } from '../../types'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

export default function NewSpace(props: NewSpaceProp) {
  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <form className='div-container w-full py-4' action="onSubmit">
            <input placeholder='Enter company name...' className='form__input py-2' type="text" />
            <button className='btn'>
                Create
            </button>
        </form>
    </ModalWrapper>
  )
}
