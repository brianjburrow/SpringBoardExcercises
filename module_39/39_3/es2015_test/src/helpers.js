function choice(items){
    const integer = Math.floor(Math.random() * items.length);
    console.log('int', integer)
    return items[integer];
}

function remove(items, item){
    const index = items.indexOf(item);
    if (index > -1) {
        items.splice(index, 1); // 2nd parameter means remove one item only
        return items
    }
    return undefined;
}

export {choice, remove}