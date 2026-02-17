import { Context, Data, Effect, Layer, Array as EffectArray } from "effect";
import type { ConfigError } from "effect/ConfigError";

export interface FontService {
  readonly getFonts: Effect.Effect<{ name: string; data: ArrayBuffer }[], ConfigError>;
}

export const FontService = Context.GenericTag<FontService>("FontService");

class FetchError extends Data.TaggedError("FetchError")<{
  readonly path: string;
  readonly message: string;
}> {}

const loadFont = (path: string) =>
  Effect.tryPromise({
    try: () => fetch(path),
    catch: () => new FetchError({ path, message: "Network connection failed" }),
  }).pipe(
    Effect.filterOrElse(
      (res) => res.ok,
      (res) =>
        Effect.fail(new FetchError({ path, message: `HTTP ${res.status}: ${res.statusText}` })),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.arrayBuffer(),
        catch: () => new FetchError({ path, message: "Failed to read binary data" }),
      }),
    ),
    Effect.map((data) => ({
      name: path.split("/").pop() ?? path,
      data,
    })),
    Effect.retry({ times: 2 }),
    Effect.timeout("5 seconds"),
    Effect.catchTag("TimeoutException", () =>
      Effect.fail(new FetchError({ path, message: "Request timed out after 5 seconds" })),
    ),
    Effect.either,
  );

export const FontServiceLive = Layer.effect(
  FontService,
  Effect.gen(function* () {
    const rawPaths = import.meta.env.VITE_FONT_PATHS;

    const paths = rawPaths
      .split(",")
      .map((p: string) => p.trim())
      .filter(Boolean);

    const getFonts = yield* Effect.all(paths.map(loadFont), { concurrency: "inherit" }).pipe(
      Effect.map((results) => EffectArray.partitionMap(results, (e) => e)),
      Effect.tap(([errors]) =>
        errors.length > 0
          ? Effect.logWarning(`Failed to load ${errors.length} fonts`).pipe(
              Effect.annotateLogs({
                total_errors: errors.length,
                failed_paths: errors.map((e) => e.path),
              }),
            )
          : Effect.void,
      ),
      Effect.map(([_, fonts]) => fonts),
      Effect.cached,
    );

    return FontService.of({ getFonts });
  }),
);
