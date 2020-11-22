let users = require('../mocks/users');

module.exports = {
  listUsers: (request, response) => {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById: (request, response) => {
    const { id } = request.params;

    const user = users.find(user => user.id === +id);

    if (!user) {
      return response.send(400, { error: 'User not found' });
    }

    response.send(200, user);
  },

  createUser: (request, response) => {
    const { name } = request.body;

    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name,
    }

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUser: (request, response) => {
    const id = Number(request.params.id);
    const { name } = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return response.send(400, { error: 'User not found' });
    }

    users[userIndex] = { id, name };

    return response.send(200, { id, name });
  },

  deleteUser: (request, response) => {
    const id = Number(request.params.id);

    const usersExists = users.find(user => user.id === id);

    if (!usersExists) {
      return response.send(400, { error: 'User not found' });
    }

    users = users.filter(user => user.id !== id);

    return response.send(200);
  },
}
