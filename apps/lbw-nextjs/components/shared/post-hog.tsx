"use client";

import React from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type Props = {
  children: React.ReactNode;
};

export default function PostHog({ children }: Props) {
  if (typeof window !== "undefined") {
    posthog.init(process.env.POSTHOG_KEY as string, {
      api_host: process.env.POSTHOG_HOST as string,
    });
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
