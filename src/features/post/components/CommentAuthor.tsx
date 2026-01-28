import { type UserId } from "@/lib/shared";
import { getPublicUser } from "../lib/data";

const USERNAME_NOT_FOUND = "[deleted]";

export async function CommentAuthor({ authorId }: { authorId: UserId | null }) {
  const username = authorId
    ? (getPublicUser(authorId)?.login ?? USERNAME_NOT_FOUND)
    : USERNAME_NOT_FOUND;

  return <span className="text-sm">{username}</span>;
}
