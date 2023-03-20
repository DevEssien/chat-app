const users = []

exports.userJoin = (id, username, room ) => {
    const user = {
        id,
        username,
        room
    }
    users.push(user);
    return user
}

exports.getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}
