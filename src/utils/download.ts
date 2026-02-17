import { Effect } from "effect";
import { svg2Png } from "./svg-2-png";
import { Temporal } from "temporal-polyfill";

const getFilename = (ext: "svg" | "png") =>
  `leprechaun-${Temporal.Now.zonedDateTimeISO().toPlainDateTime().toString()}.${ext}`;

const triggerDownload = (url: string, extension: "svg" | "png") =>
  Effect.try({
    try: () => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = getFilename(extension);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    },
    catch: (error) => new Error(`Download failed: ${String(error)}`),
  });

export const downloadAsSvg = (svg: string) =>
  Effect.gen(function* () {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    yield* triggerDownload(url, "svg");

    URL.revokeObjectURL(url);
  });

export const downloadAsPng = (svg: string) =>
  Effect.gen(function* () {
    const pngUrl = yield* svg2Png(svg);

    yield* triggerDownload(pngUrl, "png");
  });
