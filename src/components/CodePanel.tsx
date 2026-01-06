import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-markup";

// prettier 
import { format } from "prettier/standalone";
import * as parserHtml from "prettier/plugins/html";
import * as parserBabel from "prettier/plugins/babel";

interface ContentType {
  id: string;
  html: string;
}

function CodePanel({ items }: { items: ContentType[] }) {
  const { componentId } = useParams<{ componentId: string }>();
  const [formattedHtml, setFormattedHtml] = useState("");
  const codeRef = useRef<HTMLElement>(null);

  const activeItem = items.find((item) => item.id === "content-type-" + componentId);

  const getCleanHtml = (fullHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtml, "text/html");

    // 1. Get the wrapper div (e.g. <div id="content-type-1">)
    const wrapper = doc.body.firstElementChild;
    if (!wrapper) return fullHtml;

    // 2. Remove Comments using a TreeWalker
    // This efficiently finds all 'comment' nodes inside the wrapper
    const walker = document.createTreeWalker(
      wrapper,
      NodeFilter.SHOW_COMMENT,
      null
    );

    // We must collect them first, then delete (to avoid modifying the tree while walking)
    const commentsToRemove = [];
    while (walker.nextNode()) {
      commentsToRemove.push(walker.currentNode);
    }

    // Delete them
    commentsToRemove.forEach(node => node.parentNode?.removeChild(node));

    // 3. Return the clean inner HTML
    return wrapper.innerHTML;
  };

  const rawHtml = activeItem ? getCleanHtml(activeItem.html) : "";

  // Format with Prettier (Async)
  useEffect(() => {
    async function beautify() {
      try {
        const result = await format(rawHtml, {
          parser: "html",
          plugins: [parserHtml, parserBabel],
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
        });
        setFormattedHtml(result);
      } catch (e) {
        console.error("Formatting failed", e);
        setFormattedHtml(rawHtml);
      }
    }

    beautify();
  }, [rawHtml]);

  useEffect(() => {
    if (codeRef.current && formattedHtml) {
      Prism.highlightElement(codeRef.current);
    }
  }, [formattedHtml]);

  return (
    <div className="w-full h-full bg-[#2d2d2d] overflow-auto text-sm font-mono leading-relaxed">
      <pre className="m-0 bg-transparent h-full p-4">
        <code ref={codeRef} className="language-html">
          {formattedHtml}
        </code>
      </pre>
    </div>
  );
}

export default CodePanel;
