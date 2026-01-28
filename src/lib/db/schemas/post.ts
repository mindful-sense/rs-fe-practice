import "server-only";
import * as z from "zod";
import { getErrorMessage } from "@/lib/utils.server";

const jsonCodec = <T extends z.ZodType>(schema: T) =>
  z.codec(z.string(), schema, {
    decode: (jsonString, ctx) => {
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        ctx.issues.push({
          code: "invalid_format",
          format: "json",
          input: jsonString,
          message: getErrorMessage(error),
        });
        return z.NEVER;
      }
    },
    encode: (value) => JSON.stringify(value),
  });

const slugRule = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const picsumUrl = z.url({ protocol: /^https$/, hostname: /^picsum.photos$/ });

const contentSchema = z
  .strictObject({
    h3: z.string().min(1).optional(),
    paragraphs: z.string().min(1).array().min(1),
  })
  .array()
  .min(1);

export const postSchema = z.strictObject({
  postSlug: slugRule,
  h1: z.string().min(1),
  lead: z.string().min(1),
  content: z
    .string()
    .transform((jsonString) => jsonCodec(contentSchema).decode(jsonString)),
  conclusion: z.string().min(1),
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

export const postsSchema = z.array(postSchema);

export const commentsSchema = z
  .strictObject({
    commentId: z.uuid(),
    content: z.string().min(1),
    authorId: z.uuid().nullable(),
    postSlug: slugRule,
  })
  .array();

export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentsSchema.element>;
export type PostSlug = Post["postSlug"];
