import {
  faCalendar,
  faFilePen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChipButton, ChipInfo, H2 } from "@/components/ui";
import { getErrorMessage, selectPostBySlug } from "@/lib/server";
import { type Post } from "@/lib/shared";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: Post | null = null;
  let message: string | null = null;

  try {
    post = selectPostBySlug(slug);
  } catch (error) {
    console.error(error);
    message = getErrorMessage(error);
  }

  if (!post) return <p className="text-center">{message}</p>;

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <article className="flex flex-col items-center pt-8">
      <header className="flex max-w-3xl flex-col items-center gap-5">
        <H2>{post.title}</H2>
        <div className="flex gap-1 text-sm">
          <ChipInfo
            text={formattedDate}
            icon={faCalendar}
            iconstyles="-mt-0.5"
            className="flex h-8 items-center gap-1 rounded-full border border-neutral-200 px-2.5"
          />
          <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
          <ChipButton intent="btnDanger" icon={faTrash} />
        </div>
      </header>
    </article>
  );
}
