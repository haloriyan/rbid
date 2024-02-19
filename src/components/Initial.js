const Initial = (name) => {
    let names = name.split(' ');
    let toReturn = names[0][0];
    if (names.length > 1) {
        toReturn += names[names.length - 1][0];
    }
    return toReturn
}

export default Initial