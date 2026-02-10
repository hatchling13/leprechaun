import { css, cva, type RecipeVariantProps } from "@panda/css";
import { useState } from "react";
import { Effect } from "effect";
import { downloadSvgAsPng } from "./utils/download-svg-as-png";
import { Console } from "effect";
import { generate } from "./lib/svg.server";

const recipe = cva({
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

type Variants = RecipeVariantProps<typeof recipe>;
type Theme = NonNullable<NonNullable<Variants>["theme"]>;

const program = Effect.gen(function* () {
  yield* Console.log("Requesting SVG from server...");

  const response = yield* Effect.tryPromise({
    try: () => generate(),
    catch: (error) => new Error(`Server failed : ${error}`),
  });

  if (response._tag === "Failure") {
    console.error(response.error);
    return yield* Effect.fail(new Error(response.error));
  }

  yield* Console.log("SVG received, converting to PNG in browser...");

  const svg = response.data;
  yield* downloadSvgAsPng(svg);
});

const App = () => {
  const [theme, setTheme] = useState<Theme>("lush-meadow");

  const handleClick = () => {
    Effect.runFork(program);
  };

  return (
    <div className={recipe({ theme })}>
      <div
        className={css({
          display: "flex",
          flexDir: "column",
          blockSize: "full",
          inlineSize: "full",
        })}
      >
        <div
          className={css({
            display: "flex",
            fontWeight: "bold",
            justifyContent: "end",
            gap: "4",
            p: "4",
          })}
        >
          <button onClick={() => setTheme("the-sprout")}>The Sprout</button>
          <button onClick={() => setTheme("lush-meadow")}>Lush Meadow</button>
        </div>
        <div
          className={css({
            display: "flex",
            flex: "1",
            padding: { base: "4", sm: "16" },
            placeContent: "center",
            placeItems: "center",
          })}
        >
          <section
            className={css({
              position: "relative",
              blockSize: "full",
              inlineSize: "full",
              background: "oklch(100% 0 0 / 1)",
              borderRadius: "3xl",
              border: "1px solid oklch(100% 0 0 / 0.1)",
              boxShadow: "0 20px 50px oklch(20% 0.02 150 / 0.08)",
              padding: "8",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
            })}
          >
            <button
              className={css({
                transition: "colors",
                transitionDuration: "150ms",
                bgColor: "teal.600",
                rounded: "lg",
                px: "6",
                py: "4",
                fontSize: "xl",
                fontWeight: "semibold",
                color: "white",
                _hover: {
                  bgColor: "teal.500",
                },
                _active: {
                  bgColor: "teal.600",
                },
              })}
              onClick={handleClick}
            >
              Generate!
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
