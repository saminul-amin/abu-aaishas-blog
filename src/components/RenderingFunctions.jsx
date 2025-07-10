import { ExternalLink } from "lucide-react";

// Utility function to render inline content with formatting
export const renderInlineContent = (text, language) => {
  if (!text) return text;

  // Handle links first [text](url) or just URLs
  let content = text;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace markdown links
  content = content.replace(linkRegex, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline inline-flex items-center gap-1">${linkText} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;
  });

  // Replace standalone URLs
  content = content.replace(urlRegex, (match, url) => {
    if (content.includes(`href="${url}"`)) return match; // Skip if already processed as markdown link
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline inline-flex items-center gap-1">${url} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;
  });

  // Handle bold text
  content = content.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Handle italic text
  content = content.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Handle inline code
  content = content.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

// Utility function to render markdown-like content
export const renderMarkdownContent = (content, language) => {
  if (!content) return [];

  // Process escape sequences first - handle both single and double escaping
  const processedContent = content
    .replace(/\\\\n/g, "\n") // Handle double-escaped newlines first
    .replace(/\\n/g, "\n") // Then single-escaped newlines
    .replace(/\\\\"/g, '"') // Handle double-escaped quotes first
    .replace(/\\"/g, '"') // Then single-escaped quotes
    .replace(/\\\\t/g, "\t") // Handle tabs if needed
    .replace(/\\t/g, "\t") // Single-escaped tabs
    .replace(/\\\\\\/g, "\\") // Handle triple-escaped backslashes
    .replace(/\\\\/g, "\\"); // Handle double-escaped backslashes

  // Split content into paragraphs
  const paragraphs = processedContent.split(/\n\s*\n/);

  return paragraphs
    .map((paragraph, index) => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return null;

      // Handle headers (##, ###, etc.)
      if (paragraph.match(/^#{1,6}\s/)) {
        const level = paragraph.match(/^#{1,6}/)[0].length;
        const text = paragraph.replace(/^#{1,6}\s/, "");
        const HeaderTag = `h${Math.min(level, 6)}`;

        return (
          <HeaderTag
            key={index}
            className={`font-bold text-gray-900 dark:text-white mt-8 mb-4 ${
              level === 1
                ? "text-3xl"
                : level === 2
                ? "text-2xl"
                : level === 3
                ? "text-xl"
                : "text-lg"
            } ${language === "bn" ? "font-[SolaimanLipi]" : ""}`}
          >
            {renderInlineContent(text, language)}
          </HeaderTag>
        );
      }

      // Handle bold text wrapped in ** **
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3
            key={index}
            className={`text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 ${
              language === "bn" ? "font-[SolaimanLipi]" : ""
            }`}
          >
            {paragraph.slice(2, -2)}
          </h3>
        );
      }

      // Handle bullet points
      if (paragraph.match(/^[\*\-\+]\s/)) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.trim() && line.match(/^[\*\-\+]\s/));

        if (items.length > 0) {
          return (
            <ul
              key={index}
              className={`list-disc list-inside space-y-2 my-4 ${
                language === "bn" ? "font-[SolaimanLipi]" : ""
              }`}
            >
              {items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {renderInlineContent(
                    item.replace(/^[\*\-\+]\s/, ""),
                    language
                  )}
                </li>
              ))}
            </ul>
          );
        }
      }

      // Handle numbered lists
      if (paragraph.match(/^\d+\.\s/)) {
        const items = paragraph
          .split("\n")
          .filter((line) => line.trim() && line.match(/^\d+\.\s/));

        if (items.length > 0) {
          return (
            <ol
              key={index}
              className={`list-decimal list-inside space-y-2 my-4 ${
                language === "bn" ? "font-[SolaimanLipi]" : ""
              }`}
            >
              {items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {renderInlineContent(item.replace(/^\d+\.\s/, ""), language)}
                </li>
              ))}
            </ol>
          );
        }
      }

      // Handle blockquotes
      if (paragraph.startsWith(">")) {
        const quoteText = paragraph.replace(/^>\s?/, "");
        return (
          <blockquote
            key={index}
            className={`border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-2 my-6 italic text-gray-600 dark:text-gray-400 ${
              language === "bn" ? "font-[SolaimanLipi]" : ""
            }`}
          >
            {renderInlineContent(quoteText, language)}
          </blockquote>
        );
      }

      // Handle code blocks
      if (paragraph.startsWith("```")) {
        const codeContent = paragraph
          .replace(/^```[\w]*\n?/, "")
          .replace(/\n?```$/, "");
        return (
          <pre
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4"
          >
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {codeContent}
            </code>
          </pre>
        );
      }

      // Regular paragraph - handle line breaks within paragraphs
      const lines = paragraph.split("\n");

      return (
        <p
          key={index}
          className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4 ${
            language === "bn" ? "font-[SolaimanLipi]" : ""
          }`}
        >
          {lines.map((line, lineIndex) => (
            <span key={lineIndex}>
              {line.trim() ? renderInlineContent(line, language) : null}
              {lineIndex < lines.length - 1 && line.trim() && <br />}
            </span>
          ))}
        </p>
      );
    })
    .filter(Boolean);
};
