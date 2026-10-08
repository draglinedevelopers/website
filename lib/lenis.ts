import type Lenis from "lenis";

/** The active Lenis instance (null with reduced motion or before mount), shared so UI can pause it. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
