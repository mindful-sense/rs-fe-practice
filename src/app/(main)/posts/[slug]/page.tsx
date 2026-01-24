// import Image from "next/image";
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
    <main className="flex flex-col items-center pt-8">
      <header className="flex flex-col items-center">
        <H2 className="mb-5 max-w-3xl">{post.title}</H2>

        <div className="mb-12 flex gap-1 text-sm">
          <ChipInfo
            text={formattedDate}
            icon={faCalendar}
            iconstyles="-mt-0.5"
          />
          <ChipButton icon={faFilePen} iconstyles="-mr-0.5" />
          <ChipButton color="danger" icon={faTrash} />
        </div>

        <div className="h-100 w-5xl rounded-4xl bg-neutral-100" />
      </header>
    </main>
  );
}
