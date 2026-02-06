import * as z from "zod";

export const postSlugRule = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const picsumUrl = z.url({ protocol: /^https$/, hostname: /^picsum.photos$/ });

export const postSchema = z.strictObject({
  postSlug: postSlugRule,
  h1: z.string().trim().min(1, { error: "Can't be empty" }),
  lead: z.string().trim().min(1, { error: "Can't be empty" }),
  content: z.string().trim().min(1, { error: "Can't be empty" }),
  conclusion: z.string().trim().min(1, { error: "Can't be empty" }),
  publishedAt: z.iso.date().transform((isoDate) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(isoDate)),
  ),
  imagePreview: picsumUrl,
  imageLead: picsumUrl,
});

export type Post = z.infer<typeof postSchema>;
export type PostSlug = Post["postSlug"];
export type PostContent = Post["content"];
