import React from 'react'
import { mount } from 'enzyme'
import App from './app'

let wrapper

describe('App', () => {
  beforeEach(() => {
    wrapper = mount(<App />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the component', () => {
    console.log(wrapper.debug())
    // first I go to text just the element which are just gonna be rendered
  })

  it('renders the App title', () => {
    expect(wrapper.find('h2').text()).toEqual('Note to Self')
  })

  it('renders the Clear Button', () => {
    expect(wrapper.find('button').at(1).text()).toEqual('Clear Notes')
  })

  /*
  second, inside of the mounting on App, I make a group of all things inside of
  the form. Making a group keeps this cleaner for coverage
  */
  describe('when rendering the form', () => {
    it('creates a Form component', () => {
      // when it is a component, we have to check if it exists
      expect(wrapper.find('Form').exists()).toBe(true)
    })

    it('renders a FormControl component', () => {
      expect(wrapper.find('FormControl').exists()).toBe(true)
    })

    it('renders a SubmitButton component', () => {
      expect(wrapper.find('button').at(0).text()).toEqual('Submit')
    })
  })

  // third, we test the behaviour of the component
  // we are going to create a note and write in the state
  describe('when creating a note', () => {
    let testNote = 'test note'

    beforeEach(() => {
      wrapper.find('FormControl').simulate('change', {
        target: { value: testNote }
      })
      wrapper.update()
    })

    it('updates the text in state', () => {
      expect(wrapper.state().text).toEqual(testNote)
    })

    // then we have to submit the note
    describe('and subitting the new note', () => {
      beforeEach(() => {
        wrapper.find('button').at(0).simulate('click')
        wrapper.update()
      })

      afterEach(() => {
        wrapper.find('button').at(1).simulate('click')
      }) // this is just to reset the component

      it('adds the new to state', () => {
        expect(wrapper.state().notes[0].text).toEqual(testNote)
      })

      /*
      just when we send a new note, we re-mount the
      the component to write in the localstore
      we mount the component in a second vairable to test it
      */
      describe('and remounting the component', () => {
        let wrapper2
        /*
        we make a new variable to mount the component to make the
        simulation as we were mounting the component
        */
        beforeEach(() => {
          wrapper2 = mount(<App />)
        })

        afterEach(() => {
          wrapper2.unmount()
        })

        it('reads the stored note cookie', () => {
          expect(wrapper2.state().notes).toEqual([{ text: testNote }])
        })
      })

      // third, we can click on the Clear Button
      describe('and clicking the clear button', () => {
        beforeEach(() => {
          wrapper.find('button').at(1).simulate('click')
          wrapper.update()
        })

        it('clear the notes in the state', () => {
          expect(wrapper.state().notes).toEqual([])
        })
      })
    })
  })
  // end of component test
})
