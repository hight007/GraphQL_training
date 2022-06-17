const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    subscribe: async function* (_, { from }) {
      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        yield { countdown: i };
      }
    },
  },
  update: {
    subscribe: (parent, args, ctx, info) => {
        const { pubSub } = ctx;
      return pubSub.subscribe("update_user");
    },
    resolve: (payload) => payload,
  },
};

module.exports = Subscription;
