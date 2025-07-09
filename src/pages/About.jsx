import { useState } from "react";
import {
  User,
  Heart,
  BookOpen,
  Users,
  MessageCircle,
  ArrowRight,
  Clock,
  Globe,
  Star,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navigation to: ${path}`);
    navigate(`${path}`);
    // In a real app, you would implement navigation here
    // For now, we'll just log the intended navigation
  };

  const values = [
    {
      icon: Heart,
      title: "Faith-Centered",
      description: "Following the path of our rightly guided predecessors",
      color: "from-red-400 to-rose-500",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Believing in genuine relationships and connections",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: BookOpen,
      title: "Lifelong Learning",
      description: "Committed to continuous growth and knowledge",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Bilingual Voice",
      description: "Writing in both Bangla and English to reach more hearts",
      color: "from-purple-400 to-violet-500",
    },
  ];

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

        @keyframes sparkle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
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

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
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

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 via-slate-300 to-stone-300 rounded-full blur-xl opacity-20 animate-pulse-custom" />
            <div className="relative w-26 h-26 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center mx-auto animate-float">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 via-slate-300 to-stone-300 rounded-2xl blur-xl opacity-20 animate-pulse-custom" />
            <h1 className="relative text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              About Abu Aaisha
            </h1>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            A student, seeker, and storyteller sharing reflections from the
            journey of faith
          </p>
        </div>

        {/* Main Story Section */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-slate-100/50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp">
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center animate-sparkle">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    My Journey
                  </h2>
                </div>

                <p className="text-lg">
                  I'm striving to be a practicing Muslim, walking in the
                  footsteps of our rightly guided predecessors (Salaf). Growing
                  up in the 90s, I deeply cherish the life we had back then – a
                  life rich with social interactions and genuinely amicable
                  relationships among neighbors and relatives.
                </p>

                <p className="text-lg">
                  I often reflect on how teenagers in those days spent countless
                  hours reading books and playing in fields every afternoon; I
                  believe this played a crucial role in raising truly resilient
                  kids. If we could revive even a semblance of that way of life
                  today, it would significantly impact today's youth, helping
                  them break free from the overwhelming internet frenzy and the
                  isolation of virtual existence.
                </p>

                <p className="text-lg">
                  My write-ups, written in both Bangla and English, primarily
                  aim to pinpoint the challenges faced by Muslims in today's
                  world and offer potential solutions. If you find benefit in
                  what you read here, please consider leaving a comment. I'd
                  love to connect and hear your thoughts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fadeInLeft">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              What Guides Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-slate-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={() => setHoveredSection(value.title)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${value.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}
                  ></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Nostalgia Section */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeInRight">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-sparkle">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Remembering the 90s
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Reading Culture
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Teenagers spending hours with books, building imagination
                      and critical thinking
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Community Bonds
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Genuine relationships among neighbors and relatives that
                      shaped character
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Outdoor Play
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Afternoons in fields building resilience and social skills
                      naturally
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Simple Joys
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Finding happiness in simple moments and real connections
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  My Mission
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Through my bilingual writings, I aim to bridge the gap between
                  our rich Islamic heritage and modern challenges. My goal is to
                  help Muslims navigate today's world while staying true to
                  their faith, and to inspire a return to the meaningful
                  connections that once defined our communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-slate-200/30 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-r from-gray-600 to-slate-600 rounded-3xl p-8 md:p-12 shadow-2xl animate-fadeInUp">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                If you find benefit in what you read here, please consider
                leaving a comment. I'd love to connect and hear your thoughts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleNavigation("/contact-me")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigation("/all-posts")}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-gray-700 transition-all duration-300 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  Read My Posts
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
