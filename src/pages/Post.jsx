import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowLeft,
  Heart,
  BookOpen,
  User,
  Share2,
  MessageCircle,
  Clock,
  Eye,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import {
  renderInlineContent,
  renderMarkdownContent,
} from "../components/RenderingFunctions";
import Comments from "../components/Comments";
import RelatedPosts from "../components/RelatedPosts";
import useAuth from "../hooks/useAuth";

export default function Post() {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingComment, setPendingComment] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check for pending comment after login
  useEffect(() => {
    if (user?.email && post?._id) {
      const storedComment = localStorage.getItem("pendingComment");
      const storedPostId = localStorage.getItem("pendingCommentPostId");

      if (storedComment && storedPostId === post._id) {
        setPendingComment(storedComment);
        setShowComments(true);
        // Clear the stored comment
        localStorage.removeItem("pendingComment");
        localStorage.removeItem("pendingCommentPostId");
      }
    }
  }, [user, post]);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
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
    navigate(`${path}`);
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
              onClick={() => handleNavigation("/all-posts")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
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

        {/* Action Buttons - After Content */}
        <div className="flex flex-wrap items-center gap-4 py-6 border-t border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
              isLiked
                ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="font-semibold">{post.engagement.likes.count}</span>
            <span className="hidden sm:inline">
              {post.engagement.likes.count === 1 ? "Like" : "Likes"}
            </span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">
              {comments.length}
            </span>
            <span className="hidden sm:inline">
              {post.engagement.comments.count === 1 ? "Comment" : "Comments"}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all cursor-pointer ml-auto"
          >
            <ArrowLeft className="w-5 h-5 rotate-90" />
            <span>Top</span>
          </button>
        </div>

        <Comments
          post={post}
          comments={comments}
          setComments={setComments}
          setPost={setPost}
          showComments={showComments}
          setShowComments={setShowComments}
          pendingComment={pendingComment}
          setPendingComment={setPendingComment}
        />

        <RelatedPosts
          relatedPosts={relatedPosts}
          post={post}
          handleNavigation={handleNavigation}
        />
      </div>
    </div>
  );
}
