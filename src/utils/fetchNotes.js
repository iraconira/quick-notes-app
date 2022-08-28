const fetchNotes = async () => {
    try {
        const response = await fetch('/api/notes')
        const data = await response.json()
        return data.notes
    } catch (error) {
        return new Error(error)
    }
}

export default fetchNotes
