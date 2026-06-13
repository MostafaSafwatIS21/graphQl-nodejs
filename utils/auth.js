export const auth = (user) => {
  if (!user) throw new GraphQLError("Unauthorized, please log in");
};

export const isAuthor = async (authorId, user) => {
  return authorId === user.id;
};
