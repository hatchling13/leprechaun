import { css } from "@panda/css";

// Shared field wrapper
export const fieldStack = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5",
});

// Label styling
export const labelStyle = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "slate.600",
});

// Input styling
export const inputStyle = css({
  px: "4",
  py: "2",
  rounded: "md",
  border: "1px solid",
  borderColor: "slate.200",
  outline: "none",
  fontSize: "md",
  transition: "all 0.2s",
  _focus: {
    borderColor: "teal.500",
    ring: "2px",
    ringColor: "teal.500/20",
  },
});

// Small helper for theme buttons
export const themeBtn = css({
  cursor: "pointer",
  fontSize: "sm",
  color: "teal.900/60",
  _hover: { color: "teal.900" },
  fontWeight: "bold",
});
