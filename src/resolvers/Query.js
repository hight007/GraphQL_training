const Query = {
  users(parent, args, ctx, info) {
    const { users } = ctx;
    return users;
  },
};

module.exports = Query;
