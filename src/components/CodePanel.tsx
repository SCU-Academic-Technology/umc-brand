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
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const activeItem = items.find((item) => item.id === "content-type-" + componentId);

  const getCleanHtml = (fullHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtml, "text/html");

    const wrapper = doc.body.firstElementChild;
    if (!wrapper) return fullHtml;

    const walker = document.createTreeWalker(
      wrapper,
      NodeFilter.SHOW_COMMENT,
      null
    );

    const commentsToRemove = [];
    while (walker.nextNode()) {
      commentsToRemove.push(walker.currentNode);
    }
    commentsToRemove.forEach(node => node.parentNode?.removeChild(node));

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


  // --- NEW: Copy Handler ---
  const handleCopy = async () => {
    if (!formattedHtml) return;
    try {
      await navigator.clipboard.writeText(formattedHtml);
      setIsCopied(true);

      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }

  return (
    <div className="relative group w-full h-full bg-[#2d2d2d] text-sm font-mono leading-relaxed">

      {/* COPY BUTTON */}
      <button
        onClick={handleCopy}
        className={`
          absolute top-4 right-4 z-10 
          flex items-center gap-2 px-3 py-1.5 
          rounded-md text-xs font-sans font-medium transition-all
          border border-white/10 bg-gray cursor-pointer
          ${isCopied
            ? "bg-black text-green-400 border-green-500/20"
            : "bg-black/70 text-gray-300 hover:bg-black hover:text-white"
          }
        `}
      >
        {isCopied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Code
          </>
        )}
      </button>

      <pre className="m-0 bg-transparent h-full p-4">
        <code ref={codeRef} className="language-html">
          {formattedHtml}
        </code>
      </pre>
    </div>
  );
}

export default CodePanel;
