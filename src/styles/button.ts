import { css } from "@panda/css";

export const button = css({
  transition: "colors",
  transitionDuration: "150ms",
  bgColor: "teal.600",
  rounded: "lg",
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold",
  color: "white",
  _hover: {
    bgColor: "teal.500",
  },
  _active: {
    bgColor: "teal.600",
  },
});
