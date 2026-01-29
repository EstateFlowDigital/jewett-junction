/**
 * Search utilities with debouncing and fuzzy matching
 */

import * as React from 'react';

/**
 * Debounce hook - delays execution until user stops typing
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounced callback hook - debounces a callback function
 * @param callback - The callback to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced callback
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store distances
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1 // insertion
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Calculate similarity score between two strings (0-1)
 * Higher score = more similar
 */
export function stringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);

  return 1 - distance / maxLength;
}

/**
 * Check if a string contains another string (case-insensitive)
 */
export function containsString(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Check if a string starts with another string (case-insensitive)
 */
export function startsWithString(text: string, query: string): boolean {
  return text.toLowerCase().startsWith(query.toLowerCase());
}

interface FuzzyMatchOptions {
  /** Minimum similarity score to consider a match (0-1, default: 0.3) */
  threshold?: number;
  /** Search keys for objects */
  keys?: string[];
  /** Whether to include exact matches first */
  exactFirst?: boolean;
}

interface FuzzyMatchResult<T> {
  item: T;
  score: number;
  matches: { key: string; value: string; score: number }[];
}

/**
 * Fuzzy search through an array of items
 * @param items - Array of items to search
 * @param query - Search query
 * @param options - Search options
 * @returns Filtered and sorted results with match scores
 */
export function fuzzySearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  options: FuzzyMatchOptions = {}
): FuzzyMatchResult<T>[] {
  const { threshold = 0.3, keys = [], exactFirst = true } = options;

  if (!query || query.trim() === '') {
    return items.map((item) => ({ item, score: 1, matches: [] }));
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: FuzzyMatchResult<T>[] = [];

  for (const item of items) {
    const matches: { key: string; value: string; score: number }[] = [];
    let bestScore = 0;
    let hasExactMatch = false;

    // Determine which keys to search
    const searchKeys = keys.length > 0 ? keys : Object.keys(item);

    for (const key of searchKeys) {
      const value = item[key];
      if (typeof value !== 'string') continue;

      const normalizedValue = value.toLowerCase();

      // Check for exact containment (highest priority)
      if (normalizedValue.includes(normalizedQuery)) {
        hasExactMatch = true;
        // Give higher score if it's a prefix match
        const isPrefix = normalizedValue.startsWith(normalizedQuery);
        const score = isPrefix ? 0.95 : 0.9;
        matches.push({ key, value, score });
        bestScore = Math.max(bestScore, score);
      } else {
        // Fuzzy match using similarity
        const similarity = stringSimilarity(normalizedValue, normalizedQuery);
        if (similarity >= threshold) {
          matches.push({ key, value, score: similarity });
          bestScore = Math.max(bestScore, similarity);
        }

        // Also check word-level matching
        const words = normalizedValue.split(/\s+/);
        for (const word of words) {
          if (word.startsWith(normalizedQuery)) {
            matches.push({ key, value, score: 0.85 });
            bestScore = Math.max(bestScore, 0.85);
          }
        }
      }
    }

    if (matches.length > 0) {
      results.push({
        item,
        score: exactFirst && hasExactMatch ? bestScore + 1 : bestScore,
        matches,
      });
    }
  }

  // Sort by score (descending)
  results.sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Simple search filter for arrays (case-insensitive substring matching)
 * Use this for quick, basic filtering without fuzzy matching
 */
export function simpleSearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  keys: string[]
): T[] {
  if (!query || query.trim() === '') {
    return items;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return items.filter((item) => {
    for (const key of keys) {
      const value = item[key];
      if (typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
    }
    return false;
  });
}

/**
 * Highlight matching text in a string
 * @param text - The full text
 * @param query - The search query to highlight
 * @returns Array of segments with highlight flags
 */
export function highlightMatches(
  text: string,
  query: string
): { text: string; highlight: boolean }[] {
  if (!query || query.trim() === '') {
    return [{ text, highlight: false }];
  }

  const normalizedQuery = query.toLowerCase();
  const normalizedText = text.toLowerCase();
  const results: { text: string; highlight: boolean }[] = [];

  let lastIndex = 0;
  let index = normalizedText.indexOf(normalizedQuery);

  while (index !== -1) {
    // Add non-highlighted text before match
    if (index > lastIndex) {
      results.push({
        text: text.slice(lastIndex, index),
        highlight: false,
      });
    }

    // Add highlighted match
    results.push({
      text: text.slice(index, index + query.length),
      highlight: true,
    });

    lastIndex = index + query.length;
    index = normalizedText.indexOf(normalizedQuery, lastIndex);
  }

  // Add remaining text
  if (lastIndex < text.length) {
    results.push({
      text: text.slice(lastIndex),
      highlight: false,
    });
  }

  return results;
}
