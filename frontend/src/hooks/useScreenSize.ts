import { useEffect, useState } from "react";
import { WindowSize } from "types";

interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): WindowDimensions => {
  if (typeof window == "undefined") {
    return {
      width: 1500,
      height: 1000,
    };
  }

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const findScreenSizeFromDimensions = (windowDimensions: WindowDimensions): WindowSize => {
  if (windowDimensions.width < 640) return WindowSize.sm;
  if (windowDimensions.width < 832) return WindowSize.md;
  if (windowDimensions.width < 1024) return WindowSize.lg;

  return WindowSize.xl;
};

const useScreenSize = (): WindowSize => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return findScreenSizeFromDimensions(windowDimensions);
};

export default useScreenSize;
