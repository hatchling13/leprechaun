import { Layer } from "effect";
import { FontServiceLive } from "./font.server";
import { NodeFileSystem, NodePath } from "@effect/platform-node";

export const ServerLayer = FontServiceLive.pipe(
  Layer.provide(NodeFileSystem.layer),
  Layer.provide(NodePath.layer),
);
