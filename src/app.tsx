import { css, cx } from "@panda/css";
import { useState } from "react";
import { Effect } from "effect";
import { generate } from "./lib/generate";
import { downloadAsPng, downloadAsSvg } from "./utils/download";
import { recipe, type Theme } from "./styles/recipes";
import { button } from "./styles/button";
import { main } from "./styles/main";
import type { HeaderImageParams } from "./header-image";
import { grid, stack } from "@panda/patterns";
import { fieldStack, inputStyle, labelStyle, themeBtn } from "./styles";

const action = (type: "svg" | "png", params: HeaderImageParams) =>
  Effect.gen(function* () {
    const source = yield* generate(1600, 900, params);

    yield* type === "svg" ? downloadAsSvg(source) : downloadAsPng(source);
  });

const handleClick = (type: "svg" | "png", params: HeaderImageParams) => {
  Effect.runPromise(action(type, params))
    .then(() => console.log("Effect completed successfully"))
    .catch((err) => console.error("Effect exploded:", err));
};

const App = () => {
  const [theme, setTheme] = useState<Theme>("lush-meadow");

  const [params, setParams] = useState<HeaderImageParams>({
    title: "My New Blog Post",
    subtitle: "A journey into the unknown",
    category: "Tech",
    date: new Date().toLocaleDateString("ko-KR"),
    bgImageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <div className={css({ display: "flex", justifyContent: "end", gap: "4", p: "4" })}>
          <button className={themeBtn} onClick={() => setTheme("the-sprout")}>
            The Sprout
          </button>
          <button className={themeBtn} onClick={() => setTheme("lush-meadow")}>
            Lush Meadow
          </button>
        </div>

        <div
          className={css({
            display: "flex",
            flex: "1",
            p: { base: "4", sm: "16" },
            placeContent: "center",
            placeItems: "center",
          })}
        >
          <section className={main}>
            <div className={stack({ gap: "6", inlineSize: "full", maxW: "2xl" })}>
              <h2 className={css({ fontSize: "2xl", fontWeight: "bold", color: "teal.800" })}>
                Image Configuration
              </h2>

              {/* The Form Grid */}
              <div className={grid({ columns: 2, gap: "4" })}>
                <div className={fieldStack}>
                  <label className={labelStyle}>Title</label>
                  <input
                    className={inputStyle}
                    name="title"
                    value={params.title}
                    onChange={handleChange}
                  />
                </div>

                <div className={fieldStack}>
                  <label className={labelStyle}>Category</label>
                  <input
                    className={inputStyle}
                    name="category"
                    value={params.category}
                    onChange={handleChange}
                  />
                </div>

                <div className={cx(fieldStack, css({ gridColumn: "span 2" }))}>
                  <label className={labelStyle}>Subtitle</label>
                  <input
                    className={inputStyle}
                    name="subtitle"
                    value={params.subtitle}
                    onChange={handleChange}
                  />
                </div>

                <div className={cx(fieldStack, css({ gridColumn: "span 2" }))}>
                  <label className={labelStyle}>Background Image URL</label>
                  <input
                    className={inputStyle}
                    name="bgImageUrl"
                    placeholder="https://..."
                    value={params.bgImageUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={css({ display: "flex", gap: "4", mt: "4" })}>
                <button className={button} onClick={() => handleClick("svg", params)}>
                  Generate SVG
                </button>
                <button className={button} onClick={() => handleClick("png", params)}>
                  Generate PNG
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
