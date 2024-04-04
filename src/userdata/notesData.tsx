export type Note = {
    id: number,
    title: string,
    content: string | typeof Image,
    colour: string,
}

const notesData = {
    first: {
        id: 1,
        title: "First Note",
        content: "This is a test note.",
        colour: 'dark-green',
    }
};

export default notesData;