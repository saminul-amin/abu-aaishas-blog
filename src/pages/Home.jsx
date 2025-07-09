import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Heart,
  BookOpen,
  Star,
  User,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const defaultCategories = [
  { name: "Faith", icon: Heart, color: "from-gray-400 to-gray-500" },
  { name: "Productivity", icon: Star, color: "from-slate-400 to-slate-500" },
  {
    name: "Reflections",
    icon: BookOpen,
    color: "from-stone-400 to-stone-5000",
  },
  { name: "Qur'an", icon: Heart, color: "from-neutral-400 to-neutral-500" },
  { name: "Life Lessons", icon: User, color: "from-zinc-400 to-zinc-500" },
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch posts and categories concurrently
      const [postsResponse, categoriesResponse] = await Promise.all([
        useAxios.get("/posts"),
        useAxios.get("/categories").catch(() => ({ data: defaultCategories })), // Fallback to default if categories API fails
      ]);

      // Process posts data
      const postsData = Array.isArray(postsResponse.data)
        ? postsResponse.data
        : [];
      const processedPosts = postsData.map((post) => ({
        id: post.id || post._id || post.slug,
        title: post.title || "Untitled Post",
        slug: post.slug || post.title?.toLowerCase().replace(/\s+/g, "-"),
        excerpt:
          post.excerpt ||
          (post.content
            ? post.content.substring(0, 200) + "..."
            : "No excerpt available"),
        content: post.content || "No content available",
        contentType: post.contentType || "markdown",
        date: post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown date",
        readTime:
          post.readTime ||
          `${Math.ceil((post.content || "").split(" ").length / 200)} min read`,
        category: post.category || "General",
        author: post.author || "Abu Aaisha",
        tags: post.tags || [],
        language: post.language || "en",
        likes: post.engagement?.likes?.count || 0,
        comments: post.engagement?.comments?.count || 0,
        views: post.engagement?.views || 0,
        commentsEnabled: post.engagement?.comments?.enabled || true,
      }));

      setPosts(processedPosts);

      // Process categories data
      if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
        const processedCategories = categoriesResponse.data.map(
          (cat, index) => ({
            name: cat.name || cat.title || "Unknown Category",
            icon: getIconForCategory(cat.name || cat.title || "Unknown"),
            color:
              cat.color ||
              defaultCategories[index % defaultCategories.length]?.color ||
              "from-gray-400 to-gray-500",
          })
        );
        setCategories(processedCategories);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load content"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Helper function to get appropriate icon for category
  const getIconForCategory = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (
      name.includes("faith") ||
      name.includes("islam") ||
      name.includes("religion")
    )
      return Heart;
    if (name.includes("productivity") || name.includes("work")) return Star;
    if (name.includes("reflection") || name.includes("thought"))
      return BookOpen;
    if (name.includes("quran") || name.includes("islamic")) return Heart;
    if (name.includes("life") || name.includes("lesson")) return User;
    return BookOpen; // Default icon
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(`${path}`);
  };

  const handleRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-gray-600 dark:text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading latest posts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to Load Content
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.05) rotate(1deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out;
        }

        .animate-pulse-custom {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

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

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section with Refresh Button */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 via-slate-300 to-stone-300 rounded-2xl blur-xl opacity-20 animate-pulse-custom" />
            <h1 className="relative text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Welcome to
              <span className="block bg-gradient-to-r from-gray-700 via-slate-600 to-stone-700 bg-clip-text text-transparent">
                Abu Aaisha's Blog
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            Sharing reflections, reminders, and practical insights rooted in
            faith and simplicity.
          </p>

          <p className="text-2xl text-gray-700 dark:text-gray-200 font-[SolaimanLipi] mb-8">
            আমার নাম সামিন
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleNavigation("/blog")}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              Explore Posts
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-2300 cursor-pointer"
            >
              About Me
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Latest Posts */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fadeInLeft">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Latest Posts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-slate-400 mx-auto rounded-full"></div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300">
                No posts available at the moment.
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8">
              {posts.slice(0, 3).map((post, index) => (
                <div
                  key={post.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.2}s both`,
                  }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-slate-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Post Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {post.author}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Footer */}
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer">
                              <Heart className="w-5 h-5" />
                              <span className="text-sm font-medium">
                                {post.likes}
                              </span>
                            </button>
                            {post.commentsEnabled && (
                              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                  {post.comments} comments
                                </span>
                              </button>
                            )}
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <span className="text-sm">
                                {post.views} views
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleNavigation(`/blog/${post.slug || post.id}`)
                            }
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-all cursor-pointer"
                          >
                            Continue reading
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fadeInRight">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-3200 bg-clip-text text-transparent">
              Explore Topics
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-slate-400 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="group relative cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                  }}
                  onClick={() =>
                    handleNavigation(
                      `/category/${encodeURIComponent(cat.name)}`
                    )
                  }
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${cat.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}
                  ></div>
                  <div className="relative px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {cat.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Preview */}
        <section className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-slate-100/50 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                About Abu Aaisha
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                I'm a student and lifelong learner sharing personal reflections,
                Islamic insights, and lessons from everyday life. My goal is to
                write in a way that benefits hearts before minds.
              </p>
              <button
                onClick={() => handleNavigation("/about")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Learn More About Me
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-slate-200/30 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-r from-gray-600 to-slate-600 rounded-3xl p-8 md:p-12 shadow-2xl animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Want to connect?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Feel free to reach out through the contact page. I'd love to hear
              from you!
            </p>
            <button
              onClick={() => handleNavigation("/contact-me")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              Contact Me
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
