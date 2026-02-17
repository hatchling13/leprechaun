import { css } from "@panda/css";

export const main = css({
  position: "relative",
  blockSize: "full",
  inlineSize: "full",
  background: "oklch(100% 0 0 / 1)",
  borderRadius: "3xl",
  border: "1px solid oklch(100% 0 0 / 0.1)",
  boxShadow: "0 20px 50px oklch(20% 0.02 150 / 0.08)",
  padding: "8",
  display: "flex",
  gap: "4",
  placeContent: "center",
  placeItems: "center",
});
