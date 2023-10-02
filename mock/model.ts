const users = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

const posts = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    userId: "0",
    date: new Date(1998, 9, 30).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    userId: "1",
    date: new Date(1998, 9, 30).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
];

export function getPosts() {
  return posts;
}

export function getUsers() {
  return users;
}
