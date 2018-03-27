import React from 'react'
import PropTypes from 'prop-types'

const Note = ({ note }) => {
  return (
    <div className="note">
      <p>{note.text}</p>
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.object
}

export default Note
