"use client";
import React, { useEffect } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";

type CountdownTextProps = {
  jumpTime: string;
  textClass?: string;
  boxClass?: string;
};

const CountdownText = ({
  jumpTime,
  textClass,
  boxClass,
}: CountdownTextProps) => {
  const [timeTilJump, setTimeTilJump] = React.useState("0s");

  // This is so that it updates the time when it is too long
  // When no seconds show it doesnt update the time til jump as such
  const [timeTrigger, setTimeTrigger] = React.useState(0);

  useEffect(() => {
    let now = moment().utc();
    let raceTime = moment(jumpTime).utc();
    let diff = raceTime.diff(now, "seconds");
    let minDiff = raceTime.diff(now, "minutes");
    if (diff < 60) {
      setTimeTilJump(`${diff}s`);
    } else if (diff > 60 && diff < 300) {
      setTimeTilJump(`${minDiff}m ${diff - minDiff * 60}s`);
    } else {
      setTimeTilJump(`${minDiff}m ${diff - minDiff * 60}s`);
    }
  }, [jumpTime]);

  useEffect(() => {
    setTimeout(() => {
      let now = moment().utc();
      let raceTime = moment(jumpTime).utc();
      let diff = raceTime.diff(now, "seconds");
      let minDiff = raceTime.diff(now, "minutes");
      let hourDiff = raceTime.diff(now, "hours");
      setTimeTrigger(diff);
      if (diff < 60) {
        setTimeTilJump(`${diff}s`);
      } else if (diff > 60 && diff < 600) {
        setTimeTilJump(`${minDiff}m ${diff - minDiff * 60}s`);
      } else if (diff > 600 && diff < 3600) {
        setTimeTilJump(`${minDiff}m`);
      } else {
        setTimeTilJump(`${hourDiff}h ${minDiff - hourDiff * 60}m`);
      }
    }, 1000);
  }, [timeTrigger]);

  return (
    <div
      className={cn(
        "px-2 rounded-md",
        boxClass,
        timeTrigger < 300
          ? "border-red-500 bg-red-400/30 border"
          : timeTrigger < 600
          ? "border border-orange-400 bg-orange-400/20"
          : "border border-slate-400 bg-slate-900"
      )}
    >
      <span className={cn("", textClass)}>
        {parseInt(timeTilJump) <= -60 ? "Closed" : timeTilJump}
      </span>
    </div>
  );
};

export default CountdownText;
