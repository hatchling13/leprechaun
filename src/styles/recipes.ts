import { cva, type RecipeVariantProps } from "@panda/css";

export const recipe = cva({
  base: {
    blockSize: "full",
    minBlockSize: "100dvh",
    backgroundAttachment: "fixed",
    backgroundGradient: "to-br",
  },
  variants: {
    theme: {
      "the-sprout": {
        gradientFrom: "oklch(93% 0.16 142)",
        gradientVia: "oklch(88% 0.14 158)",
        gradientTo: "oklch(83% 0.12 175)",
      },
      "lush-meadow": {
        gradientFrom: "oklch(88% 0.22 140)",
        gradientVia: "oklch(82% 0.20 155)",
        gradientTo: "oklch(78% 0.18 180)",
      },
    },
  },
  defaultVariants: {
    theme: "lush-meadow",
  },
});

export type Variants = RecipeVariantProps<typeof recipe>;
export type Theme = NonNullable<NonNullable<Variants>["theme"]>;
