"use client";

import { animate } from "motion";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const NextThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextThemeInner>{children}</NextThemeInner>
    </ThemeProvider>
  );
};

const NextThemeInner = ({ children }: { children: React.ReactNode }) => {
  const themeRef = useRef<HTMLDivElement>(null);

  const [lastTheme, setLastTheme] = useState<string>();

  const { theme } = useTheme();

  useEffect(() => {
    if (themeRef.current && lastTheme !== theme) {
      const refElem = themeRef.current;

      animate(
        refElem,
        {
          opacity: [0, 1],
        },
        {
          duration: 1.2,
          easing: "ease-in-out",
        },
      );

      setLastTheme(() => theme ?? "system");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <div ref={themeRef}>{children}</div>;
};

export default NextThemeWrapper;
