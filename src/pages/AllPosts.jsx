import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Heart,
  BookOpen,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

// Extended posts data (you can move this to a separate data file)
const allPosts = [
  {
    id: 1,
    title: "Reflections on Faith and Simplicity",
    excerpt:
      "In our modern world filled with constant distractions and endless pursuits, there's something profoundly beautiful about choosing simplicity. Today I want to share some thoughts on how faith has guided me toward a more intentional way of living.",
    content:
      "Living simply doesn't mean living poorly or without joy. Rather, it means being deliberate about what we allow into our lives and hearts. When we strip away the unnecessary, we create space for what truly matters: our relationship with Allah, meaningful connections with others, and personal growth that aligns with our values. I've found that the most peaceful moments in my day come not from acquiring something new, but from appreciating what I already have and remembering that all blessings come from the Most High.",
    date: "June 1, 2025",
    readTime: "5 min read",
    category: "Faith",
    author: "Abu Aaisha",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "A Day in the Life: Intentional Routines",
    excerpt:
      "How creating small, meaningful habits can transform not just our productivity, but our entire sense of peace and purpose in daily life.",
    content:
      "I used to think that routines were restrictive, but I've come to understand that they're actually liberating. When we establish good habits, we free our minds from constantly making decisions about the basics, allowing us to focus on what's truly important. My morning routine now includes reading a few pages of the Qur'an, spending time in reflection, and setting intentions for the day. These small acts have become anchors that keep me grounded, no matter what challenges the day might bring. The beauty of intentional routines is that they compound over time, creating a life that feels both structured and spiritually nourishing.",
    date: "May 20, 2025",
    readTime: "7 min read",
    category: "Productivity",
    author: "Abu Aaisha",
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    title: "Lessons from the Qur'an on Patience",
    excerpt:
      "What Surah Yusuf taught me about enduring with purpose, finding strength in difficulty, and trusting in Allah's perfect timing.",
    content:
      "The story of Prophet Yusuf (peace be upon him) is one of the most beautiful narratives in the Qur'an, and it's taught me so much about patience - not just waiting, but waiting with purpose and trust. When Yusuf was thrown into the well by his brothers, sold into slavery, and later imprisoned for a crime he didn't commit, he could have become bitter or lost hope. Instead, he maintained his faith and character through every trial. What strikes me most is that his patience wasn't passive; it was active and filled with good deeds, kindness to others, and unwavering trust in Allah. This teaches us that true patience isn't about gritting our teeth through hardship, but about finding ways to grow, serve, and maintain our spiritual connection even in the darkest moments.",
    date: "May 10, 2025",
    readTime: "6 min read",
    category: "Qur'an",
    author: "Abu Aaisha",
    likes: 31,
    comments: 12,
  },
  {
    id: 4,
    title: "The Art of Gratitude in Daily Life",
    excerpt:
      "How practicing gratitude has transformed my perspective and brought more joy and contentment to everyday moments.",
    content:
      "Gratitude isn't just about saying 'thank you' more often; it's about cultivating a mindset that recognizes the countless blessings that surround us every day. In Islam, we're taught that gratitude increases our blessings, and I've experienced this truth firsthand. When I started keeping a gratitude journal, writing down three things I was thankful for each day, I began to notice beauty and mercy in places I had previously overlooked. The warmth of morning sunlight, the taste of clean water, the comfort of a safe home - these simple gifts became sources of profound joy when I learned to truly see them.",
    date: "April 25, 2025",
    readTime: "4 min read",
    category: "Reflections",
    author: "Abu Aaisha",
    likes: 22,
    comments: 7,
  },
  {
    id: 5,
    title: "Building Meaningful Relationships",
    excerpt:
      "Thoughts on cultivating deep, authentic connections in an age of superficial interactions and digital distractions.",
    content:
      "In our hyperconnected world, we often find ourselves more isolated than ever. True friendship requires time, vulnerability, and genuine care for one another's wellbeing. I've learned that meaningful relationships aren't built through constant texting or social media interactions, but through shared experiences, honest conversations, and being present for each other during both joyful and difficult times. The Prophet (peace be upon him) taught us that a true friend is like a mirror - they help us see ourselves clearly and encourage us to become better people.",
    date: "April 15, 2025",
    readTime: "6 min read",
    category: "Life Lessons",
    author: "Abu Aaisha",
    likes: 19,
    comments: 9,
  },
  {
    id: 6,
    title: "Finding Purpose in Small Actions",
    excerpt:
      "Why the smallest acts of kindness and service can have the greatest impact on our spiritual development.",
    content:
      "We often think that making a difference requires grand gestures or monumental achievements. But I've come to understand that it's the small, consistent actions that truly shape our character and impact the world around us. Smiling at a stranger, helping a neighbor carry groceries, listening to someone who needs to talk - these seemingly minor acts are actually profound forms of worship when done with sincere intention. Every small kindness is a prayer in action, a way of reflecting Allah's mercy in our daily interactions.",
    date: "April 5, 2025",
    readTime: "5 min read",
    category: "Faith",
    author: "Abu Aaisha",
    likes: 27,
    comments: 11,
  },
  {
    id: 7,
    title: "The Beauty of Imperfection",
    excerpt:
      "Learning to embrace our flaws and find peace in the journey of continuous growth and self-improvement.",
    content:
      "Perfectionism can be a beautiful motivator, but it can also become a prison. I used to think that I needed to have everything figured out before I could share my thoughts or help others. But I've learned that our struggles and imperfections are often what make us most relatable and useful to others. When we're honest about our journey - the mistakes, the setbacks, the moments of doubt - we create space for others to be honest about theirs. This authenticity is what builds real community and genuine connection.",
    date: "March 28, 2025",
    readTime: "7 min read",
    category: "Reflections",
    author: "Abu Aaisha",
    likes: 25,
    comments: 14,
  },
  {
    id: 8,
    title: "Lessons from Nature",
    excerpt:
      "What the natural world teaches us about patience, resilience, and the wisdom of divine creation.",
    content:
      "Every time I spend time in nature, I'm reminded of the incredible wisdom embedded in Allah's creation. Trees grow slowly but surely, seasons change in perfect timing, and every creature has its role in the greater ecosystem. There's something humbling about watching a seed grow into a mighty tree, or observing how rivers carve through mountains over time. Nature teaches us about patience, persistence, and trust in divine timing. It reminds us that growth happens gradually, that there's beauty in every season of life, and that we're part of something much larger than ourselves.",
    date: "March 20, 2025",
    readTime: "6 min read",
    category: "Reflections",
    author: "Abu Aaisha",
    likes: 20,
    comments: 6,
  },
];

const categories = [
  "All",
  "Faith",
  "Productivity",
  "Qur'an",
  "Reflections",
  "Life Lessons",
];

export default function AllPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [isLoading, setIsLoading] = useState(false);

  const postsPerPage = 6;

  // Filter posts based on search and category
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = allPosts;

      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (post) => post.category === selectedCategory
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredPosts(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

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

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            All Posts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore all my reflections, insights, and thoughts on faith, life,
            and personal growth.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Post Header */}
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {post.author}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Post Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleNavigation(`/blog/${post.id}`)}
                        className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium text-sm transition-all"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && filteredPosts.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full font-medium transition-all ${
                      currentPage === page
                        ? "bg-gray-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Results Summary */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1}-
              {Math.min(startIndex + postsPerPage, filteredPosts.length)} of{" "}
              {filteredPosts.length} posts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
