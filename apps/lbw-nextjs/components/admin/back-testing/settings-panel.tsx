"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { DatePicker } from "./date-picker";
import { Button } from "@/components/ui/button";
import { useBacktesting } from "@/providers/backtesting-provider";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {};

export type BacktestOptions = {
  min_runners: number | null;
  min_odds: number | null;
  max_odds: number | null;
  pf_rank: number | null;
  pass_key: string;
  early_settle_position: { type: "Over" | "Under"; value: number | null };
  speed_ratings: {
    200: { type: "Over" | "Under"; value: number | null; included: boolean };
    400: { type: "Over" | "Under"; value: number | null; included: boolean };
    600: { type: "Over" | "Under"; value: number | null; included: boolean };
  };
  venue_types: Array<"Metro" | "Provincial" | "Country">;
  selected_states: string[];
  selected_tracks: string[];
  start_date: string;
  end_date: string;
  test_range: string;
  track_condition: {
    min: { type: "Good" | "Soft" | "Heavy"; value: number };
    max: { type: "Good" | "Soft" | "Heavy"; value: number };
  };
  barriers: {
    min_barrier: number | null;
    max_barrier: number | null;
  };
};

export default function SettingsPanel({}: Props) {
  const [speedRatings, setSpeedRatings] = useState({
    200: { type: "Over", value: 0, included: false },
    400: { type: "Over", value: 0, included: false },
    600: { type: "Over", value: 0, included: false },
  });
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [unselectedStates, setUnselectedStates] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [unselectedTracks, setUnselectedTracks] = useState<string[]>([]);
  const [venueTypesList, setVenueTypesList] = useState<
    {
      venue: string | null;
      type: string | null;
      state: string | null;
    }[]
  >([]);
  const [trackCondition, setTrackCondition] = useState({
    min: { type: "Good", value: 3 },
    max: { type: "Heavy", value: 10 },
  });

  const [backTestingOptions, setBackTestingOptions] = useState<BacktestOptions>(
    {
      min_runners: 0,
      min_odds: 1.0,
      max_odds: 20.0,
      pf_rank: 2,
      pass_key: "",
      early_settle_position: { type: "Over", value: 0 },
      speed_ratings: {
        200: { type: "Over", value: 0, included: false },
        400: { type: "Over", value: 0, included: false },
        600: { type: "Over", value: 0, included: false },
      },
      venue_types: [] as Array<"Metro" | "Provincial" | "Country">,
      selected_states: [],
      selected_tracks: [],
      start_date: moment().add(-1, "week").format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      test_range: "Past week",
      track_condition: {
        min: { type: "Good", value: 3 },
        max: { type: "Heavy", value: 10 },
      },
      barriers: {
        min_barrier: 1,
        max_barrier: 10,
      },
    }
  );

  const [showPassKey, setShowPassKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { executeBacktest, getVenueTypes } = useBacktesting();

  const handleSelection = (
    item: string,
    direction: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    setUnselected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (direction === "right") {
      console.log("right");
      setSelected((prev) => [...prev, item]);
      setUnselected((prev) => prev.filter((i) => i !== item));
      setBackTestingOptions((prev) => ({
        ...prev,
        selected_tracks: [...prev.selected_tracks, item],
      }));
    } else {
      setUnselected((prev) => [...prev, item]);
      setSelected((prev) => prev.filter((i) => i !== item));
      setBackTestingOptions((prev) => ({
        ...prev,
        selected_tracks: prev.selected_tracks.filter((i) => i !== item),
      }));
    }
    console.log(backTestingOptions.selected_tracks);
  };

  const handleTrackSelection = (track: string, direction: string) => {
    handleSelection(track, direction, setSelectedTracks, setUnselectedTracks);
  };

  const togglePassKeyVisibility = () => {
    setShowPassKey(!showPassKey);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBackTestingOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    localStorage.setItem(name, value);
  };

  const handleTestRangeChange = (value: string) => {
    setBackTestingOptions((prev) => ({
      ...prev,
      test_range: value,
    }));
    localStorage.setItem("test_range", value);
    updateDateRange(value);
  };

  const updateDateRange = (range: string) => {
    const endDate = moment();
    let startDate: moment.Moment;

    switch (range) {
      case "Past week":
        startDate = moment().subtract(1, "week");
        break;
      case "Past month":
        startDate = moment().subtract(1, "month");
        break;
      case "3 months":
        startDate = moment().subtract(3, "months");
        break;
      case "6 months":
        startDate = moment().subtract(6, "months");
        break;
      case "12 months":
        startDate = moment().subtract(1, "year");
        break;
      default:
        startDate = moment().subtract(1, "week");
    }

    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");

    setBackTestingOptions((prev) => ({
      ...prev,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    }));
    localStorage.setItem("start_date", formattedStartDate);
    localStorage.setItem("end_date", formattedEndDate);
  };

  const handleStartDateChange = (date: Date) => {
    setBackTestingOptions((prev) => ({
      ...prev,
      start_date: date.toISOString(),
    }));
    localStorage.setItem("start_date", date.toISOString());
  };
  const handleEndDateChange = (date: Date) => {
    setBackTestingOptions((prev) => ({
      ...prev,
      end_date: date.toISOString(),
    }));
    localStorage.setItem("end_date", date.toISOString());
  };

  const startBackTest = async () => {
    // Set the backtesting options to local storage
    localStorage.setItem(
      "backtesting_options",
      JSON.stringify(backTestingOptions)
    );
    setIsLoading(true);
    await executeBacktest(backTestingOptions);
    setIsLoading(false);
  };

  const venueTypeChange = (venueType: string, checked: boolean) => {
    const safeVenueTypes = Array.isArray(backTestingOptions.venue_types)
      ? backTestingOptions.venue_types
      : [];

    const newVenueTypes = checked
      ? [...safeVenueTypes, venueType as "Metro" | "Provincial" | "Country"]
      : safeVenueTypes.filter((type) => type !== venueType);

    setBackTestingOptions((prev) => {
      const updatedOptions = {
        ...prev,
        venue_types: newVenueTypes,
      };

      const initialTracks = venueTypesList.filter((venue) =>
        backTestingOptions.selected_states.includes(venue.state ?? "")
      );

      const selTracks = initialTracks
        .filter((venue) =>
          newVenueTypes.includes(
            venue.type as "Metro" | "Provincial" | "Country"
          )
        )
        .map((track) => track.venue ?? "");

      setSelectedTracks(selTracks);
      setUnselectedTracks(
        venueTypesList
          .filter((venue) => !selTracks.includes(venue.venue ?? ""))
          .map((track) => track.venue ?? "")
      );

      return {
        ...updatedOptions,
        selected_tracks: selTracks,
      };
    });
  };

  const stateChange = (state: string, value: boolean) => {
    // Update selected states
    setBackTestingOptions((prev) => ({
      ...prev,
      selected_states: value
        ? [...prev.selected_states, state]
        : prev.selected_states.filter((s) => s !== state),
    }));

    const initialTracks = venueTypesList.filter((venue) =>
      backTestingOptions.venue_types.includes(
        venue.type as "Metro" | "Provincial" | "Country"
      )
    );

    // Get tracks for this state
    const stateTracks = initialTracks
      .filter((venue) => venue.state === state)
      .map((venue) => venue.venue ?? "");

    if (value) {
      // Adding state - add its tracks to selected tracks
      setSelectedTracks((prev) =>
        Array.from(new Set([...prev, ...stateTracks]))
      );
      setUnselectedTracks((prev) =>
        prev.filter((track) => !stateTracks.includes(track))
      );

      // Update backtesting options tracks
      setBackTestingOptions((prev) => ({
        ...prev,
        selected_tracks: Array.from(
          new Set([...prev.selected_tracks, ...stateTracks])
        ),
      }));
    } else {
      // Removing state - remove its tracks from selected tracks
      setSelectedTracks((prev) =>
        prev.filter((track) => !stateTracks.includes(track))
      );
      setUnselectedTracks((prev) =>
        Array.from(new Set([...prev, ...stateTracks]))
      );

      // Update backtesting options tracks
      setBackTestingOptions((prev) => ({
        ...prev,
        selected_tracks: prev.selected_tracks.filter(
          (track) => !stateTracks.includes(track)
        ),
      }));
    }
  };

  const handleVenueTypes = async () => {
    const vt = await getVenueTypes();
    setVenueTypesList(vt);
    const distinctStates = Array.from(
      new Set(vt.map((venueType) => venueType.state ?? ""))
    );
    const distinctVenues = Array.from(
      new Set(vt.map((venueType) => venueType.venue ?? ""))
    );
    const distinctTypes = Array.from(
      new Set(vt.map((venueType) => venueType.type ?? ""))
    );
    setVenueTypesList(vt);

    return {
      states: distinctStates,
      venues: distinctVenues,
      types: distinctTypes,
    };
  };

  const handleInitialLoad = async () => {
    const { states, venues, types } = await handleVenueTypes();

    const backtestingOptions = localStorage.getItem("backtesting_options");
    if (backtestingOptions) {
      try {
        const parsedOptions = JSON.parse(backtestingOptions);
        const safeVenueTypes = Array.isArray(parsedOptions.venue_types)
          ? parsedOptions.venue_types
          : [];

        setBackTestingOptions((prev) => ({
          ...prev,
          ...parsedOptions,
          venue_types: safeVenueTypes,
          selected_tracks: parsedOptions.selected_tracks,
        }));

        setSelectedTracks(parsedOptions.selected_tracks);
        setUnselectedTracks(
          venues
            .filter((venue) => !parsedOptions.selected_tracks.includes(venue))
            .map((track) => track)
        );

        // Rest of your initialization code...
      } catch (error) {
        console.error("Error parsing backtesting options:", error);
        setBackTestingOptions((prev) => ({
          ...prev,
          venue_types: [],
        }));
      }
    }
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Back Testing Settings</CardTitle>
        <CardDescription>
          Adjust all settings for backtesting in here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col w-1/2 space-y-6">
            <div>
              <Label htmlFor="min-runners">Min Runners</Label>
              <Input
                id="min-runners"
                className="w-24"
                type="number"
                value={backTestingOptions.min_runners ?? ""}
                onChange={(e) =>
                  setBackTestingOptions({
                    ...backTestingOptions,
                    min_runners:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                onBlur={(e) =>
                  setBackTestingOptions({
                    ...backTestingOptions,
                    min_runners:
                      e.target.value === "" ? 6 : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="min-runners">Barrier Range</Label>
              <div className="flex flex-row gap-x-2 items-center">
                <Input
                  id="min-barrier"
                  className="w-24"
                  type="number"
                  value={backTestingOptions.barriers.min_barrier ?? ""}
                  onChange={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      barriers: {
                        ...backTestingOptions.barriers,
                        min_barrier:
                          e.target.value === "" ? null : Number(e.target.value),
                      },
                    })
                  }
                  onBlur={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      barriers: {
                        ...backTestingOptions.barriers,
                        min_barrier:
                          e.target.value === "" ? 1 : Number(e.target.value),
                      },
                    })
                  }
                />
                {" - "}
                <Input
                  id="max-barrier"
                  className="w-24"
                  type="number"
                  value={backTestingOptions.barriers.max_barrier ?? ""}
                  onChange={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      barriers: {
                        ...backTestingOptions.barriers,
                        max_barrier:
                          e.target.value === "" ? null : Number(e.target.value),
                      },
                    })
                  }
                  onBlur={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      barriers: {
                        ...backTestingOptions.barriers,
                        max_barrier:
                          e.target.value === "" ? 10 : Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="min-runners">Track Condition</Label>
              <div className="flex flex-row gap-x-2 items-center">
                <Select
                  value={
                    backTestingOptions.track_condition.min?.value.toString() ||
                    ""
                  }
                  onValueChange={(value) => {
                    const numValue = parseInt(value);
                    const selectedCondition = trackConditions.find(
                      (c) => c.value === numValue
                    );

                    if (
                      selectedCondition &&
                      numValue <= backTestingOptions.track_condition.max.value
                    ) {
                      setBackTestingOptions({
                        ...backTestingOptions,
                        track_condition: {
                          ...backTestingOptions.track_condition,
                          min: {
                            type: selectedCondition.type as
                              | "Good"
                              | "Soft"
                              | "Heavy",
                            value: numValue,
                          },
                        },
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {trackConditions
                      .filter(
                        (condition) =>
                          condition.value <= trackCondition.max.value
                      )
                      .map((condition) => (
                        <SelectItem
                          key={condition.value}
                          value={condition.value.toString()}
                        >
                          {condition.type} ({condition.value})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {" - "}
                <Select
                  value={backTestingOptions.track_condition.max.value.toString()}
                  onValueChange={(value) => {
                    const numValue = parseInt(value);
                    const selectedCondition = trackConditions.find(
                      (c) => c.value === numValue
                    );

                    if (
                      selectedCondition &&
                      numValue >= trackCondition.min.value
                    ) {
                      setBackTestingOptions({
                        ...backTestingOptions,
                        track_condition: {
                          ...backTestingOptions.track_condition,
                          max: {
                            type: selectedCondition.type as
                              | "Good"
                              | "Soft"
                              | "Heavy",
                            value: numValue,
                          },
                        },
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {trackConditions
                      .filter(
                        (condition) =>
                          condition.value >=
                          backTestingOptions.track_condition.min.value
                      )
                      .map((condition) => (
                        <SelectItem
                          key={condition.value}
                          value={condition.value.toString()}
                        >
                          {condition.type} ({condition.value})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Odds Range</Label>
              <div className="flex space-x-4 mt-2">
                <div>
                  <Label htmlFor="min-odds">Min Odds</Label>
                  <Input
                    id="min-odds"
                    type="number"
                    value={backTestingOptions.min_odds ?? ""}
                    onChange={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        min_odds:
                          e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                    onBlur={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        min_odds:
                          e.target.value === "" ? 1 : Number(e.target.value),
                      })
                    }
                    step="0.01"
                    min="1"
                    max={backTestingOptions.max_odds ?? ""}
                    className="w-24"
                  />
                </div>
                <div>
                  <Label htmlFor="max-odds">Max Odds</Label>
                  <Input
                    id="max-odds"
                    type="number"
                    value={backTestingOptions.max_odds ?? ""}
                    onChange={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        max_odds:
                          e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                    onBlur={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        max_odds:
                          e.target.value === "" ? 10 : Number(e.target.value),
                      })
                    }
                    step="0.01"
                    min={backTestingOptions.min_odds ?? 0}
                    max="1000"
                    className="w-24"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Early Settle Position</Label>
              <div className="flex space-x-2">
                <Select
                  value={backTestingOptions.early_settle_position.type}
                  onValueChange={(value) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      early_settle_position: {
                        ...backTestingOptions.early_settle_position,
                        type: value as "Over" | "Under",
                      },
                    })
                  }
                >
                  <SelectTrigger
                    className={
                      backTestingOptions.early_settle_position.type === "Under"
                        ? "bg-red-800/40"
                        : "bg-green-800/40"
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under">Under</SelectItem>
                    <SelectItem value="Over">Over</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={backTestingOptions.early_settle_position.value ?? ""}
                  onChange={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      early_settle_position: {
                        ...backTestingOptions.early_settle_position,
                        value:
                          e.target.value === "" ? null : Number(e.target.value),
                      },
                    })
                  }
                  onBlur={(e) =>
                    setBackTestingOptions({
                      ...backTestingOptions,
                      early_settle_position: {
                        ...backTestingOptions.early_settle_position,
                        value:
                          e.target.value === "" ? 1 : Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>PF Rank</Label>
              <Select
                value={backTestingOptions.pf_rank?.toString() ?? ""}
                onValueChange={(value) =>
                  setBackTestingOptions({
                    ...backTestingOptions,
                    pf_rank: value === "" ? null : Number(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Speed Ratings</Label>
              {[200, 400, 600].map((distance) => (
                <div
                  key={distance}
                  className="flex items-center space-x-2 mt-2"
                >
                  <span>{distance}m:</span>
                  <Select
                    value={
                      backTestingOptions.speed_ratings[
                        distance as keyof typeof speedRatings
                      ].type
                    }
                    onValueChange={(value) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        speed_ratings: {
                          ...backTestingOptions.speed_ratings,
                          [distance]: {
                            ...backTestingOptions.speed_ratings[
                              distance as keyof typeof speedRatings
                            ],
                            type: value as "Under" | "Over",
                          },
                        },
                      })
                    }
                  >
                    <SelectTrigger
                      className={
                        backTestingOptions.speed_ratings[
                          distance as keyof typeof speedRatings
                        ].type === "Under"
                          ? "bg-red-800/40 w-32"
                          : "bg-green-800/40 w-32"
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under">Under</SelectItem>
                      <SelectItem value="Over">Over</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    className="w-20"
                    value={
                      backTestingOptions.speed_ratings[
                        distance as keyof typeof speedRatings
                      ].value ?? ""
                    }
                    onChange={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        speed_ratings: {
                          ...backTestingOptions.speed_ratings,
                          [distance]: {
                            ...backTestingOptions.speed_ratings[
                              distance as keyof typeof speedRatings
                            ],
                            value:
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                          },
                        },
                      })
                    }
                    onBlur={(e) =>
                      setBackTestingOptions({
                        ...backTestingOptions,
                        speed_ratings: {
                          ...backTestingOptions.speed_ratings,
                          [distance]: {
                            ...backTestingOptions.speed_ratings[
                              distance as keyof typeof speedRatings
                            ],
                            value:
                              e.target.value === ""
                                ? 1
                                : Number(e.target.value),
                          },
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col w-full space-y-12">
            <div>
              <Label>Venue Types</Label>
              <div className="flex flex-row gap-x-4 mt-2">
                {["Metro", "Provincial", "Country"].map((type) => (
                  <div key={type} className="flex items-center py-2 space-x-2">
                    <Checkbox
                      id={`venue-${type}`}
                      checked={
                        Array.isArray(backTestingOptions.venue_types) &&
                        backTestingOptions.venue_types.includes(
                          type as "Metro" | "Provincial" | "Country"
                        )
                      }
                      onCheckedChange={(checked: boolean) =>
                        venueTypeChange(type, checked)
                      }
                    />
                    <Label htmlFor={`venue-${type}`}>{type}</Label>
                  </div>
                ))}
              </div>

              <div className="w-full pt-6">
                <Label className="text-xl font-bold">States</Label>
                <div className="grid grid-cols-5 gap-4 mt-2">
                  {venueTypesList
                    .map((venue) => venue.state)
                    .filter(
                      (state, index, self) =>
                        state && self.indexOf(state) === index
                    )
                    .sort()
                    .map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <Checkbox
                          id={`state-${state}`}
                          checked={backTestingOptions.selected_states.includes(
                            state!
                          )}
                          onCheckedChange={(checked) => {
                            stateChange(state as string, checked as boolean);
                          }}
                        />
                        <Label htmlFor={`state-${state}`}>{state}</Label>
                      </div>
                    ))}
                </div>
              </div>

              <div className="w-full pt-6">
                <Label className="text-xl font-bold">Tracks</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="w-1/2">
                    <Label>Unselected</Label>
                    <ul className="border rounded-md h-96 overflow-y-auto">
                      {unselectedTracks
                        .sort((a: string, b: string) => a.localeCompare(b))
                        .map((track) => (
                          <li
                            key={track}
                            className="p-2 hover:bg-green-700/20 cursor-pointer"
                            onClick={() => handleTrackSelection(track, "right")}
                          >
                            {track}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="w-1/2">
                    <Label>Selected</Label>
                    <ul className="border rounded-md h-96 overflow-y-auto">
                      {selectedTracks
                        .sort((a: string, b: string) => a.localeCompare(b))
                        .map((track) => (
                          <li
                            key={track}
                            className="p-2 hover:bg-red-700/20 cursor-pointer"
                            onClick={() => handleTrackSelection(track, "left")}
                          >
                            {track}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Separator className="my-4" />
        </div>
        <div className="flex flex-row w-full gap-x-6 gap-y-6">
          <div className="flex flex-col gap-y-6  w-1/4">
            <div>
              <Label>Pass Key</Label>
              <div className="relative">
                <Input
                  name="pass_key"
                  placeholder="Pass Key"
                  value={backTestingOptions.pass_key}
                  onChange={handleChange}
                  type={showPassKey ? "text" : "password"}
                />
                <EyeIcon
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePassKeyVisibility}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-1/4">
            <div>
              <Label htmlFor="test_range">Test Range</Label>
              <Select
                onValueChange={handleTestRangeChange}
                value={backTestingOptions.test_range}
              >
                <SelectTrigger id="test_range">
                  <SelectValue placeholder="Select test range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Past week">Past week</SelectItem>
                  <SelectItem value="Past month">Past month</SelectItem>
                  <SelectItem value="3 months">3 months</SelectItem>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="12 months">12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-1/4">
            <div>
              <Label>Start Date</Label>
              <DatePicker
                date={new Date(backTestingOptions.start_date)}
                setDate={handleStartDateChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-1/4">
            <div>
              <Label>End Date</Label>
              <DatePicker
                date={new Date(backTestingOptions.end_date)}
                setDate={handleEndDateChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 justify-end">
        <Button
          className="w-full"
          onClick={startBackTest}
          disabled={isLoading}
          // disabled={true}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Start Back Test"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

const trackConditions = [
  {
    type: "Good",
    value: 3,
  },
  {
    type: "Good",
    value: 4,
  },
  {
    type: "Soft",
    value: 5,
  },
  {
    type: "Soft",
    value: 6,
  },
  {
    type: "Soft",
    value: 7,
  },
  {
    type: "Heavy",
    value: 8,
  },
  {
    type: "Heavy",
    value: 9,
  },
  {
    type: "Heavy",
    value: 10,
  },
];
