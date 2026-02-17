import { Context, Layer, Effect } from "effect";
import type { ReactNode } from "react";
import type { SatoriOptions } from "satori/standalone";
import satori, { init } from "satori/standalone";

export interface SatoriService {
  readonly render: (jsx: ReactNode, options: SatoriOptions) => Effect.Effect<string, Error>;
}

export const SatoriService = Context.GenericTag<SatoriService>("SatoriService");

export const SatoriLive = Layer.effect(
  SatoriService,
  Effect.gen(function* () {
    yield* Effect.tryPromise({
      try: async () => {
        const response = await fetch("/yoga.wasm");

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();

        await init(buffer);
      },
      catch: (error) => new Error(`Yoga/Satori init failed: ${error}`),
    });

    return {
      render: (jsx, options) =>
        Effect.gen(function* () {
          return yield* Effect.tryPromise({
            try: () => satori(jsx, options),
            catch: (e) => new Error(`Satori failed: ${e}`),
          });
        }),
    };
  }),
);
