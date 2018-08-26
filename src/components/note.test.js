import React from 'react'
import { mount } from 'enzyme'
import Note from './note'

let wrapped
// we define an global variable to containt element to mount

beforeEach(() => {
  wrapped = mount(<Note note={{ text: 'test note' }} />)
  /*
    Another way to do this is, using destructuring:

    const props = { note: { text: 'test note' } }
    wrapped = mount(<Note {...props} />)
  */
})

afterEach(() => {
  wrapped = mount(<Note note={{ text: 'test note' }} />)
})

describe('Note', () => {
  /*
    why { text: 'test note' } => we have to find text as a Jquery selector
    and this is the way woth Enzyme to define it.
  */

  it('renders the note text', () => {
    // console.log(note.debug())  => log the component to show it on console
    expect(wrapped.find('p').text()).toEqual('test note')
  })
})
