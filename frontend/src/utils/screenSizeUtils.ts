import { WindowSize } from "types";

export const isScreenLargeOrExtraLarge = (screenSize: WindowSize): boolean => {
  return screenSize === WindowSize.lg || screenSize === WindowSize.xl;
};
