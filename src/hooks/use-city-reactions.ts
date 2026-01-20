"use client";

import { useState, useEffect, useCallback } from "react";

export type ReactionType = "like" | "dislike" | null;

interface CityReactions {
  [citySlug: string]: ReactionType;
}

const STORAGE_KEY = "korea-nomad-reactions";

/**
 * Hook for managing city like/dislike reactions
 * Stores user reactions in localStorage
 */
export function useCityReactions() {
  const [reactions, setReactions] = useState<CityReactions>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load reactions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReactions(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load reactions from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save reactions to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
      } catch (error) {
        console.error("Failed to save reactions to localStorage:", error);
      }
    }
  }, [reactions, isLoaded]);

  // Get reaction for a specific city
  const getReaction = useCallback(
    (citySlug: string): ReactionType => {
      return reactions[citySlug] || null;
    },
    [reactions]
  );

  // Toggle like for a city
  const toggleLike = useCallback(
    (citySlug: string) => {
      setReactions((prev) => {
        const currentReaction = prev[citySlug];

        if (currentReaction === "like") {
          // If already liked, remove the like
          const { [citySlug]: _, ...rest } = prev;
          return rest;
        } else {
          // Set to like (removes dislike if present)
          return { ...prev, [citySlug]: "like" };
        }
      });
    },
    []
  );

  // Toggle dislike for a city
  const toggleDislike = useCallback(
    (citySlug: string) => {
      setReactions((prev) => {
        const currentReaction = prev[citySlug];

        if (currentReaction === "dislike") {
          // If already disliked, remove the dislike
          const { [citySlug]: _, ...rest } = prev;
          return rest;
        } else {
          // Set to dislike (removes like if present)
          return { ...prev, [citySlug]: "dislike" };
        }
      });
    },
    []
  );

  // Clear all reactions
  const clearAllReactions = useCallback(() => {
    setReactions({});
  }, []);

  return {
    reactions,
    isLoaded,
    getReaction,
    toggleLike,
    toggleDislike,
    clearAllReactions,
  };
}
