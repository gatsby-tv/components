import { Size, Margin } from "@lib/types";

export const parseSize = (size: Size) => {
  if (typeof size === "number") {
    return `${100 * size}%`;
  } else {
    return size;
  }
};

export const parseMargin = (margin: Margin) => {
  return [margin]
    .flat()
    .map((size: Size) => parseSize(size))
    .join(" ");
};
