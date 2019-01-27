import React from 'react'
import createClass from 'create-react-class'

import Alt from 'alt'

// Temporary monkey-patch for alt migration
React.createClass = createClass

const alt = new Alt()
export default alt

// Explicitly pass in the name so that it gets retained
// when minifying
export function store(name) {
    return cls => alt.createStore(cls, name)
}
