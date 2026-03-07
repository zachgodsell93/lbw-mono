"use client";
import React, { useEffect } from "react";
// import { getUser } from "../utils/supabaseClient";
import { supabase } from "@/utils/supabase/client";
import { Database } from "@/types/supabase.types";
import moment from "moment";
import { useToast } from "@/components/ui/use-toast";
import { bestOfTheDay } from "@/utils/ratings";
import { PuntingFormLadbrokesData } from "@/types/customData.types";

type RatingsDB = Database["public"]["Views"]["punting_form_lb_data"]["Row"];

// initialize context
interface RatingsContextType {
  bestOfDayData: {
    backs: PuntingFormLadbrokesData[];
    lays: PuntingFormLadbrokesData[];
    value: PuntingFormLadbrokesData[];
  } | null;
  maxRaceNumber: number;
  raceData: RatingsDB[] | null;
  selectedRace: SelectorTableData | null;
  selectedRaceData: RatingsDB[] | null;
  selectorTableData: SelectorTableData[];
  setRace: (event_id: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  changeDate: (day: string) => void;
}

const initialState = {
  bestOfDayData: null,
  maxRaceNumber: 2,
  raceData: null,
  selectedRace: null,
  selectedRaceData: null,
  selectorTableData: [],
  setRace: () => {},
  scrollRef: React.createRef<HTMLDivElement>(),
  changeDate: () => {},
};

export const RatingsContext =
  React.createContext<RatingsContextType>(initialState);
RatingsContext.displayName = "RatingsContext";

// useDesigner to use context
export const useRatings = () => {
  const context = React.useContext(RatingsContext);

  return context;
};

export interface RatingsProviderProps {
  children: React.ReactNode;
}

export interface VenueRaces {
  event_id: string;
  raceno: number;
  meeting_track_name: string;
  start_time: string;
}

export interface SelectorTableData {
  venue: {
    name: string;
    races: VenueRaces[];
  };
}

export const RatingsProvider = ({ children }: RatingsProviderProps) => {
  const [raceData, setRaceData] = React.useState<RatingsDB[] | null>(null);
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [selectedRace, setSelectedRace] =
    React.useState<SelectorTableData | null>(null);
  const [selectedRaceData, setSelectedRaceData] = React.useState<
    RatingsDB[] | null
  >(null);
  const [maxRaceNumber, setMaxRaceNumber] = React.useState(2);
  const [selectorTableData, setSelectorTableData] = React.useState<
    SelectorTableData[]
  >([]);
  const [bestOfDayData, setBestOfDay] = React.useState<{
    backs: any[];
    lays: any[];
    value: any[];
  } | null>(null);

  const { toast } = useToast();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("punting_form_lb_data")
      .select("*")
      .eq("meeting_datestamp", `${date} 13:00:00`);

    if (error) {
      toast({
        title: "Error Fetching Data",
        description:
          "Please reload the page, if this error persits contact support",
        variant: "destructive",
      });
      return;
    }
    const uniqueVenues = Array.from(
      new Set(data.map((item) => item.meeting_track_name))
    );
    // Need an array like this:
    // [{venue: {name: "venue", races:[{raceNo: 1, event_id: "event_id", start_time: "start_time", data: [{}, {}]}, {raceNo: 2, event_id: "event_id", start_time: "start_time", data: [{}, {}]}]}]
    const venueData = uniqueVenues.map((venue) => {
      const newData = data.filter((item) => item.meeting_track_name === venue);
      const uniqueRaces = Array.from(
        new Set(newData.map((item) => item.event_id))
      ).map((eventId) => {
        const race = newData.find((item) => item.event_id === eventId);
        return {
          meeting_track_name: race?.meeting_track_name,
          raceno: race?.raceno,
          event_id: race?.event_id,
          start_time: race?.start_time,
        };
      });

      const arrayItem = {
        venue: {
          name: venue,
          races: uniqueRaces,
        },
      };

      return arrayItem;
    });

    setSelectorTableData(venueData);

    const uniqueRaces = Array.from(new Set(data.map((item) => item.raceno)));

    const maxRaceNumber = Math.max(...uniqueRaces);

    setMaxRaceNumber(maxRaceNumber);

    const uniqueData = data.reduce((acc: RatingsDB[], curr: RatingsDB) => {
      const existingIndex = acc.findIndex(
        (item) =>
          item.event_id === curr.event_id &&
          item.pf_horsename === curr.pf_horsename
      );
      if (existingIndex === -1) {
        acc.push(curr);
      } else if (
        curr.colors_file_name !== null &&
        acc[existingIndex].colors_file_name === null
      ) {
        acc[existingIndex] = curr;
      }
      return acc;
    }, []);
    setRaceData(uniqueData);
    const botd = bestOfTheDay(data);
    setBestOfDay(botd);
  };

  const setRace = (event_id: string) => {
    const selectedRace = raceData?.filter((item) => item.event_id === event_id);
    const venue = selectedRace?.[0].meeting_track_name;
    const raceno = selectedRace?.[0].raceno;
    const raceSelectorData = selectorTableData.filter(
      (item) => item.venue.name === venue
    )[0];
    setSelectedRace(raceSelectorData);

    if (!selectedRace) return;
    setSelectedRaceData(selectedRace || []);
  };

  const changeDate = (day: string) => {
    const days = day === "today" ? 0 : 1;
    const newDate = moment().subtract(days, "days").format("YYYY-MM-DD");
    setDate(newDate);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [date]);

  if (!raceData) return;
  return (
    <RatingsContext.Provider
      value={{
        bestOfDayData,
        maxRaceNumber,
        raceData,
        selectedRace,
        selectedRaceData,
        selectorTableData,
        setRace,
        scrollRef,
        changeDate,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
};

// const SkeletonTable = () => {
//     return()
// }
