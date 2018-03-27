import React from 'react'
import { mount } from 'enzyme'
import Note from './note'

// const props = { note: { text: 'test note' } }
// using destructuring, we can write the component like this:
// let note = mount(<Note {...props} />)

describe('Note', () => {
  let note = mount(<Note note={{ text: 'test note' }} />)
  // first, we mount the component with the props that
  // you need to pass to the component

  // if you want to render the mounted component in the
  // test enviroment, you have to call console and debug it
  it('renders the note text', () => {
    // console.log(note.debug())
    expect(note.find('p').text()).toEqual('test note')
  })
})
