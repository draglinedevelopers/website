import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";
import type { RichText as RichTextValue } from "@/data/projects";

/** Renders CMS rich text (bold, italic, links, lists) in the case study body style. */
export default function RichText({ value, className = "" }: { value: RichTextValue; className?: string }) {
  // Markdoc wraps documents in an <article>; render its children directly inside our own wrapper.
  const root = value.tree as { children?: RenderableTreeNode[] } | null;
  return (
    <div
      className={`flex flex-col gap-4 text-[16px] leading-[1.6] text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
    >
      {Markdoc.renderers.react(root?.children ?? [], React)}
    </div>
  );
}
