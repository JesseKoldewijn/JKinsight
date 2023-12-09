import type { Meta, StoryObj } from "@storybook/react";

import { StorybookThemeWrapper } from "@/lib/storybook/theme-wrapper";
import { cn } from "@/lib/utils";

import { Button as ButtonComponent } from "./button";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ButtonComponent> = {
  component: ButtonComponent,
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const ButtonDark: Story = {
  args: {
    //👇 The args you need here will depend on your component
    children: "Hello I'm a button!",
    variant: "outline",
    size: "sm",
    className: cn("bg-neutral-900 px-3 py-2 dark:hover:bg-neutral-900"),
  },
  decorators: [StorybookThemeWrapper("dark")],
};

export const ButtonLight: Story = {
  args: {
    //👇 The args you need here will depend on your component
    children: "Hello I'm a button!",
    variant: "outline",
    size: "sm",
    className: cn("bg-neutral-900 px-3 py-2 dark:hover:bg-neutral-900"),
  },
  decorators: [StorybookThemeWrapper("light")],
};
