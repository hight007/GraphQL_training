const { v4: uuidv4 } = require("uuid");
const { GraphQLYogaError } = require("@graphql-yoga/node");

const Mutation = {
  addUser(parent, args, ctx, info) {
    const { name, age } = args;
    const { users } = ctx;

    users.push({
      id: uuidv4(),
      name,
      age,
    });

    return users;
  },
  
  updateUser(parent, args, ctx, info) {
    const { id, name, age } = args;
    const { users } = ctx;

    const user = users.find((user) => user.id == id);

    if (!user) {
      throw new GraphQLYogaError(`User with id ${id} does not exist`);
    }
    if (name) {
      user.name = name;
    }
    if (age) {
      user.age = age;
    }

    pubSub.publish("update_user", user);

    return user;
  },

  deleteUser(parent, args, ctx, info) {
    const { id } = args;
    const { users } = ctx;

    const index = users.findIndex((user) => user.id == id);

    if (index === -1) {
      throw new GraphQLYogaError(`User with id ${id} does not exist`);
    } else {
      const deletedUser = users.splice(index, 1);
      return deletedUser[0];
    }
  },
};

module.exports = Mutation;
