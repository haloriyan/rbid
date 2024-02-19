import Default from "./DEFAULT/Component";

const Templates = (wedding, guest = null) => {
    if (wedding.template.toUpperCase() === 'DEFAULT') {
        return <Default wedding={wedding} guest={guest} />
    }
}

export default Templates