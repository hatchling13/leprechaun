import { Effect } from "effect";
import { svg2Png } from "./svg-2-png";
import { Temporal } from "temporal-polyfill";

export const downloadSvgAsPng = (svg: string) =>
  Effect.gen(function* () {
    const pngUrl = yield* svg2Png(svg);

    yield* Effect.try({
      try: () => {
        const anchor = document.createElement("a");
        anchor.href = pngUrl;
        anchor.download = `leprechaun-${Temporal.Now.zonedDateTimeISO().toString()}`;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      },
      catch: (error) => new Error(`Download failed : ${String(error)}`),
    });
  });
