import React from 'react'
import { mount } from 'enzyme'
import App from './app'

describe('App', () => {
  let app = mount(<App />)

  /// ///////// first I go to text just the element
  /// ///////// which are just gonna be rendered
  it('renders the component', () => {
    // console.log(app.debug())
  })

  it('renders the App title', () => {
    expect(app.find('h2').text()).toEqual('Note to Self')
  })

  it('renders the Clear Button', () => {
    expect(app.find('button').at(1).text()).toEqual('Clear Notes')
  })

  /// ///////// second, inside of the mounting og App, I make a group
  /// ///////// of all things inside of the form. Making a group keeps
  /// ///////// this cleaner for coverage
  describe('when rendering the form', () => {
    it('creates a Form component', () => {
      // when it is a component, we have to check if it exists
      expect(app.find('Form').exists()).toBe(true)
    })

    it('renders a FormControl component', () => {
      expect(app.find('FormControl').exists()).toBe(true)
    })

    it('renders a SubmitButton component', () => {
      expect(app.find('button').at(0).text()).toEqual('Submit')
    })
  })

  /// ///////// third, we test the behaviour of the component
  describe('when creating a note', () => {
    let testNote = 'test note'

    beforeEach(() => {
      app.find('FormControl').simulate('change', {
        target: { value: testNote }
      })
    })

    it('updates the text in state', () => {
      // console.log(app.state())
      expect(app.state().text).toEqual(testNote)
    })

    describe('and submitting a new note', () => {
      beforeEach(() => {
        app.find('button').at(0).simulate('click')
      })

      it('adds the new to state', () => {
        // console.log(app.state())
        expect(app.state().notes[0].text).toEqual(testNote)
      })

      describe('and clicking the clear button', () => {
        beforeEach(() => {
          app.find('button').at(1).simulate('click')
        })

        it('deletes all notes in state', () => {
          // console.log(app.state())
          expect(app.state().notes.length).toBe(0)
          // expect(app.state().notes).toEqual([])
          // this is valid too
        })
      })
    })
  })

  // end of component test
})
