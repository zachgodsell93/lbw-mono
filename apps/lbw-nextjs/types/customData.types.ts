import { Database } from "./supabase.types";

export type TrendMarketData = {
  Row: {
    bets_placed: boolean;
    country: string | null;
    event_date: string | null;
    event_id: string | null;
    event_name: string | null;
    id: number;
    market_id: string | null;
    market_name: string | null;
    market_start_time: string | null;
    race_type: string | null;
    runner_count: number | null;
    starter_combo_strat: boolean;
    starter_package_include: boolean | null;
    tbb4_excluded: boolean | null;
    venue: string | null;
    venue_excluded: boolean | null;
    options: boolean | null;
    runners: Database["public"]["Tables"]["betfair_selection_data"]["Row"][];
  };
  Insert: {
    bets_placed?: boolean;
    country?: string | null;
    event_date?: string | null;
    event_id?: string | null;
    event_name?: string | null;
    id?: number;
    market_id?: string | null;
    market_name?: string | null;
    market_start_time?: string | null;
    race_type?: string | null;
    runner_count?: number | null;
    starter_combo_strat?: boolean;
    starter_package_include?: boolean | null;
    tbb4_excluded?: boolean | null;
    venue?: string | null;
    venue_excluded?: boolean | null;
  };
  Update: {
    bets_placed?: boolean;
    country?: string | null;
    event_date?: string | null;
    event_id?: string | null;
    event_name?: string | null;
    id?: number;
    market_id?: string | null;
    market_name?: string | null;
    market_start_time?: string | null;
    race_type?: string | null;
    runner_count?: number | null;
    starter_combo_strat?: boolean;
    starter_package_include?: boolean | null;
    tbb4_excluded?: boolean | null;
    venue?: string | null;
    venue_excluded?: boolean | null;
  };
  Relationships: [];
};

type TrendResultsOriginal =
  Database["public"]["Views"]["member_selections_ladbrokes_prices"]["Row"];

export interface TrendResults extends TrendResultsOriginal {
  decision: string;
  multiplier: number | string;
  move: number | string;
  betResult: number;
  lbw_decision: string;
  lbw_units: number;
}

type WebsiteResultsDB = Database["public"]["Views"]["website_results"]["Row"];
export interface WebsiteResults extends WebsiteResultsDB {
  members_plus_total: number;
  members_total: number;
  date_formated: string;
}

export type PuntingFormLadbrokesData =
  Database["public"]["Views"]["punting_form_lb_data"]["Row"];
