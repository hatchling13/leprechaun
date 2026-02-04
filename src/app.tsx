import { css, cva, type RecipeVariantProps } from "@panda/css";
import { useState } from "react";

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
            })}
          >
            <h1 className={css({ fontWeight: "black", fontSize: "2xl", marginBlockEnd: "8" })}>
              Something magical is going to happen!
            </h1>
            <p className={css({ fontWeight: "semibold", fontSize: "lg", paddingBlock: "4" })}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor enim, facilisis
              ac sollicitudin in, ultrices in ipsum. Quisque egestas lorem lacus, a dictum dui
              mollis vel. Sed ac neque odio. Sed eget ligula odio. Duis luctus, est eu blandit
              egestas, augue lorem iaculis purus, ac bibendum magna leo semper ante. Aenean sit amet
              mattis nulla. Nulla tempor tortor imperdiet ligula elementum gravida. Phasellus quis
              vehicula leo. In eu nisl cursus, ullamcorper quam ac, tempor odio. Nullam sodales nisi
              sit amet lectus porta commodo sodales eu purus. Suspendisse odio ex, ornare ut turpis
              vitae, tempus commodo enim. Morbi tellus nisl, dictum vel orci id, sodales lacinia
              felis. Etiam vehicula est eu libero condimentum eleifend.
            </p>
            <p className={css({ fontWeight: "semibold", fontSize: "lg", paddingBlock: "4" })}>
              Vivamus tincidunt, erat et volutpat rutrum, lacus eros pulvinar leo, et convallis urna
              risus ac odio. Nam sodales urna ex, quis mattis lorem accumsan quis. Phasellus
              fringilla massa odio, eu mollis purus interdum vitae. Nunc sollicitudin pulvinar
              volutpat. Nulla aliquam augue velit, sed facilisis neque lacinia in. Nulla rhoncus
              massa quis leo ultrices laoreet. Fusce et erat vel eros ultrices congue nec a turpis.
              Ut id laoreet quam, nec sodales odio. Sed a sem sagittis metus consectetur bibendum a
              quis erat.
            </p>
            <p className={css({ fontWeight: "semibold", fontSize: "lg", paddingBlock: "4" })}>
              In non porta nisl, sit amet egestas dolor. Vestibulum quis nisi leo. Sed vitae elit
              purus. Nunc faucibus elit sed justo dapibus, sed lobortis libero fermentum. Phasellus
              eget purus ornare, iaculis mi at, elementum lectus. Cras mollis risus eu velit
              tincidunt, sed tempus eros euismod. Fusce tincidunt ullamcorper mauris, eu maximus sem
              facilisis et. Aenean sollicitudin iaculis purus, quis egestas urna posuere id. Aenean
              faucibus ut lectus a porta. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Nulla pretium dignissim elit, id malesuada metus
              aliquet nec. Vestibulum eget nulla sit amet nunc tincidunt tincidunt ut non neque.
              Aliquam ac ex pulvinar, lobortis lectus eget, venenatis metus. Suspendisse potenti.
            </p>
            <p className={css({ fontWeight: "semibold", fontSize: "lg", paddingBlock: "4" })}>
              Nam elementum elementum sapien, in convallis urna placerat ut. Cras sed orci ac nisl
              facilisis hendrerit. Sed tempor volutpat rutrum. Nunc accumsan risus non quam suscipit
              ornare. Duis sagittis libero in arcu iaculis fringilla. Duis volutpat lacus ex,
              sodales egestas metus viverra eu. Curabitur sodales tincidunt justo, quis scelerisque
              dui viverra vel.
            </p>
            <p className={css({ fontWeight: "semibold", fontSize: "lg", paddingBlock: "4" })}>
              Nunc odio lorem, hendrerit ac condimentum sed, fermentum posuere est. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Pellentesque finibus arcu sit amet libero
              laoreet, in cursus mauris laoreet. Aliquam vitae quam vitae leo dignissim ullamcorper.
              Quisque ac diam a est pellentesque tristique eu rutrum libero. Fusce bibendum rhoncus
              nibh, vel laoreet purus pulvinar ut. Cras tincidunt at nunc vitae posuere. Praesent
              eget sodales eros. Maecenas non sollicitudin ligula, ut feugiat enim. Praesent sit
              amet leo sed mi pharetra porta id eu purus. Praesent bibendum venenatis ex, non
              consectetur elit malesuada in. Nulla consectetur suscipit nibh non maximus.
              Suspendisse pretium feugiat mollis. Curabitur interdum nisl orci, non cursus leo
              euismod eu. Vestibulum accumsan orci blandit felis sodales, ac posuere lorem
              consequat. Curabitur suscipit lorem ligula, eu convallis erat auctor quis.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
