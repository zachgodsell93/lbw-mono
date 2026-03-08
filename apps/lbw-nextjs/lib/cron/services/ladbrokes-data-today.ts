import axios from "axios";
import moment from "moment";
import { createServiceClient } from "@/utils/supabase/service";
import { log } from "@/lib/cron/logger";

const supabase = createServiceClient();

const LADBROKES_HEADERS = {
  From: "info@laybackandwin.com.au",
  "X-Partner": "Firenze Pty Ltd",
};

async function getTodaysMeetings(category: string, country: string) {
  const today = moment().subtract(1, "days").format("YYYY-MM-DD");
  const end = moment().add(1, "days").format("YYYY-MM-DD");

  const url =
    "https://api-affiliates.ladbrokes.com.au/affiliates/v1/racing/meetings";

  const params = {
    date_from: today,
    date_to: end,
    format: "json",
    country: country,
    category: category,
    limit: 200,
  };

  const response = await axios.get(url, { headers: LADBROKES_HEADERS, params });
  const cleanedData: any[] = [];

  if (response.data.data.meetings && response.data.data.meetings.length > 0) {
    for (const meeting of response.data.data.meetings) {
      try {
        for (const race of meeting.races) {
          cleanedData.push({
            meeting_id: meeting.meeting,
            event_id: race.id,
            venue_name: meeting.name,
            distance: race.distance,
            start_time: race.start_time,
            meeting_date: moment(meeting.date)
              .add(10, "hours")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
            category: meeting.category,
            race_number: race.race_number,
            status: race.status,
          });
        }
      } catch (error: any) {
        log({
          message: "getLadbrokesDataForToday: error processing meeting",
          status: 500,
          level: "error",
          data: { venue: meeting.name, error: error.message ?? error },
        });
      }
    }
  }

  return cleanedData;
}

export async function executeLadbrokesDataForToday(): Promise<void> {
  const categories = ["T"];
  const countries = ["AUS", "NZ"];

  for (const category of categories) {
    for (const country of countries) {
      try {
        const todaysMeetings = await getTodaysMeetings(category, country);

        const { error } = await supabase
          .from("ladbrokes_data")
          .upsert(todaysMeetings, { onConflict: "event_id" })
          .select();

        if (error) {
          log({
            message: "getLadbrokesDataForToday: upsert error",
            status: 500,
            level: "error",
            data: { category, country, error },
          });
        }
      } catch (error: any) {
        log({
          message: "getLadbrokesDataForToday: failed",
          status: 500,
          level: "error",
          data: { category, country, error: error.message ?? error },
        });
      }
    }
  }

  log({
    message: "getLadbrokesDataForToday: finished processing all categories and countries",
    status: 200,
    level: "info",
    data: { categories, countries },
  });
}
