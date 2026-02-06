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
