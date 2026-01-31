import Image from "next/image";
import {
  faCalendar,
  faFilePen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChipButton, ChipInfo, H1, Paragraph } from "@/components/ui";
import { getCurrentUser } from "@/features/auth/server";
import { CommentForm } from "@/features/post/client";
import { CommentAuthor, getPostBySlug } from "@/features/post/server";
import { getPassedTime, ROLES } from "@/lib/shared";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const result = getPostBySlug(slug);
  const isModerator =
    user?.roleId === ROLES.MODERATOR || user?.roleId === ROLES.ADMIN;

  if ("error" in result) {
    return <p className="mt-12 text-center">{result.error}</p>;
  }

  const { post, comments } = result;

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
          <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
          <ChipButton color="danger" icon={faTrash} />
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

        {post.content.map(({ h3, paragraphs }, index) => (
          <section key={index} className="flex flex-col gap-6">
            {h3 && <h3 className="text-2xl font-semibold">{h3}</h3>}

            <div className="flex flex-col gap-3">
              {paragraphs.map((text, index) => (
                <Paragraph key={index} text={text} />
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
            {comments
              .sort(
                (a, b) => Date.parse(b.commentedAt) - Date.parse(a.commentedAt),
              )
              .map(({ commentId, content, commentedAt, authorId }) => (
                <li
                  key={commentId}
                  className="bg-elembg relative flex flex-col gap-2 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CommentAuthor authorId={authorId} />
                      <span className="h-1 w-1 rounded-full bg-neutral-300" />
                      <time
                        dateTime={commentedAt}
                        className="text-sm text-neutral-300"
                      >
                        {getPassedTime(Date.parse(commentedAt))}
                      </time>
                    </div>

                    {(isModerator || user?.userId === authorId) && (
                      <ChipButton
                        size="md"
                        border="none"
                        rounded="semi"
                        color="danger"
                        icon={faTrash}
                      />
                    )}
                  </div>

                  <Paragraph text={content} />
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-center">No comments yet</p>
        )}
      </section>
    </main>
  );
}
