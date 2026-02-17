import { HeaderImage, type HeaderImageParams } from "@/header-image";
import { FontService, FontServiceLive } from "./font";
import { Effect } from "effect";
import { SatoriLive, SatoriService } from "./svg";

export const generate = (width = 1600, height = 900, props: HeaderImageParams) =>
  Effect.gen(function* () {
    const { getFonts } = yield* FontService;
    const fonts = yield* getFonts;

    const { render } = yield* SatoriService;

    return yield* render(<HeaderImage width={width} height={height} {...props} />, {
      width,
      height,
      fonts,
    });
  }).pipe(Effect.provide(FontServiceLive), Effect.provide(SatoriLive));
