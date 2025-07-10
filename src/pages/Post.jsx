import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowLeft,
  Heart,
  BookOpen,
  User,
  Share2,
  MessageCircle,
  ChevronRight,
  Clock,
  Eye,
  ExternalLink,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

// Utility function to render markdown-like content
const renderMarkdownContent = (content, language) => {
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

// Utility function to render inline content with formatting
const renderInlineContent = (text, language) => {
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

export default function Post() {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { slug } = useParams();

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      console.log(slug);
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch the main post
        const response = await useAxios.get(`/posts/${slug}`);
        setPost(response.data[0]);

        // Fetch related posts based on category
        if (response.data.category) {
          const relatedResponse = await useAxios.get(
            `/posts?category=${response.data.category}&limit=2&exclude=${response.data._id}`
          );
          setRelatedPosts(relatedResponse.data);
        }

        console.log(response.data[0]._id);
        // Fetch comments for this post
        const commentsResponse = await useAxios.get(
          `/posts/${response.data[0]._id}/comments`
        );
        setComments(commentsResponse.data);
      } catch (err) {
        setError("Failed to fetch post. Please try again later.");
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Update view count when post loads
  useEffect(() => {
    if (post?._id) {
      const updateViews = async () => {
        try {
          await useAxios.post(`/posts/${post._id}/view`);
        } catch (err) {
          console.error("Error updating view count:", err);
        }
      };

      updateViews();
    }
  }, [post?._id]);

  const handleNavigation = (path) => {
    // In a real app, you'd use React Router here
    window.location.href = path;
  };

  const handleLike = async () => {
    if (!post) return;

    try {
      await useAxios.post(`/posts/${post._id}/like`);

      // Update local state
      setPost((prevPost) => ({
        ...prevPost,
        engagement: {
          ...prevPost.engagement,
          likes: {
            ...prevPost.engagement.likes,
            count: isLiked
              ? prevPost.engagement.likes.count - 1
              : prevPost.engagement.likes.count + 1,
          },
        },
      }));

      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    setIsSubmittingComment(true);

    try {
      const response = await useAxios.post(`/posts/${post._id}/comments`, {
        content: newComment.trim(),
      });

      // Add new comment to the beginning of the comments array
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");

      // Update post comment count
      setPost((prevPost) => ({
        ...prevPost,
        engagement: {
          ...prevPost.engagement,
          comments: {
            ...prevPost.engagement.comments,
            count: prevPost.engagement.comments.count + 1,
          },
        },
      }));
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      await useAxios.post(`/comments/${commentId}/like`);

      // Update local comment state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(dateString);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => handleNavigation("/blog")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-8"></div>

            {/* Header skeleton */}
            <div className="mb-12">
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-24"></div>
              </div>
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
              <div className="flex gap-6 mb-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="flex gap-4 pb-6">
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-full w-24"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4 mb-12">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => handleNavigation("/blog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => handleNavigation("/all-posts")}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full ${
                post.language === "bn" ? "font-[SolaimanLipi]" : ""
              }`}
            >
              {post.category}
            </span>
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full ${
                  post.language === "bn" ? "font-[SolaimanLipi]" : ""
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight ${
              post.language === "bn" ? "font-[SolaimanLipi]" : ""
            }`}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span
                className={post.language === "bn" ? "font-[SolaimanLipi]" : ""}
              >
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />

              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {post.engagement.views} views
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                isLiked
                  ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{post.engagement.likes.count}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.engagement.comments.count}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div className="space-y-6">
            {post.contentType === "markdown"
              ? renderMarkdownContent(post.content, post.language)
              : post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3
                        key={index}
                        className={`text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 ${
                          post.language === "bn" ? "font-[SolaimanLipi]" : ""
                        }`}
                      >
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 ${
                        post.language === "bn" ? "font-[SolaimanLipi]" : ""
                      }`}
                    >
                      {renderInlineContent(paragraph, post.language)}
                    </p>
                  );
                })}
          </div>
        </article>

        {/* Comments Section */}
        {showComments && (
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3
              className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 ${
                post.language === "bn" ? "font-[SolaimanLipi]" : ""
              }`}
            >
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                    post.language === "bn" ? "font-[SolaimanLipi]" : ""
                  }`}
                  rows="3"
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    className={`px-6 py-2 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      post.language === "bn" ? "font-[SolaimanLipi]" : ""
                    }`}
                    disabled={!newComment.trim() || isSubmittingComment}
                  >
                    {isSubmittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p
                    className={`text-gray-600 dark:text-gray-400 ${
                      post.language === "bn" ? "font-[SolaimanLipi]" : ""
                    }`}
                  >
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4
                          className={`font-semibold text-gray-900 dark:text-white ${
                            post.language === "bn" ? "font-[SolaimanLipi]" : ""
                          }`}
                        >
                          {comment.author || "Anonymous"}
                        </h4>
                        <p
                          className={`text-sm text-gray-500 dark:text-gray-400 ${
                            post.language === "bn" ? "font-[SolaimanLipi]" : ""
                          }`}
                        >
                          {formatRelativeTime(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-gray-700 dark:text-gray-300 mb-3 ${
                        post.language === "bn" ? "font-[SolaimanLipi]" : ""
                      }`}
                    >
                      {comment.content}
                    </p>
                    <button
                      onClick={() => handleCommentLike(comment._id)}
                      className={`flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors ${
                        post.language === "bn" ? "font-[SolaimanLipi]" : ""
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{comment.likes || 0}</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3
              className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 ${
                post.language === "bn" ? "font-[SolaimanLipi]" : ""
              }`}
            >
              Related Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost._id}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleNavigation(`/blog/${relatedPost.slug}`)}
                >
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full mb-3 ${
                      relatedPost.language === "bn" ? "font-[SolaimanLipi]" : ""
                    }`}
                  >
                    {relatedPost.category}
                  </span>
                  <h4
                    className={`text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors ${
                      relatedPost.language === "bn" ? "font-[SolaimanLipi]" : ""
                    }`}
                  >
                    {relatedPost.title}
                  </h4>
                  <p
                    className={`text-gray-600 dark:text-gray-400 mb-4 ${
                      relatedPost.language === "bn" ? "font-[SolaimanLipi]" : ""
                    }`}
                  >
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm text-gray-500 dark:text-gray-400 ${
                        relatedPost.language === "bn"
                          ? "font-[SolaimanLipi]"
                          : ""
                      }`}
                    >
                      {relatedPost.readTime}
                    </span>
                    <div
                      className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors ${
                        relatedPost.language === "bn"
                          ? "font-[SolaimanLipi]"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-medium">Read more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
