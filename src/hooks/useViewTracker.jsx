// hooks/useViewTracker.js
import { useEffect } from "react";
import useAxios from "./useAxios";

// Utility function to generate browser fingerprint
const generateBrowserFingerprint = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Browser fingerprint", 2, 2);

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || "unknown",
    canvas.toDataURL(),
  ].join("|");

  // Create a simple hash
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
};

// Utility function to generate/get session ID
const generateSessionId = () => {
  let sessionId = sessionStorage.getItem("blog_session_id");
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem("blog_session_id", sessionId);
  }
  return sessionId;
};

// Custom hook for view tracking
const useViewTracker = (postId, userEmail, onViewUpdate) => {
  useEffect(() => {
    if (!postId) return;

    const updateViews = async () => {
      try {
        // Check if we've already recorded a view for this post in this session
        const viewedPosts = JSON.parse(
          sessionStorage.getItem("viewed_posts") || "[]"
        );
        const postViewKey = `${postId}`;

        if (viewedPosts.includes(postViewKey)) {
          console.log("View already recorded for this post in this session");
          return;
        }

        const fingerprint = generateBrowserFingerprint();
        const sessionId = generateSessionId();

        const response = await useAxios.post(`/posts/${postId}/view`, {
          userEmail: userEmail || null,
          fingerprint,
          sessionId,
          userAgent: navigator.userAgent,
        });

        if (response.data.viewIncremented) {
          // Mark this post as viewed in this session
          viewedPosts.push(postViewKey);
          sessionStorage.setItem("viewed_posts", JSON.stringify(viewedPosts));

          // Call the callback to update the parent component's state
          if (onViewUpdate) {
            onViewUpdate(response.data.newViewCount);
          }
        }
      } catch (err) {
        console.error("Error updating view count:", err);
      }
    };

    // Add a small delay to ensure the page has loaded
    const timer = setTimeout(updateViews, 1000);
    return () => clearTimeout(timer);
  }, [postId, userEmail, onViewUpdate]);
};

// Alternative: Intersection Observer approach for more sophisticated tracking
const useAdvancedViewTracker = (postId, userEmail, onViewUpdate) => {
  useEffect(() => {
    if (!postId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User has scrolled to the main content
            const updateViews = async () => {
              try {
                const viewedPosts = JSON.parse(
                  sessionStorage.getItem("viewed_posts") || "[]"
                );
                const postViewKey = `${postId}`;

                if (viewedPosts.includes(postViewKey)) {
                  return;
                }

                const fingerprint = generateBrowserFingerprint();
                const sessionId = generateSessionId();

                const response = await useAxios.post(`/posts/${postId}/view`, {
                  userEmail: userEmail || null,
                  fingerprint,
                  sessionId,
                  userAgent: navigator.userAgent,
                });

                if (response.data.viewIncremented) {
                  viewedPosts.push(postViewKey);
                  sessionStorage.setItem(
                    "viewed_posts",
                    JSON.stringify(viewedPosts)
                  );

                  if (onViewUpdate) {
                    onViewUpdate(response.data.newViewCount);
                  }
                }
              } catch (err) {
                console.error("Error updating view count:", err);
              }
            };

            // Only update after user has been viewing for 3 seconds
            setTimeout(updateViews, 3000);
            observer.disconnect(); // Stop observing after first meaningful view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the content is visible
    );

    // Observe the main article content
    const articleElement = document.querySelector("article");
    if (articleElement) {
      observer.observe(articleElement);
    }

    return () => observer.disconnect();
  }, [postId, userEmail, onViewUpdate]);
};

export { useViewTracker, useAdvancedViewTracker };
