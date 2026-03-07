import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = {};

export default function LetterFromFounder({}: Props) {
  return (
    <Card className="px-20">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2 text-center">
          <CardTitle>A Letter from the Founder</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className=" mx-auto">
          Dear Punting Enthusiast,
          <br />
          <br />
          For over sixty years, I`ve been deeply immersed in the world of horse
          racing, a journey that has not only been my passion but also my
          greatest teacher. It is from this wealth of experience that Lay Back
          and Win was born, with a mission to revolutionize the way we bet. Our
          Thoroughbred Market Analysis is the cornerstone of a new era in
          punting, giving you an unparalleled edge by leveraging the pulse of
          real-time market dynamics.
          <br />
          <br />
          Our philosophy is simple: true success in betting comes from
          discipline, not chance. Unlike the average bettor who succumbs to the
          temptation of chasing losses, Lay Back and Win champions a disciplined
          approach. With a prudent bankroll strategy limiting risk to just 5%,
          our members enjoy a winning strike rate of 65-75%, thanks to our
          strategic backing and laying techniques.
          <br />
          <br />
          We have turned away from the outdated wisdom that has long governed
          the betting world, instead treating the racing markets with the same
          analytical rigor one would apply to stocks or commodities. Our system,
          accredited and refined, operates with the precision of a finely tuned
          instrument, ensuring that decisions are data-driven and free from the
          whims of emotion.
          <br />
          <br />
          Ease of use is a key feature of our service, designed to be as
          user-friendly as a smartphone. This allows our system to work for you
          seamlessly, giving you the liberty to carry on with your life,
          confident in the knowledge that your betting strategy is in capable
          hands, executing with pre-set targets and stop losses to safeguard
          your interests.
          <br />
          <br />
          Integrity is the keystone of Lay Back and Win. In partnership with
          Betfair, we adhere to the highest standards of data integrity. Our
          commitment is to provide you with a means to build a passive income
          through betting, backed by a steadfast promise of achieving modest yet
          consistent targets to help ease the burdens of today`s cost of living.
          <br />
          <br />
          Lay Back and Win is more than just a betting service; it is a
          transformation into a disciplined, analytical, and strategic
          investment in the racing markets. It`s my privilege to offer you the
          tools for a rewarding and sustainable betting journey.
          <br />
          <br />
          Join us, and let`s change the game together.
          <br />
          <br />
          Warmest regards,
          <br />
          John
          <br />
          Founder of Lay Back and Win
        </p>
      </CardContent>
    </Card>
  );
}
