import { H2 } from "@/components/ui";
import { getCurrentUser } from "@/features/auth/server";
import { PostEditForm } from "@/features/post/client";
import { getEditPost } from "@/features/post/server";
import { ROLES } from "@/lib/shared";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostEdit({ params }: Props) {
  const { slug } = await params;

  const user = await getCurrentUser();
  const isAdmin = user?.roleId === ROLES.ADMIN;
  const isModerator = user?.roleId === ROLES.MODERATOR;

  if (!isAdmin && !isModerator) {
    return (
      <p className="mt-12 text-center">
        You must be an admin or moderator to edit the post
      </p>
    );
  }

  const result = getEditPost(slug);
  if ("error" in result) {
    return <p className="mt-12 text-center">{result.error}</p>;
  }

  return (
    <>
      <H2>Post Editing</H2>
      <PostEditForm post={result.post} isAdmin={isAdmin} />
    </>
  );
}
