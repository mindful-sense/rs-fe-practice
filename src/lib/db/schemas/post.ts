import * as z from "zod";

const postBaseSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  lead: z.string().min(1),
  content: z
    .string()
    .transform((str) => JSON.parse(str))
    .pipe(
      z
        .strictObject({
          subtitle: z.string().min(1),
          paragraphs: z.string().min(1).array().min(1),
          list: z
            .strictObject({
              subtitle: z.string().min(1),
              content: z.string().min(1),
            })
            .array()
            .min(2)
            .optional(),
        })
        .array()
        .min(1),
    ),
  conclusion: z.string().min(1),
  published_at: z.iso.date(),
  image_preview: z.url({
    protocol: /^https$/,
    hostname: /^fastly.picsum.photos$/,
  }),
  image_lead: z.url({
    protocol: /^https$/,
    hostname: /^fastly.picsum.photos$/,
  }),
});

export const postSchema = postBaseSchema.transform((data) => ({
  postSlug: data.id,
  title: data.title,
  lead: data.lead,
  content: data.content,
  conclusion: data.conclusion,
  publishedAt: data.published_at,
  imagePreview: data.image_preview,
  imageLead: data.image_lead,
}));

export const postsSchema = z.array(
  postBaseSchema.transform((data) => ({
    postSlug: data.id,
    title: data.title,
    lead: data.lead,
    content: data.content,
    conclusion: data.conclusion,
    publishedAt: data.published_at,
    imagePreview: data.image_preview,
    imageLead: data.image_lead,
  })),
);

export type Post = z.infer<typeof postSchema>;
export type PostSlug = Post["postSlug"];
