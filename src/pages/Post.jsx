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
} from "lucide-react";

// Sample posts data (in a real app, this would come from an API or database)
const allPosts = [
  {
    id: 1,
    title: "Reflections on Faith and Simplicity",
    excerpt:
      "In our modern world filled with constant distractions and endless pursuits, there's something profoundly beautiful about choosing simplicity.",
    content: `Living simply doesn't mean living poorly or without joy. Rather, it means being deliberate about what we allow into our lives and hearts. When we strip away the unnecessary, we create space for what truly matters: our relationship with Allah, meaningful connections with others, and personal growth that aligns with our values.

I've found that the most peaceful moments in my day come not from acquiring something new, but from appreciating what I already have and remembering that all blessings come from the Most High. This realization didn't come overnight - it was a gradual process of learning to say no to things that didn't serve my deeper purpose.

The Qur'an reminds us: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose." (65:3) This verse has become a cornerstone of my approach to simplicity. When we trust in Allah's provision and wisdom, we naturally become less attached to material accumulation and more focused on spiritual growth.

Simplicity also means being intentional about our time and energy. Instead of trying to do everything, we choose to do fewer things with greater presence and care. This might mean having fewer commitments but being fully engaged in each one, or choosing quality over quantity in our relationships and activities.

In practical terms, this has meant decluttering not just my physical space, but also my digital life, my schedule, and even my thoughts. I've learned to create boundaries that protect my peace and allow me to be more present for what truly matters.

The beauty of this path is that it leads to contentment - not the fleeting satisfaction that comes from getting what we want, but the deep, lasting peace that comes from appreciating what we have and trusting in Allah's wisdom for our lives.`,
    date: "June 1, 2025",
    readTime: "5 min read",
    category: "Faith",
    author: "Abu Aaisha",
    likes: 24,
    comments: 8,
    tags: ["faith", "simplicity", "mindfulness", "islam", "contentment"],
  },
  {
    id: 2,
    title: "A Day in the Life: Intentional Routines",
    excerpt:
      "How creating small, meaningful habits can transform not just our productivity, but our entire sense of peace and purpose in daily life.",
    content: `I used to think that routines were restrictive, but I've come to understand that they're actually liberating. When we establish good habits, we free our minds from constantly making decisions about the basics, allowing us to focus on what's truly important.

My morning routine now includes reading a few pages of the Qur'an, spending time in reflection, and setting intentions for the day. These small acts have become anchors that keep me grounded, no matter what challenges the day might bring. The beauty of intentional routines is that they compound over time, creating a life that feels both structured and spiritually nourishing.

Here's what my typical day looks like:

**5:30 AM - Dawn Prayer (Fajr)**
Starting the day with prayer sets a peaceful tone and reminds me of what's truly important. There's something magical about the quiet of dawn, when the world is still and the heart is most receptive to spiritual connection.

**6:00 AM - Qur'an and Reflection**
I spend 15-20 minutes reading the Qur'an, focusing on understanding and contemplating the verses rather than just reciting them. This practice has deepened my relationship with the text and provided daily guidance.

**6:30 AM - Physical Movement**
Whether it's a walk, some stretching, or light exercise, moving my body helps me feel energized and grateful for the gift of health.

**7:00 AM - Mindful Breakfast**
I eat slowly, without distractions, appreciating the food and starting the day with gratitude for sustenance.

**8:00 AM - Daily Intentions**
I write down three main intentions for the day - not just tasks, but the spirit in which I want to approach my activities.

The key insight I've discovered is that routines should serve us, not enslave us. When something stops being beneficial, I adjust it. The goal isn't perfection, but rather creating a framework that supports spiritual growth and inner peace.

These practices have transformed not just my productivity, but my entire relationship with time and purpose. I feel more present, more grateful, and more aligned with my values throughout the day.`,
    date: "May 20, 2025",
    readTime: "7 min read",
    category: "Productivity",
    author: "Abu Aaisha",
    likes: 18,
    comments: 5,
    tags: ["productivity", "habits", "routine", "mindfulness", "spirituality"],
  },
  {
    id: 3,
    title: "Lessons from the Qur'an on Patience",
    excerpt:
      "What Surah Yusuf taught me about enduring with purpose, finding strength in difficulty, and trusting in Allah's perfect timing.",
    content: `The story of Prophet Yusuf (peace be upon him) is one of the most beautiful narratives in the Qur'an, and it's taught me so much about patience - not just waiting, but waiting with purpose and trust.

When Yusuf was thrown into the well by his brothers, sold into slavery, and later imprisoned for a crime he didn't commit, he could have become bitter or lost hope. Instead, he maintained his faith and character through every trial. What strikes me most is that his patience wasn't passive; it was active and filled with good deeds, kindness to others, and unwavering trust in Allah.

**The Well: Learning to Trust in Dark Moments**

When Yusuf was thrown into the well, he was just a child, betrayed by his own brothers. Yet even in this moment of terror and abandonment, Allah gave him a revelation that he would one day remind his brothers of this deed. This teaches us that even in our darkest moments, Allah is preparing us for something greater.

**The Palace: Maintaining Character in Temptation**

When Yusuf was propositioned by his master's wife, he could have given in to temptation or used his position for personal gain. Instead, he chose righteousness over immediate pleasure, saying "I seek refuge in Allah." This shows us that patience sometimes means saying no to what seems appealing in the moment for the sake of what is truly good.

**The Prison: Finding Purpose in Suffering**

Perhaps most remarkably, when Yusuf was imprisoned unjustly, he didn't waste time in bitterness or self-pity. Instead, he used his time to help others, interpreting dreams and spreading the message of monotheism. This teaches us that true patience transforms our suffering into service.

**The Reunion: Wisdom in Forgiveness**

When Yusuf finally revealed himself to his brothers, he didn't seek revenge but instead showed mercy and forgiveness. Years of patience had transformed him into someone who could see Allah's wisdom in all his trials.

The story of Yusuf has taught me that patience isn't about gritting our teeth through hardship, but about finding ways to grow, serve, and maintain our spiritual connection even in the darkest moments. It's about trusting that Allah's timing is perfect, even when we can't see the bigger picture.

This understanding has changed how I approach difficulties in my own life. Instead of asking "Why me?" I try to ask "How can I grow from this?" and "How can I serve others even in this situation?"

True patience is active, purposeful, and filled with trust in Allah's wisdom. It transforms us from victims of our circumstances into active participants in our own spiritual development.`,
    date: "May 10, 2025",
    readTime: "6 min read",
    category: "Qur'an",
    author: "Abu Aaisha",
    likes: 31,
    comments: 12,
    tags: ["quran", "patience", "prophet-yusuf", "faith", "trials", "wisdom"],
  },
];

// Sample comments data
const sampleComments = [
  {
    id: 1,
    author: "Sarah M.",
    content:
      "This really resonated with me. Thank you for sharing these insights about patience and trust.",
    date: "2 days ago",
    likes: 3,
  },
  {
    id: 2,
    author: "Ahmed K.",
    content:
      "The story of Prophet Yusuf has always been one of my favorites. Your perspective on active patience is beautiful.",
    date: "3 days ago",
    likes: 5,
  },
];

export default function Post({ postId = 1 }) {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(sampleComments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundPost = allPosts.find((p) => p.id === parseInt(postId));
      setPost(foundPost);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [postId]);

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1,
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Anonymous",
        content: newComment,
        date: "just now",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-8"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
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
          onClick={() => handleNavigation("/blog")}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
              {post.category}
            </span>
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
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
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                isLiked
                  ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
                  >
                    {paragraph.slice(2, -2)}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Comments Section */}
        {showComments && (
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows="3"
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newComment.trim()}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {comment.author}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {comment.content}
                  </p>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPosts
              .filter((p) => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleNavigation(`/blog/${relatedPost.id}`)}
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full mb-3">
                    {relatedPost.category}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {relatedPost.readTime}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                      <span className="text-sm font-medium">Read more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
