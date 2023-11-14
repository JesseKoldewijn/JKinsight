"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ThemeToggle from "@/components/ui/theme-toggle";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

import NavigationMenuMobile from "./mobile/navigationMenuMobile";
import NavbarMenu from "./navigationMenu";

const Navbar = () => {
  const [scrollPositionStyle, setScrollPosition] =
    useState("relative px-8 mb-4");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      setScrollPosition(
        cn(scrollTop > 40 ? "fixed top-0 px-6 pl-4" : "relative mb-4 px-8"),
      );
    });

    return () => {
      window.removeEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        setScrollPosition(
          cn(scrollTop > 40 ? "fixed top-0 px-6 pl-4" : "relative mb-4 px-8"),
        );
      });
    };
  }, []);

  return (
    <nav
      className={cn(
        scrollPositionStyle,
        "z-50 flex w-full bg-[rgba(255,255,255,0.75)] py-4 dark:bg-[rgba(18,18,18,0.65)]",
      )}
    >
      <section className="my-auto mr-auto">
        <Link
          href="/"
          id="JKinsight logo"
          className="flex font-semibold duration-500 hover:underline hover:underline-offset-4"
        >
          {appConfig.branding.brandName}
        </Link>
      </section>
      <section className="my-auto flex flex-1 justify-center">
        <NavbarMenu />
      </section>
      <section className="my-auto ml-auto flex gap-4">
        <NavigationMenuMobile />
        <ThemeToggle />
      </section>
    </nav>
  );
};

export default Navbar;
