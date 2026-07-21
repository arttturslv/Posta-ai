export const POSTIT_COLORS = [
  "#FFA5AB", // Salmon Pink
  "#9BBEC7", // Light Blue
  "#C8E087", // Mindaro Green
  "#EECF6D", // Jasmine Yellow
  "#ACEB98", // Light Green
  "#F15946", // Tomato Red
  "#62804D", // Sage Green
  "#D04646", // Soft Red
  "#E46746", // Coral Orange
  "#61788A", // Steel Blue
  "#D4874D", // Warm Ochre
  "#F7C59F", // Peach
  "#B8E0D2", // Soft Mint
  "#D6E2E9", // Ice Blue
  "#FAD2E1", // Soft Pink
  "#E8AEB7", // Rose
  "#B8C0FF", // Periwinkle
  "#C8B6FF", // Lavender
  "#FFD6FF", // Light Magenta
  "#E7C6FF", // Light Purple
  "#FFE5EC", // Blush
  "#F0EF69", // Lemon Yellow
  "#95D5B2", // Seafoam
  "#74C69D", // Emerald Mint
  "#F4A261", // Sandy Orange
  "#E76F51", // Burnt Orange
  "#A8DADC", // Powder Blue
  "#457B9D", // Medium Blue
  "#C9E4CA", // Pale Sage
  "#F2CC8F", // Muted Gold
];

export function getRotation(seed) {
  const num = typeof seed === "number" ? seed + 1 : hashString(seed);
  // Pseudo-random hashing to generate deterministic organic angles between -6deg and 6deg
  const pseudoRandom = (Math.abs(Math.sin(num * 12.9898 + 78.233) * 43758.5453123)) % 1;
  let angle = pseudoRandom * 12 - 6;
  // Ensure minimum tilt of at least 1.2deg for organic post-it look
  if (Math.abs(angle) < 1.2) {
    angle = angle < 0 ? -2.5 : 2.5;
  }
  return Math.round(angle * 10) / 10;
}

function hashString(str) {
  if (!str) return 1;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + 1;
}
