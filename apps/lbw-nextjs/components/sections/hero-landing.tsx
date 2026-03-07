import Link from "next/link";

// import { env } from "@/env.mjs";
// import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        {/* <Link
          href="https://twitter.com/miickasmt/status/1719892161095745801"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Introducing on{" "}
          <Icons.twitter className="ml-2 size-3.5" />
        </Link> */}

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Betting Automation{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-300 bg-clip-text text-transparent font-extrabold">
            Made Easy
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Unlock Your Winning Potential with The Lay Back Strategy: Harnessing
          Proven Thoroughbred Market Analysis for a Winning Edge Based on
          Real-Time Market Dynamics.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 animate-bounce"
            )}
          >
            <span>7 Day Free Trial</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href="/our-results"
            // href={siteConfig.links.github}
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "px-5"
            )}
          >
            Our Results
          </Link>
        </div>
      </div>
    </section>
  );
}
