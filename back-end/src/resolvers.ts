export const resolvers = {
  Query: {
    allPersonas: () => {
      return [{ id: 1, name: "John", description: "A sample persona" }];
    },
  },
  // ... other resolvers ...
};