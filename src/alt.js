import Alt from 'alt';

const alt = new Alt()
export default alt

// Explicitly pass in the name so that it gets retained
// when minifying
export function store(name) {
    return cls => alt.createStore(cls, name)
}
