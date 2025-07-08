import { useState } from "react";
import {
  SendHorizonal,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  Heart,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitSuccessful(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitSuccessful(false);
      }, 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

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

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
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

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .shimmer-bg {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200px 100%;
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
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-300 via-slate-300 to-stone-300 rounded-2xl blur-xl opacity-20 animate-pulse-custom" />
            <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="relative text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Get in Touch
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            I'd love to hear from you! Whether you have questions, feedback, or
            just want to connect.
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Heart className="w-5 h-5" />
            <span className="text-lg">Let's start a conversation</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Success Message */}
        {isSubmitSuccessful && (
          <div className="mb-8 animate-fadeInUp">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-200 to-emerald-200 rounded-2xl blur opacity-50"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-slate-200/30 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeInUp">
            <div className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2 animate-fadeInLeft">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <User className="w-5 h-5" />
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 ${
                        errors.name
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500"
                      }`}
                      placeholder="Your full name"
                    />
                    {isSubmitting && (
                      <div className="absolute inset-0 shimmer-bg animate-shimmer rounded-2xl pointer-events-none" />
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2 animate-fadeInRight">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 ${
                        errors.email
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {isSubmitting && (
                      <div className="absolute inset-0 shimmer-bg animate-shimmer rounded-2xl pointer-events-none" />
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="space-y-2 animate-fadeInLeft">
                <label
                  htmlFor="subject"
                  className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  <MessageSquare className="w-5 h-5" />
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 ${
                      errors.subject
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500"
                    }`}
                    placeholder="What's this about?"
                  />
                  {isSubmitting && (
                    <div className="absolute inset-0 shimmer-bg animate-shimmer rounded-2xl pointer-events-none" />
                  )}
                </div>
                {errors.subject && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2 animate-fadeInRight">
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  <MessageSquare className="w-5 h-5" />
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 resize-none ${
                      errors.message
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500"
                    }`}
                    placeholder="Share your thoughts, questions, or feedback..."
                  />
                  {isSubmitting && (
                    <div className="absolute inset-0 shimmer-bg animate-shimmer rounded-2xl pointer-events-none" />
                  )}
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center animate-fadeInUp">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-fadeInUp">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Looking forward to connecting!
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              I try to respond to all messages within 24-48 hours. Your thoughts
              and feedback mean a lot to me.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Thank you for taking the time to reach out</span>
              <Heart className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
