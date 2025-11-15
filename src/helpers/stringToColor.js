/**
 * Converts a string (such as a user ID) into an HSL color.
 * This ensures that the same user always has the same color.
 */

export const stringToHslColor = (str) => {
  let hash = 0;
  // Generates a numeric hash from the string
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Uses the hash to generate a Hue between 0 and 360
  const h = hash % 360;

  // Returns an HSL color with a variable Hue,
  // but fixed Saturation (60%) and Lightness (50%) for good readability.
  return `hsl(${h}, 60%, 50%)`;
};
