import { Effect } from "effect";

export const svg2Png = (svg: string) =>
  Effect.async<string, Error>((resume) => {
    const image = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          resume(Effect.fail(new Error("Failed to get 2D Context")));
          return;
        }

        context.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");

        resume(Effect.succeed(dataUrl));
      } catch (error) {
        resume(Effect.fail(error as Error));
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    image.onerror = (error) => {
      URL.revokeObjectURL(url);

      if (typeof error === "string") {
        resume(Effect.fail(new Error(error)));
        return;
      }

      resume(Effect.fail(new Error("Failed to load SVG image onto canvas")));
    };

    image.src = url;
  });
