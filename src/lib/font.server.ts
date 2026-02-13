import { Config, Context, Effect, Layer } from "effect";
import { FileSystem, Path } from "@effect/platform";
import { env } from "cloudflare:workers";
import { NodeContext } from "@effect/platform-node";

export class FontService extends Context.Tag("FontService")<
  FontService,
  { readonly getFonts: Effect.Effect<{ name: string; data: ArrayBuffer }[], Error> }
>() {}

const getArrayBufferInDevelopment = (path: string) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const uint8 = yield* fs.readFile(path);
    const buffer = uint8.buffer;

    if (buffer instanceof ArrayBuffer) {
      return buffer;
    }

    const copy = new ArrayBuffer(buffer.byteLength);
    new Uint8Array(copy).set(new Uint8Array(buffer));
    return copy;
  });

const fetchFontsDevelopment = Effect.gen(function* () {
  const paths = yield* Config.array(Config.string(), "FONT_PATHS");
  const pathService = yield* Path.Path;
  const concurrency = yield* Config.integer("FONT_LOAD_CONCURRENCY").pipe(Config.withDefault(10));

  return yield* Effect.all(
    paths.map((path) =>
      getArrayBufferInDevelopment(path).pipe(
        Effect.map((data) => ({ name: pathService.basename(path), data })),
      ),
    ),
    { concurrency },
  );
});

const getArrayBufferInProduction = (path: string) =>
  Effect.gen(function* () {
    const response = yield* Effect.tryPromise(() => env.ASSETS.fetch(new URL(path, "http://i")));
    return yield* Effect.tryPromise(() => response.arrayBuffer());
  });

const fetchFontsProduction = Effect.gen(function* () {
  const paths = yield* Config.array(Config.string(), "FONT_PATHS");
  const pathService = yield* Path.Path;
  const concurrency = yield* Config.integer("FONT_LOAD_CONCURRENCY").pipe(Config.withDefault(10));

  return yield* Effect.all(
    paths.map((path) =>
      getArrayBufferInProduction(path).pipe(
        Effect.map((data) => ({ name: pathService.basename(path), data })),
      ),
    ),
    { concurrency },
  );
});

export const FontServiceLive = Layer.effect(
  FontService,
  Effect.gen(function* () {
    const getFonts = import.meta.env.DEV
      ? yield* fetchFontsDevelopment.pipe(
          Effect.provide(NodeContext.layer),
          Effect.mapError((err) => new Error(String(err))),
          Effect.cached,
        )
      : yield* fetchFontsProduction.pipe(
          Effect.provide(Path.layer),
          Effect.mapError((err) => new Error(String(err))),
          Effect.cached,
        );

    return FontService.of({ getFonts });
  }),
).pipe(Layer.provide(import.meta.env.DEV ? NodeContext.layer : Path.layer));
