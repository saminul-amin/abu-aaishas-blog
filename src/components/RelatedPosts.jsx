import { ChevronRight } from "lucide-react";

export default function RelatedPosts({ relatedPosts, post, handleNavigation }) {
  if (relatedPosts.length === 0) return null;

  return (
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
                  relatedPost.language === "bn" ? "font-[SolaimanLipi]" : ""
                }`}
              >
                {relatedPost.readTime}
              </span>
              <div
                className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors ${
                  relatedPost.language === "bn" ? "font-[SolaimanLipi]" : ""
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
  );
}
