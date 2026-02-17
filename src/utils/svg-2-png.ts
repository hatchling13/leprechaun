import { Effect } from "effect";

export const svg2Png = (svg: string) =>
  Effect.async<string, Error>((resume) => {
    const svgBlob = svg.includes("xmlns=")
      ? svg
      : svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');

    const image = new Image();

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgBlob);

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || 1600;
        canvas.height = image.naturalHeight || 900;

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
      }
    };

    image.onerror = (error) => {
      console.error("Canvas SVG Render Error:", error);
      const message =
        typeof error === "string"
          ? error
          : "Failed to load SVG onto canvas (Check for missing fonts or invalid SVG tags)";
      resume(Effect.fail(new Error(message)));
    };

    image.src = url;
  });
