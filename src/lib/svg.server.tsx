import { Effect, Either } from "effect";
import satori from "satori";
import { FontService } from "./font.server";
import { HeaderImage } from "@/header-image";
import { createServerFn } from "@tanstack/react-start";
import { ServerLayer } from "./layer";

const program = Effect.gen(function* () {
  const { getFonts } = yield* FontService;
  const fonts = yield* getFonts;

  const svg = yield* Effect.tryPromise({
    try: () =>
      satori(<HeaderImage />, {
        width: 1600,
        height: 900,
        fonts: fonts.map((f) => ({ name: "MaruBuri", data: f.data, weight: 400 })),
      }),
    catch: (error) => new Error(`Satori generation failed : ${String(error)}`),
  });

  return svg;
});

export const generate = createServerFn().handler(async () => {
  const result = await Effect.runPromise(
    program.pipe(
      Effect.provide(ServerLayer),
      Effect.mapError((err) => err.message),
      Effect.either,
    ),
  );

  return Either.match(result, {
    onLeft: (error) => ({ _tag: "Failure" as const, error }),
    onRight: (data) => ({ _tag: "Success" as const, data }),
  });
});
