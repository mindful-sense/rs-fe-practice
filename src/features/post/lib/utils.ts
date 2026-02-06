import { randomUUID } from "crypto";
import { type PostContent } from "@/lib/shared";

interface ReturnParseContent {
  subtitle?: string;
  paragraphs: string[];
}

export const parseContent = (content: PostContent): ReturnParseContent[] =>
  content.split("#").map((rawSection, sectionId) => {
    const lines = rawSection
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (sectionId === 0) return { paragraphs: lines };

    const [subtitle, ...paragraphs] = lines;
    return { subtitle, paragraphs };
  });

export const slugify = (text: string) =>
  `${text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")}-${randomUUID().split("-")[0]}`;
