export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: ReactionCounts;
}

export type NewPost = Omit<Post, "id" | "date" | "reactions">;
export type EditPost = Omit<Post, "userId" | "date" | "reactions">;

export type Reaction = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";
export type ReactionCounts = { [key in Reaction]: number };
export type ReactionEmoji = { [key in Reaction]: string };
