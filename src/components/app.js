import React, { Component } from 'react'
import Note from './note'
import { Form, FormControl, Button } from 'react-bootstrap'
import {
  bake_cookie as bakeCookie,
  read_cookie as readCookie,
  delete_cookie as deleteCookie
} from 'sfcookies'

const cookieKey = 'NOTES'

class App extends Component {
  state = {
    text: '',
    notes: []
  }

  componentDidMount () {
    const notes = readCookie(cookieKey)
    this.setState({ notes })
  }

  submit = () => {
    const { notes, text } = this.state
    /* no mutating data
    notes.push({ text })
    this.setState({ notes })
    bakeCookie(cookieKey, this.state.notes)
    */
    // mutating data
    this.setState({ notes: [...notes, { text }] })
    bakeCookie(cookieKey, [...notes, { text }])
  }

  clear = () => {
    deleteCookie(cookieKey)
    this.setState({ notes: [] })
  }

  render () {
    return (
      <div>
        <h2>Note to Self</h2>
        <Form inline>
          <FormControl onChange={(event) => this.setState({ text: event.target.value })} />
          {' '}
          <Button onClick={() => this.submit()}>Submit</Button>
        </Form>
        {
          this.state.notes.map((note, index) => {
            return (
              <Note key={index} note={note} />
            )
          })
        }
        <hr />
        <button onClick={this.clear}>Clear Notes</button>
      </div>
    )
  }
}

export default App
