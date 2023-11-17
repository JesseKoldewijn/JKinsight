import { type Metadata } from "next";
import { Suspense } from "react";

import dynamic from "next/dynamic";

import AnimatedGradientText from "@/components/animated/animated-grad-text";
import LastAttendedEvent from "@/components/events/last-attended";
import Avatar from "@/images/avatar.webp";
import { getAgeByDateString } from "@/lib/age";
import { animatedGradient } from "@/lib/prog-classes";
import { cn } from "@/lib/utils";
import { mostRecentExp } from "@/server/handlers/exp/getLatest";

const HeroSection = dynamic(
  () => import("@/components/layout/sections/HeroSection"),
  {
    ssr: true,
  },
);

export const metadata: Metadata = {
  openGraph: {
    title: "JKinsight",
    description: "My personal website.",
    url: "https://jkinsight.vercel.app",
  },
};

const Home = async () => {
  const IntroSection = async () => {
    const myAge = getAgeByDateString("1999-02-15");
    const latestExperience = await mostRecentExp();

    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        My name is{" "}
        <span className={cn(animatedGradient(), "font-bold")}>
          Jesse Koldewijn
        </span>
        , I&apos;m a {myAge} year old gamer, software engineer and tech
        enthusiast and currently working at
        <AnimatedGradientText
          variant="span"
          className="font-bold"
          text={` ${latestExperience?.company_name} `}
        />
        as a<br />
        <AnimatedGradientText
          variant="span"
          className="font-bold [background-size:105%]"
          text={` ${latestExperience?.title}`}
        />
      </p>
    );
  };

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: "JKinsight",
          description: "My personal website.",
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 pt-0 text-center md:pt-5 lg:pt-10">
        <h2 className="text-md font-semibold md:text-xl">
          Thanks for visiting my personal website!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          This website is used to showcase my projects, experience and
          volunteering. I also use this website to showcase my skills in web
          development, events I&apos;ve attended and possibly also a dev blog in
          the future.
        </p>
      </section>
      <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4 py-20 text-center">
        <h2 className="text-md font-semibold md:text-xl">
          A short introduction about me
        </h2>
        <Suspense>
          <IntroSection />
        </Suspense>
      </section>
      <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <h3 className="text-md font-semibold md:text-xl">
          Speaking about events I&apos;ve attended...
        </h3>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Down below is the latest event I&apos;ve attended
        </p>
        <LastAttendedEvent />
      </section>
    </>
  );
};

export default Home;
