import { css } from "@panda/css";
import { useState } from "react";
import { Effect } from "effect";
import { generate } from "./lib/generate";
import { downloadAsPng, downloadAsSvg } from "./utils/download";
import { recipe, type Theme } from "./styles/recipes";
import { button } from "./styles/button";
import { main } from "./styles/main";

const svg = Effect.gen(function* () {
  const source = yield* generate();

  yield* downloadAsSvg(source);
});

const png = Effect.gen(function* () {
  const source = yield* generate();

  yield* downloadAsPng(source);
});

const handleClick = (type: "svg" | "png") => {
  Effect.runPromise(type === "svg" ? svg : png)
    .then(() => console.log("Effect completed successfully"))
    .catch((err) => console.error("Effect exploded:", err));
};

const App = () => {
  const [theme, setTheme] = useState<Theme>("lush-meadow");

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
          <section className={main}>
            <button className={button} onClick={() => handleClick("svg")}>
              Generate as SVG!
            </button>
            <button className={button} onClick={() => handleClick("png")}>
              Generate as PNG!
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
