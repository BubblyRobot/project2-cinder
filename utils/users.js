// Connect to database here. 
const users = [];

// Join user to chat every user needs a unique id
function userJoin(id, username, room){
    const user = { id, username, room };

    users.push(user);

    return user; 
}

// get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leasves hat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index != -1){
        return users.splice(index, 1)[0];
    }
}


// Get room users
function getRoomUsers(){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};