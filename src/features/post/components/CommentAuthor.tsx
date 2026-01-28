import { type UserId, USERNAME_NOT_FOUND } from "@/lib/shared";
import { getPublicUser } from "../lib/data";

export function CommentAuthor({ authorId }: { authorId: UserId | null }) {
  const username = authorId
    ? (getPublicUser(authorId)?.login ?? USERNAME_NOT_FOUND)
    : USERNAME_NOT_FOUND;

  return (
    <span
      className={`text-sm ${username === USERNAME_NOT_FOUND ? "text-accent-disabled select-none" : ""}`}
    >
      {username}
    </span>
  );
}
