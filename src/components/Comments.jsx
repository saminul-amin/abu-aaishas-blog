import { useState } from "react";
import { MessageCircle, Heart, User } from "lucide-react";
import useAxios from "../hooks/useAxios";

export default function Comments({
  post,
  comments,
  setComments,
  setPost,
  showComments,
  setShowComments,
}) {
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  if (!showComments) return null;

  return (
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
          />
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
  );
}
