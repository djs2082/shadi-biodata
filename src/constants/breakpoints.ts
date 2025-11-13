export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.tablet}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet + 1}px) and (max-width: ${BREAKPOINTS.desktop}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop + 1}px)`,
  wide: `(min-width: ${BREAKPOINTS.wide}px)`,
} as const;

export default BREAKPOINTS;
