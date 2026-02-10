import { Config, Context, Effect, Layer } from "effect";
import { FileSystem, Path } from "@effect/platform";

export class FontService extends Context.Tag("FontService")<
  FontService,
  { readonly getFonts: Effect.Effect<{ name: string; data: ArrayBuffer }[], Error> }
>() {}

const fetchFonts = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const pathService = yield* Path.Path;
  const paths = yield* Config.array(Config.string(), "FONT_PATHS");
  const concurrency = yield* Config.integer("FONT_LOAD_CONCURRENCY").pipe(Config.withDefault(10));

  return yield* Effect.all(
    paths.map((path) =>
      fs.readFile(path).pipe(
        Effect.map((uint8) => {
          const destination = new Uint8Array(new ArrayBuffer(uint8.byteLength));
          destination.set(uint8);

          return {
            name: pathService.basename(path),
            data: destination.buffer,
          };
        }),
      ),
    ),
    { concurrency },
  );
});

export const FontServiceLive = Layer.effect(
  FontService,
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const getFonts = yield* fetchFonts.pipe(
      Effect.provideService(FileSystem.FileSystem, fs),
      Effect.provideService(Path.Path, path),
      Effect.mapError((err) => new Error(String(err))),
      Effect.cached,
    );

    return FontService.of({ getFonts });
  }),
);
