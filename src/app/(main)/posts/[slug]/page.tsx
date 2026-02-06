import Image from "next/image";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import { ChipInfo, H1, H3, Paragraph } from "@/components/ui";
import { getCurrentUser } from "@/features/auth/server";
import { CommentForm } from "@/features/comment/client";
import { CommentItem } from "@/features/comment/server";
import {
  PostDeleteButton,
  PostEditButton,
  getBlogPost,
  parseContent,
} from "@/features/post/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const result = getBlogPost(slug);

  if ("error" in result) {
    return <p className="mt-12 text-center">{result.error}</p>;
  }

  const { post, comments } = result;
  const postContent = parseContent(post.content);

  return (
    <main className="flex flex-col items-center gap-20 pt-20">
      <header className="flex flex-col items-center">
        <H1 className="mb-5">{post.h1}</H1>

        <div className="mb-24 flex gap-1 text-sm">
          <ChipInfo
            text={post.publishedAt}
            icon={faCalendar}
            iconstyles="-mt-0.5"
          />
          <PostEditButton postSlug={post.postSlug} roleId={user?.roleId} />
          <PostDeleteButton postSlug={post.postSlug} roleId={user?.roleId} />
        </div>

        <Image
          src={post.imageLead}
          alt={post.h1}
          width={1024}
          height={400}
          loading="eager"
          className="h-100 w-5xl rounded-4xl bg-neutral-100"
        />
      </header>

      <div className="flex w-full max-w-xl flex-col gap-10">
        <p className="text-2xl font-semibold">{post.lead}</p>

        {postContent.map(({ subtitle, paragraphs }, sectionId) => (
          <section key={sectionId} className="flex flex-col gap-6">
            {subtitle && <H3>{subtitle}</H3>}

            <div className="flex flex-col gap-3">
              {paragraphs.map((paragraph, paragraphId) => (
                <Paragraph key={paragraphId} text={paragraph} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="flex max-w-xl gap-4 text-xl">
        <strong className="font-semibold">Conclusion:</strong>
        <p>{post.conclusion}</p>
      </section>

      <section className="flex min-w-xl flex-col gap-10 pb-10">
        <h4 className="-mb-2 text-xl font-semibold">Comments</h4>

        <CommentForm postSlug={post.postSlug} />

        {comments.length ? (
          <ul className="flex max-w-xl flex-col gap-2">
            {comments.map((comment) => (
              <CommentItem
                key={comment.commentId}
                comment={comment}
                currentUserId={user?.userId}
                roleId={user?.roleId}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center">No comments yet</p>
        )}
      </section>
    </main>
  );
}
