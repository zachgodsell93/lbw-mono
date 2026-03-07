export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "11.2.0 (c820efb)"
  }
  public: {
    Tables: {
      betfair_market_data: {
        Row: {
          bets_placed: boolean
          country: string | null
          event_date: string | null
          event_id: string | null
          event_name: string | null
          id: number
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          race_type: string | null
          runner_count: number | null
          starter_combo_strat: boolean
          starter_package_include: boolean | null
          tbb4_excluded: boolean | null
          venue: string | null
          venue_excluded: boolean | null
        }
        Insert: {
          bets_placed?: boolean
          country?: string | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: number
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          race_type?: string | null
          runner_count?: number | null
          starter_combo_strat?: boolean
          starter_package_include?: boolean | null
          tbb4_excluded?: boolean | null
          venue?: string | null
          venue_excluded?: boolean | null
        }
        Update: {
          bets_placed?: boolean
          country?: string | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: number
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          race_type?: string | null
          runner_count?: number | null
          starter_combo_strat?: boolean
          starter_package_include?: boolean | null
          tbb4_excluded?: boolean | null
          venue?: string | null
          venue_excluded?: boolean | null
        }
        Relationships: []
      }
      betfair_selection_data: {
        Row: {
          colors_file_name: string | null
          market_id: string | null
          runner_id: number | null
          runner_name: string | null
          selection_id: number
          status: string | null
          uuid: number | null
        }
        Insert: {
          colors_file_name?: string | null
          market_id?: string | null
          runner_id?: number | null
          runner_name?: string | null
          selection_id: number
          status?: string | null
          uuid?: number | null
        }
        Update: {
          colors_file_name?: string | null
          market_id?: string | null
          runner_id?: number | null
          runner_name?: string | null
          selection_id?: number
          status?: string | null
          uuid?: number | null
        }
        Relationships: []
      }
      betting_systems: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      bot_settings: {
        Row: {
          created_at: string | null
          id: number | null
          name: string | null
          settings: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          settings?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          name?: string | null
          settings?: Json | null
        }
        Relationships: []
      }
      cl_race_and_venue_exclusion: {
        Row: {
          created_at: string | null
          excluded: boolean | null
          id: number
          market_id: string | null
          user_id: number | null
          venue_excluded: boolean | null
        }
        Insert: {
          created_at?: string | null
          excluded?: boolean | null
          id?: number
          market_id?: string | null
          user_id?: number | null
          venue_excluded?: boolean | null
        }
        Update: {
          created_at?: string | null
          excluded?: boolean | null
          id?: number
          market_id?: string | null
          user_id?: number | null
          venue_excluded?: boolean | null
        }
        Relationships: []
      }
      cl_selection_override: {
        Row: {
          created_at: string | null
          market_id: string
          selection_id: number
          selection_name: string | null
          side: string
          units: number | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          market_id: string
          selection_id: number
          selection_name?: string | null
          side: string
          units?: number | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          market_id?: string
          selection_id?: number
          selection_name?: string | null
          side?: string
          units?: number | null
          user_id?: number
        }
        Relationships: []
      }
      cl_user_bot_settings: {
        Row: {
          active: boolean | null
          auth_id: string | null
          created_at: string
          greyhound: boolean | null
          harness: boolean | null
          horse: boolean | null
          id: string
          max_lay: number | null
          min_runners: number | null
          percent: number | null
          rank: number | null
          stake_size: number | null
          stop_loss: number | null
          take_profit: number | null
          time_before_jump: number | null
        }
        Insert: {
          active?: boolean | null
          auth_id?: string | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          id?: string
          max_lay?: number | null
          min_runners?: number | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          time_before_jump?: number | null
        }
        Update: {
          active?: boolean | null
          auth_id?: string | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          id?: string
          max_lay?: number | null
          min_runners?: number | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          take_profit?: number | null
          time_before_jump?: number | null
        }
        Relationships: []
      }
      cl_user_strategies: {
        Row: {
          active: boolean
          aus: boolean | null
          bet_side: string
          days_of_week: string | null
          end_time: string | null
          maximum_odds: number
          minimum_odds: number
          minimum_runners: number
          minimum_volume: number
          nz: boolean | null
          percent: number
          race_type: string | null
          rank: number
          scheduling: boolean
          stake: number
          start_time: string | null
          stop_loss: number | null
          strategy_id: string
          take_profit: number | null
          time_before_jump: number
          user_id: string | null
        }
        Insert: {
          active?: boolean
          aus?: boolean | null
          bet_side?: string
          days_of_week?: string | null
          end_time?: string | null
          maximum_odds?: number
          minimum_odds?: number
          minimum_runners?: number
          minimum_volume?: number
          nz?: boolean | null
          percent?: number
          race_type?: string | null
          rank?: number
          scheduling?: boolean
          stake?: number
          start_time?: string | null
          stop_loss?: number | null
          strategy_id?: string
          take_profit?: number | null
          time_before_jump: number
          user_id?: string | null
        }
        Update: {
          active?: boolean
          aus?: boolean | null
          bet_side?: string
          days_of_week?: string | null
          end_time?: string | null
          maximum_odds?: number
          minimum_odds?: number
          minimum_runners?: number
          minimum_volume?: number
          nz?: boolean | null
          percent?: number
          race_type?: string | null
          rank?: number
          scheduling?: boolean
          stake?: number
          start_time?: string | null
          stop_loss?: number | null
          strategy_id?: string
          take_profit?: number | null
          time_before_jump?: number
          user_id?: string | null
        }
        Relationships: []
      }
      daily_sheets: {
        Row: {
          betfair_market_id: number | null
          date: string | null
          date_time: string | null
          horse: string | null
          horseNumber: string | null
          id: number
          ladbrokes_event: string | null
          price: number | null
          raceNumber: string | null
          sheet: string | null
          time: string | null
          track: string | null
          uploaded_at: string
        }
        Insert: {
          betfair_market_id?: number | null
          date?: string | null
          date_time?: string | null
          horse?: string | null
          horseNumber?: string | null
          id?: number
          ladbrokes_event?: string | null
          price?: number | null
          raceNumber?: string | null
          sheet?: string | null
          time?: string | null
          track?: string | null
          uploaded_at?: string
        }
        Update: {
          betfair_market_id?: number | null
          date?: string | null
          date_time?: string | null
          horse?: string | null
          horseNumber?: string | null
          id?: number
          ladbrokes_event?: string | null
          price?: number | null
          raceNumber?: string | null
          sheet?: string | null
          time?: string | null
          track?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_sheets_betfair_market_id_fkey"
            columns: ["betfair_market_id"]
            isOneToOne: false
            referencedRelation: "betfair_market_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_sheets_ladbrokes_event_fkey"
            columns: ["ladbrokes_event"]
            isOneToOne: false
            referencedRelation: "ladbrokes_data"
            referencedColumns: ["event_id"]
          },
        ]
      }
      dev_bot_orders_placed: {
        Row: {
          bet_id: number
          bot_id: number | null
          customer_strategy_ref: string | null
          market_id: string | null
          order_status: string | null
          placed_date: string | null
          price: number | null
          selection_id: number | null
          side: string | null
          stake: number | null
          status: string | null
          strategy_code: string | null
        }
        Insert: {
          bet_id: number
          bot_id?: number | null
          customer_strategy_ref?: string | null
          market_id?: string | null
          order_status?: string | null
          placed_date?: string | null
          price?: number | null
          selection_id?: number | null
          side?: string | null
          stake?: number | null
          status?: string | null
          strategy_code?: string | null
        }
        Update: {
          bet_id?: number
          bot_id?: number | null
          customer_strategy_ref?: string | null
          market_id?: string | null
          order_status?: string | null
          placed_date?: string | null
          price?: number | null
          selection_id?: number | null
          side?: string | null
          stake?: number | null
          status?: string | null
          strategy_code?: string | null
        }
        Relationships: []
      }
      dev_bot_results: {
        Row: {
          bet_id: number
          bot_id: number | null
          customer_order_ref: string | null
          customer_strategy_ref: string | null
          event_id: string | null
          event_name: string | null
          event_type_id: string | null
          last_matched_date: string | null
          market_id: string | null
          outcome: string | null
          placed_date: string | null
          price_matched: number | null
          price_reduced: boolean | null
          price_requested: number | null
          profit: number | null
          selection_id: number | null
          selection_name: string | null
          settled_date: string | null
          side: string | null
          stake: number | null
        }
        Insert: {
          bet_id: number
          bot_id?: number | null
          customer_order_ref?: string | null
          customer_strategy_ref?: string | null
          event_id?: string | null
          event_name?: string | null
          event_type_id?: string | null
          last_matched_date?: string | null
          market_id?: string | null
          outcome?: string | null
          placed_date?: string | null
          price_matched?: number | null
          price_reduced?: boolean | null
          price_requested?: number | null
          profit?: number | null
          selection_id?: number | null
          selection_name?: string | null
          settled_date?: string | null
          side?: string | null
          stake?: number | null
        }
        Update: {
          bet_id?: number
          bot_id?: number | null
          customer_order_ref?: string | null
          customer_strategy_ref?: string | null
          event_id?: string | null
          event_name?: string | null
          event_type_id?: string | null
          last_matched_date?: string | null
          market_id?: string | null
          outcome?: string | null
          placed_date?: string | null
          price_matched?: number | null
          price_reduced?: boolean | null
          price_requested?: number | null
          profit?: number | null
          selection_id?: number | null
          selection_name?: string | null
          settled_date?: string | null
          side?: string | null
          stake?: number | null
        }
        Relationships: []
      }
      development_bots: {
        Row: {
          betfair_strategy_reference: string | null
          bot_active: boolean | null
          bot_id: number
          bot_name: string | null
          created_at: string
          greyhound: boolean | null
          harness: boolean | null
          horse: boolean | null
          in_play_enabled: boolean | null
          max_lay: number | null
          min_runners: number | null
          percent: number | null
          rank: number | null
          stake_size: number | null
          stop_loss: number | null
          take_profit: number | null
        }
        Insert: {
          betfair_strategy_reference?: string | null
          bot_active?: boolean | null
          bot_id?: number
          bot_name?: string | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          in_play_enabled?: boolean | null
          max_lay?: number | null
          min_runners?: number | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          take_profit?: number | null
        }
        Update: {
          betfair_strategy_reference?: string | null
          bot_active?: boolean | null
          bot_id?: number
          bot_name?: string | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          in_play_enabled?: boolean | null
          max_lay?: number | null
          min_runners?: number | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          take_profit?: number | null
        }
        Relationships: []
      }
      excluded_races_and_venues: {
        Row: {
          market_id: string | null
          type: string | null
          venue: string | null
        }
        Insert: {
          market_id?: string | null
          type?: string | null
          venue?: string | null
        }
        Update: {
          market_id?: string | null
          type?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      ladbrokes_data: {
        Row: {
          bf_market_id: string | null
          category: string | null
          created_at: string
          distance: number | null
          event_id: string
          meeting_date: string | null
          meeting_id: string | null
          race_number: number | null
          start_time: string | null
          status: string | null
          venue_name: string | null
        }
        Insert: {
          bf_market_id?: string | null
          category?: string | null
          created_at?: string
          distance?: number | null
          event_id: string
          meeting_date?: string | null
          meeting_id?: string | null
          race_number?: number | null
          start_time?: string | null
          status?: string | null
          venue_name?: string | null
        }
        Update: {
          bf_market_id?: string | null
          category?: string | null
          created_at?: string
          distance?: number | null
          event_id?: string
          meeting_date?: string | null
          meeting_id?: string | null
          race_number?: number | null
          start_time?: string | null
          status?: string | null
          venue_name?: string | null
        }
        Relationships: []
      }
      ladbrokes_prices: {
        Row: {
          barrier: number | null
          bf_market_id: string | null
          bf_selection_id: number | null
          created_at: string | null
          entrant_id: string
          event_id: string | null
          favourite: boolean | null
          flucs: string | null
          is_scratched: boolean | null
          market_mover: boolean | null
          market_name: string | null
          place_11am: number | null
          place_1min: number | null
          place_9am: number | null
          place_jump: number | null
          place_latest: number | null
          price_11am: number | null
          price_1min: number | null
          price_1min_captured_at: string | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          price_open: number | null
          race_start_time: string | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
        }
        Insert: {
          barrier?: number | null
          bf_market_id?: string | null
          bf_selection_id?: number | null
          created_at?: string | null
          entrant_id: string
          event_id?: string | null
          favourite?: boolean | null
          flucs?: string | null
          is_scratched?: boolean | null
          market_mover?: boolean | null
          market_name?: string | null
          place_11am?: number | null
          place_1min?: number | null
          place_9am?: number | null
          place_jump?: number | null
          place_latest?: number | null
          price_11am?: number | null
          price_1min?: number | null
          price_1min_captured_at?: string | null
          price_9am?: number | null
          price_jump?: number | null
          price_latest?: number | null
          price_open?: number | null
          race_start_time?: string | null
          result?: string | null
          runner_name?: string | null
          runner_number?: number | null
        }
        Update: {
          barrier?: number | null
          bf_market_id?: string | null
          bf_selection_id?: number | null
          created_at?: string | null
          entrant_id?: string
          event_id?: string | null
          favourite?: boolean | null
          flucs?: string | null
          is_scratched?: boolean | null
          market_mover?: boolean | null
          market_name?: string | null
          place_11am?: number | null
          place_1min?: number | null
          place_9am?: number | null
          place_jump?: number | null
          place_latest?: number | null
          price_11am?: number | null
          price_1min?: number | null
          price_1min_captured_at?: string | null
          price_9am?: number | null
          price_jump?: number | null
          price_latest?: number | null
          price_open?: number | null
          race_start_time?: string | null
          result?: string | null
          runner_name?: string | null
          runner_number?: number | null
        }
        Relationships: []
      }
      lay_only_premium: {
        Row: {
          entrant_id: string
          event_id: string | null
          horse_name: string | null
          horse_number: number | null
          is_scratched: boolean | null
          lay: boolean | null
          market_id: string | null
          market_start_time: string | null
          price_latest: number | null
          race_number: number | null
          selection_id: number | null
          venue: string | null
        }
        Insert: {
          entrant_id: string
          event_id?: string | null
          horse_name?: string | null
          horse_number?: number | null
          is_scratched?: boolean | null
          lay?: boolean | null
          market_id?: string | null
          market_start_time?: string | null
          price_latest?: number | null
          race_number?: number | null
          selection_id?: number | null
          venue?: string | null
        }
        Update: {
          entrant_id?: string
          event_id?: string | null
          horse_name?: string | null
          horse_number?: number | null
          is_scratched?: boolean | null
          lay?: boolean | null
          market_id?: string | null
          market_start_time?: string | null
          price_latest?: number | null
          race_number?: number | null
          selection_id?: number | null
          venue?: string | null
        }
        Relationships: []
      }
      logs_captains_lounge: {
        Row: {
          code: number | null
          data: Json | null
          log_time: string
          message: string | null
          status: string | null
          user_email: string | null
        }
        Insert: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Update: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      logs_frontend: {
        Row: {
          code: number | null
          data: Json | null
          log_time: string
          message: string | null
          status: string | null
          user_email: string | null
        }
        Insert: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Update: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      logs_members: {
        Row: {
          code: number | null
          data: Json | null
          log_time: string
          message: string | null
          status: string | null
          user_email: string | null
        }
        Insert: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Update: {
          code?: number | null
          data?: Json | null
          log_time?: string
          message?: string | null
          status?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      members_customer_selection: {
        Row: {
          created_at: string | null
          id: number
          market_id: string | null
          selection_id: number | null
          selection_name: string | null
          side: string | null
          units: number | null
        }
        Insert: {
          created_at?: string | null
          id: number
          market_id?: string | null
          selection_id?: number | null
          selection_name?: string | null
          side?: string | null
          units?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          market_id?: string | null
          selection_id?: number | null
          selection_name?: string | null
          side?: string | null
          units?: number | null
        }
        Relationships: []
      }
      ml_greyhound_selections: {
        Row: {
          bab: number | null
          box: number | null
          event_date: string | null
          event_name: string | null
          id: string
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          ml_pnl: number | null
          prob_winner: number | null
          rank: number | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          side_ml: string | null
          units_ml: number | null
        }
        Insert: {
          bab?: number | null
          box?: number | null
          event_date?: string | null
          event_name?: string | null
          id: string
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          ml_pnl?: number | null
          prob_winner?: number | null
          rank?: number | null
          runner_name?: string | null
          runner_number?: number | null
          selection_id?: number | null
          side_ml?: string | null
          units_ml?: number | null
        }
        Update: {
          bab?: number | null
          box?: number | null
          event_date?: string | null
          event_name?: string | null
          id?: string
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          ml_pnl?: number | null
          prob_winner?: number | null
          rank?: number | null
          runner_name?: string | null
          runner_number?: number | null
          selection_id?: number | null
          side_ml?: string | null
          units_ml?: number | null
        }
        Relationships: []
      }
      ml_horse_selections: {
        Row: {
          bab: number | null
          barrier: number | null
          event_date: string | null
          event_name: string | null
          horses_in_race: number | null
          id: string
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          ml_pnl: number | null
          ml_winner: string | null
          model: string | null
          prob_winner: number | null
          rank: number | null
          rel_prob: number | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          side_ml: string | null
          units_ml: number | null
        }
        Insert: {
          bab?: number | null
          barrier?: number | null
          event_date?: string | null
          event_name?: string | null
          horses_in_race?: number | null
          id: string
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          ml_pnl?: number | null
          ml_winner?: string | null
          model?: string | null
          prob_winner?: number | null
          rank?: number | null
          rel_prob?: number | null
          runner_name?: string | null
          runner_number?: number | null
          selection_id?: number | null
          side_ml?: string | null
          units_ml?: number | null
        }
        Update: {
          bab?: number | null
          barrier?: number | null
          event_date?: string | null
          event_name?: string | null
          horses_in_race?: number | null
          id?: string
          market_id?: string | null
          market_name?: string | null
          market_start_time?: string | null
          ml_pnl?: number | null
          ml_winner?: string | null
          model?: string | null
          prob_winner?: number | null
          rank?: number | null
          rel_prob?: number | null
          runner_name?: string | null
          runner_number?: number | null
          selection_id?: number | null
          side_ml?: string | null
          units_ml?: number | null
        }
        Relationships: []
      }
      ml_tommy_two_predictions: {
        Row: {
          age: number | null
          barrier: number | null
          barrier_avg: number | null
          claim: number | null
          clsdiff: number | null
          colors_file_name: string | null
          distance_avg: number | null
          event_date: string | null
          event_id: string | null
          favourite: string | null
          field_size_avg: number | null
          form_id: number | null
          horse_id: number | null
          horse_name: string | null
          horse_number: number | null
          id: number | null
          is_winner: number | null
          jockey: string | null
          jockey_id: number | null
          l600_rank: number | null
          last10: number | null
          lb_result: string | null
          lbw_rank: number | null
          margin_avg: number | null
          meeting_datestamp: string | null
          meeting_id: number | null
          meeting_meetingid: number | null
          meeting_track_name: string | null
          ml_winner: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          place_latest: number | null
          position_avg: number | null
          predicted_outcome: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          prob_winner: number | null
          race_distance: number | null
          race_grade: string | null
          race_id: number | null
          raceno: number | null
          record: number | null
          record_count: number | null
          record_distance: number | null
          record_first_up: string | null
          record_good: string | null
          record_heavy: string | null
          record_second_up: string | null
          record_soft: string | null
          record_track: number | null
          record_track_distance: number | null
          reliable: string | null
          sex: string | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_per_hundred_avg: number | null
          time_ranking: number | null
          track_condition_avg: number | null
          trainer: string | null
          trainer_id: number | null
          weight: number | null
          weight_avg: number | null
          weight_class_ranl: number | null
          weight_restrictions: string | null
          weight_type: string | null
        }
        Insert: {
          age?: number | null
          barrier?: number | null
          barrier_avg?: number | null
          claim?: number | null
          clsdiff?: number | null
          colors_file_name?: string | null
          distance_avg?: number | null
          event_date?: string | null
          event_id?: string | null
          favourite?: string | null
          field_size_avg?: number | null
          form_id?: number | null
          horse_id?: number | null
          horse_name?: string | null
          horse_number?: number | null
          id?: number | null
          is_winner?: number | null
          jockey?: string | null
          jockey_id?: number | null
          l600_rank?: number | null
          last10?: number | null
          lb_result?: string | null
          lbw_rank?: number | null
          margin_avg?: number | null
          meeting_datestamp?: string | null
          meeting_id?: number | null
          meeting_meetingid?: number | null
          meeting_track_name?: string | null
          ml_winner?: string | null
          neural_price?: number | null
          neural_rank?: number | null
          pf_horse_number?: number | null
          pf_horsename?: string | null
          place_latest?: number | null
          position_avg?: number | null
          predicted_outcome?: number | null
          predicted_settle_position?: number | null
          price_11am?: number | null
          price_9am?: number | null
          price_jump?: number | null
          price_latest?: number | null
          prob_winner?: number | null
          race_distance?: number | null
          race_grade?: string | null
          race_id?: number | null
          raceno?: number | null
          record?: number | null
          record_count?: number | null
          record_distance?: number | null
          record_first_up?: string | null
          record_good?: string | null
          record_heavy?: string | null
          record_second_up?: string | null
          record_soft?: string | null
          record_track?: number | null
          record_track_distance?: number | null
          reliable?: string | null
          sex?: string | null
          start_time?: string | null
          status?: string | null
          time_adjusted_weight_class_rank?: number | null
          time_per_hundred_avg?: number | null
          time_ranking?: number | null
          track_condition_avg?: number | null
          trainer?: string | null
          trainer_id?: number | null
          weight?: number | null
          weight_avg?: number | null
          weight_class_ranl?: number | null
          weight_restrictions?: string | null
          weight_type?: string | null
        }
        Update: {
          age?: number | null
          barrier?: number | null
          barrier_avg?: number | null
          claim?: number | null
          clsdiff?: number | null
          colors_file_name?: string | null
          distance_avg?: number | null
          event_date?: string | null
          event_id?: string | null
          favourite?: string | null
          field_size_avg?: number | null
          form_id?: number | null
          horse_id?: number | null
          horse_name?: string | null
          horse_number?: number | null
          id?: number | null
          is_winner?: number | null
          jockey?: string | null
          jockey_id?: number | null
          l600_rank?: number | null
          last10?: number | null
          lb_result?: string | null
          lbw_rank?: number | null
          margin_avg?: number | null
          meeting_datestamp?: string | null
          meeting_id?: number | null
          meeting_meetingid?: number | null
          meeting_track_name?: string | null
          ml_winner?: string | null
          neural_price?: number | null
          neural_rank?: number | null
          pf_horse_number?: number | null
          pf_horsename?: string | null
          place_latest?: number | null
          position_avg?: number | null
          predicted_outcome?: number | null
          predicted_settle_position?: number | null
          price_11am?: number | null
          price_9am?: number | null
          price_jump?: number | null
          price_latest?: number | null
          prob_winner?: number | null
          race_distance?: number | null
          race_grade?: string | null
          race_id?: number | null
          raceno?: number | null
          record?: number | null
          record_count?: number | null
          record_distance?: number | null
          record_first_up?: string | null
          record_good?: string | null
          record_heavy?: string | null
          record_second_up?: string | null
          record_soft?: string | null
          record_track?: number | null
          record_track_distance?: number | null
          reliable?: string | null
          sex?: string | null
          start_time?: string | null
          status?: string | null
          time_adjusted_weight_class_rank?: number | null
          time_per_hundred_avg?: number | null
          time_ranking?: number | null
          track_condition_avg?: number | null
          trainer?: string | null
          trainer_id?: number | null
          weight?: number | null
          weight_avg?: number | null
          weight_class_ranl?: number | null
          weight_restrictions?: string | null
          weight_type?: string | null
        }
        Relationships: []
      }
      mp_prices_upload: {
        Row: {
          date: string | null
          horse: string | null
          mpdiv2: number | null
          mprank: number | null
          rdrank: number | null
          rjump: string | null
          rn: number | null
          tn: number | null
          track: string | null
        }
        Insert: {
          date?: string | null
          horse?: string | null
          mpdiv2?: number | null
          mprank?: number | null
          rdrank?: number | null
          rjump?: string | null
          rn?: number | null
          tn?: number | null
          track?: string | null
        }
        Update: {
          date?: string | null
          horse?: string | null
          mpdiv2?: number | null
          mprank?: number | null
          rdrank?: number | null
          rjump?: string | null
          rn?: number | null
          tn?: number | null
          track?: string | null
        }
        Relationships: []
      }
      mp_tracks_excluded: {
        Row: {
          mprank: number | null
          result: number | null
          track: string | null
        }
        Insert: {
          mprank?: number | null
          result?: number | null
          track?: string | null
        }
        Update: {
          mprank?: number | null
          result?: number | null
          track?: string | null
        }
        Relationships: []
      }
      pf_horse_form: {
        Row: {
          age: number | null
          barrier: number | null
          claim: number | null
          form_id: number
          horse_name: string | null
          horse_number: number | null
          id: number | null
          jockey: string | null
          jockey_id: number | null
          last10: string | null
          meeting_id: number | null
          race_distance: number | null
          race_grade: string | null
          race_id: number | null
          record: string | null
          record_distance: string | null
          record_first_up: string | null
          record_good: string | null
          record_heavy: string | null
          record_second_up: string | null
          record_soft: string | null
          record_track: string | null
          record_track_distance: string | null
          sex: string | null
          trainer: string | null
          trainer_id: number | null
          weight: number | null
          weight_restrictions: string | null
          weight_type: string | null
        }
        Insert: {
          age?: number | null
          barrier?: number | null
          claim?: number | null
          form_id: number
          horse_name?: string | null
          horse_number?: number | null
          id?: number | null
          jockey?: string | null
          jockey_id?: number | null
          last10?: string | null
          meeting_id?: number | null
          race_distance?: number | null
          race_grade?: string | null
          race_id?: number | null
          record?: string | null
          record_distance?: string | null
          record_first_up?: string | null
          record_good?: string | null
          record_heavy?: string | null
          record_second_up?: string | null
          record_soft?: string | null
          record_track?: string | null
          record_track_distance?: string | null
          sex?: string | null
          trainer?: string | null
          trainer_id?: number | null
          weight?: number | null
          weight_restrictions?: string | null
          weight_type?: string | null
        }
        Update: {
          age?: number | null
          barrier?: number | null
          claim?: number | null
          form_id?: number
          horse_name?: string | null
          horse_number?: number | null
          id?: number | null
          jockey?: string | null
          jockey_id?: number | null
          last10?: string | null
          meeting_id?: number | null
          race_distance?: number | null
          race_grade?: string | null
          race_id?: number | null
          record?: string | null
          record_distance?: string | null
          record_first_up?: string | null
          record_good?: string | null
          record_heavy?: string | null
          record_second_up?: string | null
          record_soft?: string | null
          record_track?: string | null
          record_track_distance?: string | null
          sex?: string | null
          trainer?: string | null
          trainer_id?: number | null
          weight?: number | null
          weight_restrictions?: string | null
          weight_type?: string | null
        }
        Relationships: []
      }
      pf_horse_form_runs: {
        Row: {
          barrier: number | null
          distance: string | null
          field_size: number | null
          form_id: number
          horse_id: number | null
          horse_name: string | null
          horse_number: number | null
          jockey: string | null
          jockey_claim: number | null
          jockey_id: number | null
          margin: string | null
          meeting_date: string | null
          meeting_id: number | null
          position: number | null
          race_id: number | null
          runs_from_spell: number | null
          sectional: string | null
          stewards_report: string | null
          time: string | null
          track: string | null
          track_condition: string | null
          weight: number | null
          win_odds: number | null
        }
        Insert: {
          barrier?: number | null
          distance?: string | null
          field_size?: number | null
          form_id: number
          horse_id?: number | null
          horse_name?: string | null
          horse_number?: number | null
          jockey?: string | null
          jockey_claim?: number | null
          jockey_id?: number | null
          margin?: string | null
          meeting_date?: string | null
          meeting_id?: number | null
          position?: number | null
          race_id?: number | null
          runs_from_spell?: number | null
          sectional?: string | null
          stewards_report?: string | null
          time?: string | null
          track?: string | null
          track_condition?: string | null
          weight?: number | null
          win_odds?: number | null
        }
        Update: {
          barrier?: number | null
          distance?: string | null
          field_size?: number | null
          form_id?: number
          horse_id?: number | null
          horse_name?: string | null
          horse_number?: number | null
          jockey?: string | null
          jockey_claim?: number | null
          jockey_id?: number | null
          margin?: string | null
          meeting_date?: string | null
          meeting_id?: number | null
          position?: number | null
          race_id?: number | null
          runs_from_spell?: number | null
          sectional?: string | null
          stewards_report?: string | null
          time?: string | null
          track?: string | null
          track_condition?: string | null
          weight?: number | null
          win_odds?: number | null
        }
        Relationships: []
      }
      punting_form: {
        Row: {
          ahsp: number | null
          barrier: number | null
          clsdiff: number | null
          etrprice: number | null
          etrprrk: number | null
          horseid: number | null
          horsename: string | null
          id: string | null
          l200price: number | null
          l200rank: number | null
          l400price: number | null
          l400rank: number | null
          l600price: number | null
          l600rank: number | null
          meeting_datestamp: string | null
          meeting_hassectionals: boolean | null
          meeting_isbarriertrial: boolean | null
          meeting_ismug: boolean | null
          meeting_meetingdate: string | null
          meeting_meetingid: number | null
          meeting_name: string | null
          meeting_nontab: boolean | null
          meeting_railposition: string | null
          meeting_resulted: boolean | null
          meeting_resultsupdate: string | null
          meeting_sectionalsupdate: string | null
          meeting_tabmeeting: boolean | null
          meeting_track_abbrev: string | null
          meeting_track_club: string | null
          meeting_track_country: string | null
          meeting_track_location: string | null
          meeting_track_name: string | null
          meeting_track_state: string | null
          meeting_track_trackid: number | null
          meeting_track_weatherstation_link: string | null
          meeting_track_weatherstation_name: string | null
          meeting_track_weatherstation_weatherstationid: number | null
          pdffilepath: string | null
          pfaiprice: number | null
          pfairank: number | null
          pfaiscore: number | null
          pfscore: number | null
          prse: number | null
          publishtime: string | null
          raceno: number | null
          reliable: boolean | null
          rpp: number | null
          rpr: number | null
          rsfi: number | null
          runstyle: string | null
          scrank: number | null
          sprice: number | null
          tabno: number | null
          tp20p: number | null
          tp20r: number | null
          trackcondition: number | null
          wp20p: number | null
          wp20r: number | null
          wptp20p: number | null
          wptp20r: number | null
        }
        Insert: {
          ahsp?: number | null
          barrier?: number | null
          clsdiff?: number | null
          etrprice?: number | null
          etrprrk?: number | null
          horseid?: number | null
          horsename?: string | null
          id?: string | null
          l200price?: number | null
          l200rank?: number | null
          l400price?: number | null
          l400rank?: number | null
          l600price?: number | null
          l600rank?: number | null
          meeting_datestamp?: string | null
          meeting_hassectionals?: boolean | null
          meeting_isbarriertrial?: boolean | null
          meeting_ismug?: boolean | null
          meeting_meetingdate?: string | null
          meeting_meetingid?: number | null
          meeting_name?: string | null
          meeting_nontab?: boolean | null
          meeting_railposition?: string | null
          meeting_resulted?: boolean | null
          meeting_resultsupdate?: string | null
          meeting_sectionalsupdate?: string | null
          meeting_tabmeeting?: boolean | null
          meeting_track_abbrev?: string | null
          meeting_track_club?: string | null
          meeting_track_country?: string | null
          meeting_track_location?: string | null
          meeting_track_name?: string | null
          meeting_track_state?: string | null
          meeting_track_trackid?: number | null
          meeting_track_weatherstation_link?: string | null
          meeting_track_weatherstation_name?: string | null
          meeting_track_weatherstation_weatherstationid?: number | null
          pdffilepath?: string | null
          pfaiprice?: number | null
          pfairank?: number | null
          pfaiscore?: number | null
          pfscore?: number | null
          prse?: number | null
          publishtime?: string | null
          raceno?: number | null
          reliable?: boolean | null
          rpp?: number | null
          rpr?: number | null
          rsfi?: number | null
          runstyle?: string | null
          scrank?: number | null
          sprice?: number | null
          tabno?: number | null
          tp20p?: number | null
          tp20r?: number | null
          trackcondition?: number | null
          wp20p?: number | null
          wp20r?: number | null
          wptp20p?: number | null
          wptp20r?: number | null
        }
        Update: {
          ahsp?: number | null
          barrier?: number | null
          clsdiff?: number | null
          etrprice?: number | null
          etrprrk?: number | null
          horseid?: number | null
          horsename?: string | null
          id?: string | null
          l200price?: number | null
          l200rank?: number | null
          l400price?: number | null
          l400rank?: number | null
          l600price?: number | null
          l600rank?: number | null
          meeting_datestamp?: string | null
          meeting_hassectionals?: boolean | null
          meeting_isbarriertrial?: boolean | null
          meeting_ismug?: boolean | null
          meeting_meetingdate?: string | null
          meeting_meetingid?: number | null
          meeting_name?: string | null
          meeting_nontab?: boolean | null
          meeting_railposition?: string | null
          meeting_resulted?: boolean | null
          meeting_resultsupdate?: string | null
          meeting_sectionalsupdate?: string | null
          meeting_tabmeeting?: boolean | null
          meeting_track_abbrev?: string | null
          meeting_track_club?: string | null
          meeting_track_country?: string | null
          meeting_track_location?: string | null
          meeting_track_name?: string | null
          meeting_track_state?: string | null
          meeting_track_trackid?: number | null
          meeting_track_weatherstation_link?: string | null
          meeting_track_weatherstation_name?: string | null
          meeting_track_weatherstation_weatherstationid?: number | null
          pdffilepath?: string | null
          pfaiprice?: number | null
          pfairank?: number | null
          pfaiscore?: number | null
          pfscore?: number | null
          prse?: number | null
          publishtime?: string | null
          raceno?: number | null
          reliable?: boolean | null
          rpp?: number | null
          rpr?: number | null
          rsfi?: number | null
          runstyle?: string | null
          scrank?: number | null
          sprice?: number | null
          tabno?: number | null
          tp20p?: number | null
          tp20r?: number | null
          trackcondition?: number | null
          wp20p?: number | null
          wp20r?: number | null
          wptp20p?: number | null
          wptp20r?: number | null
        }
        Relationships: []
      }
      selection_volume_and_prices: {
        Row: {
          bab: number | null
          bal: number | null
          created_at: string | null
          market_id: string | null
          percentage: number | null
          race_total_matched: number | null
          rank: number | null
          result: string | null
          selection_id: number
          selection_matched: number | null
          uuid: number | null
        }
        Insert: {
          bab?: number | null
          bal?: number | null
          created_at?: string | null
          market_id?: string | null
          percentage?: number | null
          race_total_matched?: number | null
          rank?: number | null
          result?: string | null
          selection_id: number
          selection_matched?: number | null
          uuid?: number | null
        }
        Update: {
          bab?: number | null
          bal?: number | null
          created_at?: string | null
          market_id?: string | null
          percentage?: number | null
          race_total_matched?: number | null
          rank?: number | null
          result?: string | null
          selection_id?: number
          selection_matched?: number | null
          uuid?: number | null
        }
        Relationships: []
      }
      shopify_orders: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          id: number
          name: string | null
          product_name: string | null
          product_price: number | null
          product_quantity: number | null
          total_price: number | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          id: number
          name?: string | null
          product_name?: string | null
          product_price?: number | null
          product_quantity?: number | null
          total_price?: number | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          id?: number
          name?: string | null
          product_name?: string | null
          product_price?: number | null
          product_quantity?: number | null
          total_price?: number | null
        }
        Relationships: []
      }
      starter_package_selection_overrides: {
        Row: {
          created_at: string | null
          lbw_price: number | null
          market_id: string | null
          mprank: number | null
          selection_id: number
          selection_name: string | null
          side: string | null
          units: number | null
        }
        Insert: {
          created_at?: string | null
          lbw_price?: number | null
          market_id?: string | null
          mprank?: number | null
          selection_id: number
          selection_name?: string | null
          side?: string | null
          units?: number | null
        }
        Update: {
          created_at?: string | null
          lbw_price?: number | null
          market_id?: string | null
          mprank?: number | null
          selection_id?: number
          selection_name?: string | null
          side?: string | null
          units?: number | null
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          attrs: Json | null
          created: string | null
          description: string | null
          email: string | null
          id: string | null
          name: string | null
        }
        Insert: {
          attrs?: Json | null
          created?: string | null
          description?: string | null
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Update: {
          attrs?: Json | null
          created?: string | null
          description?: string | null
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          attrs: Json | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer: string | null
          id: string | null
        }
        Insert: {
          attrs?: Json | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer?: string | null
          id?: string | null
        }
        Update: {
          attrs?: Json | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer?: string | null
          id?: string | null
        }
        Relationships: []
      }
      tbb4_master_settings: {
        Row: {
          active: boolean | null
          aus: boolean | null
          created_at: string
          greyhound: boolean | null
          harness: boolean | null
          horse: boolean | null
          id: number
          lay_to_price: number | null
          max_back_price: number | null
          max_lay: number | null
          max_odds: number | null
          max_odds_lay: number | null
          min_odds: number | null
          min_runners: number | null
          model: string | null
          name: string | null
          nz: boolean | null
          percent: number | null
          rank: number | null
          stake_size: number | null
          stop_loss: number | null
          stop_loss_plus: number | null
          take_profit: number | null
          take_profit_plus: number | null
          time_before_jump: number | null
        }
        Insert: {
          active?: boolean | null
          aus?: boolean | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          id?: number
          lay_to_price?: number | null
          max_back_price?: number | null
          max_lay?: number | null
          max_odds?: number | null
          max_odds_lay?: number | null
          min_odds?: number | null
          min_runners?: number | null
          model?: string | null
          name?: string | null
          nz?: boolean | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          stop_loss_plus?: number | null
          take_profit?: number | null
          take_profit_plus?: number | null
          time_before_jump?: number | null
        }
        Update: {
          active?: boolean | null
          aus?: boolean | null
          created_at?: string
          greyhound?: boolean | null
          harness?: boolean | null
          horse?: boolean | null
          id?: number
          lay_to_price?: number | null
          max_back_price?: number | null
          max_lay?: number | null
          max_odds?: number | null
          max_odds_lay?: number | null
          min_odds?: number | null
          min_runners?: number | null
          model?: string | null
          name?: string | null
          nz?: boolean | null
          percent?: number | null
          rank?: number | null
          stake_size?: number | null
          stop_loss?: number | null
          stop_loss_plus?: number | null
          take_profit?: number | null
          take_profit_plus?: number | null
          time_before_jump?: number | null
        }
        Relationships: []
      }
      tbb4_packages: {
        Row: {
          created_at: string
          id: number
          name: string | null
          stripe_product_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          stripe_product_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          stripe_product_id?: string | null
        }
        Relationships: []
      }
      topaz_form: {
        Row: {
          bestonnight: number | null
          boxdrawnorder: number | null
          boxnumber: number | null
          colourcode: string | null
          comment: string | null
          distance: number | null
          dogid: number | null
          dogname: string | null
          firstsecond: string | null
          firstsplitmargin: number | null
          firstsplitposition: number | null
          firstsplittime: number | null
          gradedto: string | null
          incominggrade: string | null
          isbestbet: number | null
          islatescratching: boolean | null
          isquad: boolean | null
          jumpcode: string | null
          last5: string | null
          meetingdate: string | null
          outgoinggrade: string | null
          ownerid: number | null
          ownername: string | null
          pir: string | null
          place: number | null
          prizemoney: number | null
          raceid: number | null
          racenumber: number | null
          racetype: string | null
          racetypecode: string | null
          rating: number | null
          resultmargin: number | null
          resulttime: number | null
          rugnumber: number | null
          runid: number
          runlinecode: string | null
          scratched: boolean | null
          sex: string | null
          started: boolean | null
          startpacecode: string | null
          startprice: number | null
          track: string | null
          trackcode: string | null
          trainerid: number | null
          trainername: string | null
          unplaced: string | null
          unplacedcode: string | null
          weightinkg: number | null
          wintime: number | null
        }
        Insert: {
          bestonnight?: number | null
          boxdrawnorder?: number | null
          boxnumber?: number | null
          colourcode?: string | null
          comment?: string | null
          distance?: number | null
          dogid?: number | null
          dogname?: string | null
          firstsecond?: string | null
          firstsplitmargin?: number | null
          firstsplitposition?: number | null
          firstsplittime?: number | null
          gradedto?: string | null
          incominggrade?: string | null
          isbestbet?: number | null
          islatescratching?: boolean | null
          isquad?: boolean | null
          jumpcode?: string | null
          last5?: string | null
          meetingdate?: string | null
          outgoinggrade?: string | null
          ownerid?: number | null
          ownername?: string | null
          pir?: string | null
          place?: number | null
          prizemoney?: number | null
          raceid?: number | null
          racenumber?: number | null
          racetype?: string | null
          racetypecode?: string | null
          rating?: number | null
          resultmargin?: number | null
          resulttime?: number | null
          rugnumber?: number | null
          runid: number
          runlinecode?: string | null
          scratched?: boolean | null
          sex?: string | null
          started?: boolean | null
          startpacecode?: string | null
          startprice?: number | null
          track?: string | null
          trackcode?: string | null
          trainerid?: number | null
          trainername?: string | null
          unplaced?: string | null
          unplacedcode?: string | null
          weightinkg?: number | null
          wintime?: number | null
        }
        Update: {
          bestonnight?: number | null
          boxdrawnorder?: number | null
          boxnumber?: number | null
          colourcode?: string | null
          comment?: string | null
          distance?: number | null
          dogid?: number | null
          dogname?: string | null
          firstsecond?: string | null
          firstsplitmargin?: number | null
          firstsplitposition?: number | null
          firstsplittime?: number | null
          gradedto?: string | null
          incominggrade?: string | null
          isbestbet?: number | null
          islatescratching?: boolean | null
          isquad?: boolean | null
          jumpcode?: string | null
          last5?: string | null
          meetingdate?: string | null
          outgoinggrade?: string | null
          ownerid?: number | null
          ownername?: string | null
          pir?: string | null
          place?: number | null
          prizemoney?: number | null
          raceid?: number | null
          racenumber?: number | null
          racetype?: string | null
          racetypecode?: string | null
          rating?: number | null
          resultmargin?: number | null
          resulttime?: number | null
          rugnumber?: number | null
          runid?: number
          runlinecode?: string | null
          scratched?: boolean | null
          sex?: string | null
          started?: boolean | null
          startpacecode?: string | null
          startprice?: number | null
          track?: string | null
          trackcode?: string | null
          trainerid?: number | null
          trainername?: string | null
          unplaced?: string | null
          unplacedcode?: string | null
          weightinkg?: number | null
          wintime?: number | null
        }
        Relationships: []
      }
      topaz_meetings: {
        Row: {
          isquali: boolean | null
          meetingcategory: string | null
          meetingdate: string | null
          meetingid: number
          meetingtype: string | null
          nominationsclosedatetime: string | null
          owningauthoritycode: string | null
          racecount: number | null
          scratchingsclosedatetime: string | null
          starttime: string | null
          statuscode: string | null
          tabevent: boolean | null
          timeslotcode: string | null
          trackcode: string | null
          trackid: string | null
          trackname: string | null
        }
        Insert: {
          isquali?: boolean | null
          meetingcategory?: string | null
          meetingdate?: string | null
          meetingid: number
          meetingtype?: string | null
          nominationsclosedatetime?: string | null
          owningauthoritycode?: string | null
          racecount?: number | null
          scratchingsclosedatetime?: string | null
          starttime?: string | null
          statuscode?: string | null
          tabevent?: boolean | null
          timeslotcode?: string | null
          trackcode?: string | null
          trackid?: string | null
          trackname?: string | null
        }
        Update: {
          isquali?: boolean | null
          meetingcategory?: string | null
          meetingdate?: string | null
          meetingid?: number
          meetingtype?: string | null
          nominationsclosedatetime?: string | null
          owningauthoritycode?: string | null
          racecount?: number | null
          scratchingsclosedatetime?: string | null
          starttime?: string | null
          statuscode?: string | null
          tabevent?: boolean | null
          timeslotcode?: string | null
          trackcode?: string | null
          trackid?: string | null
          trackname?: string | null
        }
        Relationships: []
      }
      topaz_races: {
        Row: {
          analystcomment: string | null
          distance: number | null
          isbixsix: boolean | null
          isboxdrawn: boolean | null
          isdailydouble: boolean | null
          isearlyquaddie: boolean | null
          isexacta: boolean | null
          ispickfour: boolean | null
          isquaddie: boolean | null
          isquinella: boolean | null
          israceresultentered: boolean | null
          isrunningdouble: boolean | null
          istrifecta: boolean | null
          meetingid: number | null
          name: string | null
          owningauthoritycode: string | null
          photofinishurl: string | null
          placepool: number | null
          prizemoney1: number | null
          prizemoney2: number | null
          prizemoney3: number | null
          prizemoney4: number | null
          prizemoney5: number | null
          prizemoney6: number | null
          prizemoney7: number | null
          prizemoney8: number | null
          prizemoneytotal: number | null
          raceid: number
          racenumber: number | null
          racestart: string | null
          racetype: string | null
          racetypecode: string | null
          resultssummary: string | null
          resultyoutubevideoid: string | null
          starttime: string | null
          suggestedbet: string | null
          suggestedbettypecode: string | null
          tip1: number | null
          tip2: number | null
          tip3: number | null
          tip4: number | null
          trifectapool: number | null
          winpool: number | null
        }
        Insert: {
          analystcomment?: string | null
          distance?: number | null
          isbixsix?: boolean | null
          isboxdrawn?: boolean | null
          isdailydouble?: boolean | null
          isearlyquaddie?: boolean | null
          isexacta?: boolean | null
          ispickfour?: boolean | null
          isquaddie?: boolean | null
          isquinella?: boolean | null
          israceresultentered?: boolean | null
          isrunningdouble?: boolean | null
          istrifecta?: boolean | null
          meetingid?: number | null
          name?: string | null
          owningauthoritycode?: string | null
          photofinishurl?: string | null
          placepool?: number | null
          prizemoney1?: number | null
          prizemoney2?: number | null
          prizemoney3?: number | null
          prizemoney4?: number | null
          prizemoney5?: number | null
          prizemoney6?: number | null
          prizemoney7?: number | null
          prizemoney8?: number | null
          prizemoneytotal?: number | null
          raceid: number
          racenumber?: number | null
          racestart?: string | null
          racetype?: string | null
          racetypecode?: string | null
          resultssummary?: string | null
          resultyoutubevideoid?: string | null
          starttime?: string | null
          suggestedbet?: string | null
          suggestedbettypecode?: string | null
          tip1?: number | null
          tip2?: number | null
          tip3?: number | null
          tip4?: number | null
          trifectapool?: number | null
          winpool?: number | null
        }
        Update: {
          analystcomment?: string | null
          distance?: number | null
          isbixsix?: boolean | null
          isboxdrawn?: boolean | null
          isdailydouble?: boolean | null
          isearlyquaddie?: boolean | null
          isexacta?: boolean | null
          ispickfour?: boolean | null
          isquaddie?: boolean | null
          isquinella?: boolean | null
          israceresultentered?: boolean | null
          isrunningdouble?: boolean | null
          istrifecta?: boolean | null
          meetingid?: number | null
          name?: string | null
          owningauthoritycode?: string | null
          photofinishurl?: string | null
          placepool?: number | null
          prizemoney1?: number | null
          prizemoney2?: number | null
          prizemoney3?: number | null
          prizemoney4?: number | null
          prizemoney5?: number | null
          prizemoney6?: number | null
          prizemoney7?: number | null
          prizemoney8?: number | null
          prizemoneytotal?: number | null
          raceid?: number
          racenumber?: number | null
          racestart?: string | null
          racetype?: string | null
          racetypecode?: string | null
          resultssummary?: string | null
          resultyoutubevideoid?: string | null
          starttime?: string | null
          suggestedbet?: string | null
          suggestedbettypecode?: string | null
          tip1?: number | null
          tip2?: number | null
          tip3?: number | null
          tip4?: number | null
          trifectapool?: number | null
          winpool?: number | null
        }
        Relationships: []
      }
      topaz_runs: {
        Row: {
          averagespeed: number | null
          bestfinishtrackanddistance: string | null
          besttime: string | null
          boxdrawnorder: number | null
          boxnumber: number | null
          careerprizemoney: number | null
          colourcode: string | null
          comment: string | null
          damid: number | null
          damname: string | null
          datewhelped: string | null
          distance: number | null
          dogid: number | null
          dogname: string | null
          firstsecond: string | null
          gradedto: string | null
          incominggrade: string | null
          isbestbet: number | null
          islatescratching: boolean | null
          isquad: boolean | null
          jumpcode: string | null
          last5: string | null
          meetingdate: string | null
          outgoinggrade: string | null
          ownerid: number | null
          ownername: string | null
          ownerstate: string | null
          pir: number | null
          place: number | null
          prizemoney: number | null
          raceid: number | null
          racenumber: number | null
          racetype: string | null
          racetypecode: string | null
          rating: number | null
          resultmargin: string | null
          resultmarginlengths: string | null
          resulttime: string | null
          rugnumber: number | null
          runid: number
          runlinecode: string | null
          scratched: boolean | null
          sex: string | null
          sireid: number | null
          sirename: string | null
          startpacecode: string | null
          startprice: number | null
          totalformcount: number | null
          track: string | null
          trackcode: string | null
          trainerdistrict: string | null
          trainerid: number | null
          trainername: string | null
          trainerpostcode: string | null
          trainerstate: string | null
          trainersuburb: string | null
          unplaced: string | null
          unplacedcode: string | null
          weightinkg: number | null
        }
        Insert: {
          averagespeed?: number | null
          bestfinishtrackanddistance?: string | null
          besttime?: string | null
          boxdrawnorder?: number | null
          boxnumber?: number | null
          careerprizemoney?: number | null
          colourcode?: string | null
          comment?: string | null
          damid?: number | null
          damname?: string | null
          datewhelped?: string | null
          distance?: number | null
          dogid?: number | null
          dogname?: string | null
          firstsecond?: string | null
          gradedto?: string | null
          incominggrade?: string | null
          isbestbet?: number | null
          islatescratching?: boolean | null
          isquad?: boolean | null
          jumpcode?: string | null
          last5?: string | null
          meetingdate?: string | null
          outgoinggrade?: string | null
          ownerid?: number | null
          ownername?: string | null
          ownerstate?: string | null
          pir?: number | null
          place?: number | null
          prizemoney?: number | null
          raceid?: number | null
          racenumber?: number | null
          racetype?: string | null
          racetypecode?: string | null
          rating?: number | null
          resultmargin?: string | null
          resultmarginlengths?: string | null
          resulttime?: string | null
          rugnumber?: number | null
          runid: number
          runlinecode?: string | null
          scratched?: boolean | null
          sex?: string | null
          sireid?: number | null
          sirename?: string | null
          startpacecode?: string | null
          startprice?: number | null
          totalformcount?: number | null
          track?: string | null
          trackcode?: string | null
          trainerdistrict?: string | null
          trainerid?: number | null
          trainername?: string | null
          trainerpostcode?: string | null
          trainerstate?: string | null
          trainersuburb?: string | null
          unplaced?: string | null
          unplacedcode?: string | null
          weightinkg?: number | null
        }
        Update: {
          averagespeed?: number | null
          bestfinishtrackanddistance?: string | null
          besttime?: string | null
          boxdrawnorder?: number | null
          boxnumber?: number | null
          careerprizemoney?: number | null
          colourcode?: string | null
          comment?: string | null
          damid?: number | null
          damname?: string | null
          datewhelped?: string | null
          distance?: number | null
          dogid?: number | null
          dogname?: string | null
          firstsecond?: string | null
          gradedto?: string | null
          incominggrade?: string | null
          isbestbet?: number | null
          islatescratching?: boolean | null
          isquad?: boolean | null
          jumpcode?: string | null
          last5?: string | null
          meetingdate?: string | null
          outgoinggrade?: string | null
          ownerid?: number | null
          ownername?: string | null
          ownerstate?: string | null
          pir?: number | null
          place?: number | null
          prizemoney?: number | null
          raceid?: number | null
          racenumber?: number | null
          racetype?: string | null
          racetypecode?: string | null
          rating?: number | null
          resultmargin?: string | null
          resultmarginlengths?: string | null
          resulttime?: string | null
          rugnumber?: number | null
          runid?: number
          runlinecode?: string | null
          scratched?: boolean | null
          sex?: string | null
          sireid?: number | null
          sirename?: string | null
          startpacecode?: string | null
          startprice?: number | null
          totalformcount?: number | null
          track?: string | null
          trackcode?: string | null
          trainerdistrict?: string | null
          trainerid?: number | null
          trainername?: string | null
          trainerpostcode?: string | null
          trainerstate?: string | null
          trainersuburb?: string | null
          unplaced?: string | null
          unplacedcode?: string | null
          weightinkg?: number | null
        }
        Relationships: []
      }
      user_app_settings: {
        Row: {
          auth_id: string | null
          biometric_key: string | null
          created_at: string
          device_name: string | null
          device_os: string | null
          expo_push_key: string | null
          id: string
          noti_order_placed: boolean | null
          noti_upcoming_races: boolean | null
        }
        Insert: {
          auth_id?: string | null
          biometric_key?: string | null
          created_at?: string
          device_name?: string | null
          device_os?: string | null
          expo_push_key?: string | null
          id?: string
          noti_order_placed?: boolean | null
          noti_upcoming_races?: boolean | null
        }
        Update: {
          auth_id?: string | null
          biometric_key?: string | null
          created_at?: string
          device_name?: string | null
          device_os?: string | null
          expo_push_key?: string | null
          id?: string
          noti_order_placed?: boolean | null
          noti_upcoming_races?: boolean | null
        }
        Relationships: []
      }
      user_betting_system: {
        Row: {
          auth_id: string | null
          id: number
          race_type: string | null
          system_id: number
        }
        Insert: {
          auth_id?: string | null
          id?: number
          race_type?: string | null
          system_id?: number
        }
        Update: {
          auth_id?: string | null
          id?: number
          race_type?: string | null
          system_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "betting_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "user_betting_systems_full"
            referencedColumns: ["betting_system_id"]
          },
        ]
      }
      user_details: {
        Row: {
          address: string | null
          auth_id: string
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          phone: number | null
          postcode: number | null
          settings_id: string | null
          state: string | null
          stripe_id: string | null
          subscription_id: number | null
        }
        Insert: {
          address?: string | null
          auth_id: string
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: number | null
          postcode?: number | null
          settings_id?: string | null
          state?: string | null
          stripe_id?: string | null
          subscription_id?: number | null
        }
        Update: {
          address?: string | null
          auth_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: number | null
          postcode?: number | null
          settings_id?: string | null
          state?: string | null
          stripe_id?: string | null
          subscription_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_details_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "user_information_full"
            referencedColumns: ["us_id"]
          },
          {
            foreignKeyName: "user_details_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "user_settings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_details_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_information_full"
            referencedColumns: ["usub_id"]
          },
          {
            foreignKeyName: "user_details_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscription"
            referencedColumns: ["id"]
          },
        ]
      }
      user_orders_placed: {
        Row: {
          bet_id: number
          customer_strategy_ref: string | null
          market_id: string | null
          order_status: string | null
          percentage: number | null
          placed_date: string | null
          price: number | null
          selection_id: number | null
          side: string | null
          stake: number | null
          status: string | null
          strategy_code: string | null
          user_id: number | null
        }
        Insert: {
          bet_id: number
          customer_strategy_ref?: string | null
          market_id?: string | null
          order_status?: string | null
          percentage?: number | null
          placed_date?: string | null
          price?: number | null
          selection_id?: number | null
          side?: string | null
          stake?: number | null
          status?: string | null
          strategy_code?: string | null
          user_id?: number | null
        }
        Update: {
          bet_id?: number
          customer_strategy_ref?: string | null
          market_id?: string | null
          order_status?: string | null
          percentage?: number | null
          placed_date?: string | null
          price?: number | null
          selection_id?: number | null
          side?: string | null
          stake?: number | null
          status?: string | null
          strategy_code?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      user_results: {
        Row: {
          bet_id: number
          commission: number | null
          customer_order_ref: string | null
          customer_strategy_ref: string | null
          event_id: string | null
          event_name: string | null
          event_type_id: string | null
          last_matched_date: string | null
          market_id: string | null
          outcome: string | null
          placed_date: string | null
          price_matched: number | null
          price_reduced: boolean | null
          price_requested: number | null
          profit: number | null
          profit_with_comm: number | null
          selection_id: number | null
          selection_name: string | null
          settled_date: string | null
          side: string | null
          stake: number | null
          user: string | null
          user_id: number | null
        }
        Insert: {
          bet_id: number
          commission?: number | null
          customer_order_ref?: string | null
          customer_strategy_ref?: string | null
          event_id?: string | null
          event_name?: string | null
          event_type_id?: string | null
          last_matched_date?: string | null
          market_id?: string | null
          outcome?: string | null
          placed_date?: string | null
          price_matched?: number | null
          price_reduced?: boolean | null
          price_requested?: number | null
          profit?: number | null
          profit_with_comm?: number | null
          selection_id?: number | null
          selection_name?: string | null
          settled_date?: string | null
          side?: string | null
          stake?: number | null
          user?: string | null
          user_id?: number | null
        }
        Update: {
          bet_id?: number
          commission?: number | null
          customer_order_ref?: string | null
          customer_strategy_ref?: string | null
          event_id?: string | null
          event_name?: string | null
          event_type_id?: string | null
          last_matched_date?: string | null
          market_id?: string | null
          outcome?: string | null
          placed_date?: string | null
          price_matched?: number | null
          price_reduced?: boolean | null
          price_requested?: number | null
          profit?: number | null
          profit_with_comm?: number | null
          selection_id?: number | null
          selection_name?: string | null
          settled_date?: string | null
          side?: string | null
          stake?: number | null
          user?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "captains_lounge_full"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "order_results_details"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_information_full"
            referencedColumns: ["ud_id"]
          },
          {
            foreignKeyName: "user_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_orders_mv"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_settings: {
        Row: {
          admin: boolean | null
          betfair_access_token: string | null
          betfair_refresh_token: string | null
          betfair_vendor_client_id: string | null
          created_at: string | null
          id: string
          TBB3_bot: boolean | null
          tbb3_mp1: boolean | null
          tbb3_mp2: boolean | null
          tbb3_stake_size: number | null
          tbb3_stop_loss: number | null
          tbb3_take_profit: number | null
          tbb4_bot: boolean | null
          tbb4_stake_size: number | null
          tbb4_stop_loss: number | null
          tbb4_take_profit: number | null
          timezone_name: string
          timezone_offset: number
          token_last_refresh: string | null
          staff: boolean | null
          use_predictor: boolean | null
        }
        Insert: {
          admin?: boolean | null
          betfair_access_token?: string | null
          betfair_refresh_token?: string | null
          betfair_vendor_client_id?: string | null
          created_at?: string | null
          id?: string
          TBB3_bot?: boolean | null
          tbb3_mp1?: boolean | null
          tbb3_mp2?: boolean | null
          tbb3_stake_size?: number | null
          tbb3_stop_loss?: number | null
          tbb3_take_profit?: number | null
          tbb4_bot?: boolean | null
          tbb4_stake_size?: number | null
          tbb4_stop_loss?: number | null
          tbb4_take_profit?: number | null
          timezone_name?: string
          timezone_offset?: number
          token_last_refresh?: string | null
          staff?: boolean | null
          use_predictor?: boolean | null
        }
        Update: {
          admin?: boolean | null
          betfair_access_token?: string | null
          betfair_refresh_token?: string | null
          betfair_vendor_client_id?: string | null
          created_at?: string | null
          id?: string
          TBB3_bot?: boolean | null
          tbb3_mp1?: boolean | null
          tbb3_mp2?: boolean | null
          tbb3_stake_size?: number | null
          tbb3_stop_loss?: number | null
          tbb3_take_profit?: number | null
          tbb4_bot?: boolean | null
          tbb4_stake_size?: number | null
          tbb4_stop_loss?: number | null
          tbb4_take_profit?: number | null
          timezone_name?: string
          timezone_offset?: number
          staff?: boolean | null
          token_last_refresh?: string | null
          use_predictor?: boolean | null
        }
        Relationships: []
      }
      user_subscription: {
        Row: {
          captains_lounge: boolean | null
          created_at: string
          expires: string | null
          id: number
          tbb3: boolean | null
          tbb4: boolean | null
          tbb4_package: number | null
        }
        Insert: {
          captains_lounge?: boolean | null
          created_at?: string
          expires?: string | null
          id?: number
          tbb3?: boolean | null
          tbb4?: boolean | null
          tbb4_package?: number | null
        }
        Update: {
          captains_lounge?: boolean | null
          created_at?: string
          expires?: string | null
          id?: number
          tbb3?: boolean | null
          tbb4?: boolean | null
          tbb4_package?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscription_tbb4_package_fkey"
            columns: ["tbb4_package"]
            isOneToOne: false
            referencedRelation: "tbb4_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_types: {
        Row: {
          state: string | null
          type: string | null
          venue: string | null
        }
        Insert: {
          state?: string | null
          type?: string | null
          venue?: string | null
        }
        Update: {
          state?: string | null
          type?: string | null
          venue?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      backtesting: {
        Row: {
          bal: number | null
          barrier: number | null
          bf_result: string | null
          clsdiff: number | null
          event_date: string | null
          favourite: boolean | null
          l200rank: number | null
          l400rank: number | null
          l600_rank: number | null
          l600price: number | null
          l600rank: number | null
          lb_result: string | null
          lbw_rank: number | null
          market_id: string | null
          meeting_datestamp: string | null
          meeting_railposition: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          pfaiprice: number | null
          pfairank: number | null
          pfaiscore: number | null
          place_latest: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_diff: number | null
          price_jump: number | null
          price_latest: number | null
          raceno: number | null
          selection_id: number | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_ranking: number | null
          trackcondition: number | null
          venue: string | null
          venue_state: string | null
          venue_type: string | null
          weight_class_ranl: number | null
        }
        Relationships: []
      }
      betfair_greyhounds_ml_analysis: {
        Row: {
          bab: number | null
          bal: number | null
          box: string | null
          country: string | null
          event_date: string | null
          event_name: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          percentage: number | null
          race_total_matched: number | null
          race_type: string | null
          rank: number | null
          result: string | null
          runner_name: string | null
          selection_id: number | null
          selection_matched: number | null
          venue: string | null
        }
        Relationships: []
      }
      bot_results_john: {
        Row: {
          event_date: string | null
          total_profit: number | null
          total_units: number | null
        }
        Relationships: []
      }
      captains_lounge_full: {
        Row: {
          active: boolean | null
          auth_id: string | null
          betfair_access_token: string | null
          email: string | null
          expires: string | null
          greyhound: boolean | null
          harness: boolean | null
          horse: boolean | null
          max_lay: number | null
          min_runners: number | null
          percent: number | null
          rank: number | null
          settings_id: string | null
          stake_size: number | null
          stop_loss: number | null
          subscription_active: boolean | null
          take_profit: number | null
          tbb4_bot: boolean | null
          tbb4_package: number | null
          tbb4_stop_loss: number | null
          tbb4_take_profit: number | null
          time_before_jump: number | null
          user_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscription_tbb4_package_fkey"
            columns: ["tbb4_package"]
            isOneToOne: false
            referencedRelation: "tbb4_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      dev_bot_full_results: {
        Row: {
          bet_id: number | null
          bot_id: number | null
          event_name: string | null
          market_id: string | null
          order_executation_status: string | null
          order_placed_time: string | null
          order_price: number | null
          order_settled_time: string | null
          order_stake: number | null
          order_status: string | null
          percentage: number | null
          price_matched: number | null
          price_requested: number | null
          profit: number | null
          race_name: string | null
          ref: string | null
          result: string | null
          selection_id: number | null
          selection_name: string | null
          side: string | null
          strategy_code: string | null
          venue: string | null
        }
        Relationships: []
      }
      horse_races_app_view: {
        Row: {
          barrier: number | null
          colors_file_name: string | null
          country: string | null
          event_date: string | null
          event_name: string | null
          favourite: boolean | null
          flucs: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          place_latest: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          race_type: string | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          venue: string | null
        }
        Relationships: []
      }
      ladbrokes_betfair_analysis_horses: {
        Row: {
          bab: number | null
          bal: number | null
          barrier: number | null
          country: string | null
          event_date: string | null
          event_name: string | null
          favourite: boolean | null
          flucs: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          percentage: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          race_number: number | null
          race_total_matched: number | null
          race_type: string | null
          rank: number | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          selection_matched: number | null
          venue: string | null
        }
        Relationships: []
      }
      lay_only_daily: {
        Row: {
          barrier: number | null
          bf_market_id: string | null
          bf_selection_id: number | null
          clsdiff: number | null
          colors_file_name: string | null
          country: string | null
          date: string | null
          entrant_id: string | null
          event_date: string | null
          event_id: string | null
          event_name: string | null
          favourite: boolean | null
          is_scratched: boolean | null
          l200price: number | null
          l200rank: number | null
          l400price: number | null
          l400rank: number | null
          l600_rank: number | null
          l600price: number | null
          l600rank: number | null
          lb_result: string | null
          lbw_rank: number | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          meeting_datestamp: string | null
          meeting_meetingid: number | null
          meeting_railposition: string | null
          meeting_track_name: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          pfaiprice: number | null
          pfairank: number | null
          pfaiscore: number | null
          place_latest: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          race_number: number | null
          race_type: string | null
          raceno: number | null
          reliable: boolean | null
          result: string | null
          selection_id: number | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_ranking: number | null
          venue: string | null
          weight_class_ranl: number | null
        }
        Relationships: []
      }
      member_selections_ladbrokes_prices: {
        Row: {
          bab: number | null
          bal: number | null
          favourite: boolean | null
          flucs: string | null
          is_scratched: boolean | null
          lbw_price: number | null
          market_id: string | null
          market_mover: boolean | null
          meeting_date: string | null
          mprank: number | null
          price_11am: number | null
          price_1min: number | null
          price_1min_captured_at: string | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          price_open: number | null
          race_number: number | null
          race_start_time: string | null
          rank: number | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          side: string | null
          start_time: string | null
          venue_name: string | null
        }
        Relationships: []
      }
      ml_form_and_results: {
        Row: {
          age: number | null
          barrier: number | null
          claim: number | null
          clsdiff: number | null
          colors_file_name: string | null
          event_date: string | null
          event_id: string | null
          favourite: boolean | null
          form_id: number | null
          horse_id: number | null
          horse_name: string | null
          horse_number: number | null
          id: number | null
          jockey: string | null
          jockey_id: number | null
          l600_rank: number | null
          last10: string | null
          lb_result: string | null
          lbw_rank: number | null
          meeting_datestamp: string | null
          meeting_id: number | null
          meeting_meetingid: number | null
          meeting_track_name: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          place_latest: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          race_distance: number | null
          race_grade: string | null
          race_id: number | null
          raceno: number | null
          record: string | null
          record_distance: string | null
          record_first_up: string | null
          record_good: string | null
          record_heavy: string | null
          record_second_up: string | null
          record_soft: string | null
          record_track: string | null
          record_track_distance: string | null
          reliable: boolean | null
          result: string | null
          sex: string | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_ranking: number | null
          trainer: string | null
          trainer_id: number | null
          weight: number | null
          weight_class_ranl: number | null
          weight_restrictions: string | null
          weight_type: string | null
        }
        Relationships: []
      }
      ml_gbm_horse_results: {
        Row: {
          bab: number | null
          event_date: string | null
          event_name: string | null
          id: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          ml_winner: string | null
          model: string | null
          prob_winner: number | null
          profit: number | null
          rank: number | null
          rel_prob: number | null
          result: string | null
          runner_count: number | null
          runner_name: string | null
          runner_number: number | null
          side: string | null
          units: number | null
          venue: string | null
        }
        Relationships: []
      }
      ml_greyhound_results: {
        Row: {
          bab: number | null
          box: number | null
          event_date: string | null
          event_name: string | null
          market_id: string | null
          market_name: string | null
          prob_winner: number | null
          rank: number | null
          result: string | null
          runner_name: string | null
          selection_id: number | null
          side: string | null
          units: number | null
        }
        Relationships: []
      }
      ml_horse_results: {
        Row: {
          bab: number | null
          event_date: string | null
          event_name: string | null
          id: string | null
          market_id: string | null
          market_name: string | null
          ml_winner: string | null
          model: string | null
          prob_winner: number | null
          rank: number | null
          rel_prob: number | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          side: string | null
          units: number | null
        }
        Relationships: []
      }
      ml_rfc_horse_results: {
        Row: {
          bab: number | null
          event_date: string | null
          event_name: string | null
          id: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          ml_winner: string | null
          model: string | null
          prob_winner: number | null
          profit: number | null
          rank: number | null
          rel_prob: number | null
          result: string | null
          runner_count: number | null
          runner_name: string | null
          runner_number: number | null
          side: string | null
          units: number | null
          venue: string | null
        }
        Relationships: []
      }
      ml_tommy_selections: {
        Row: {
          age: number | null
          barrier: number | null
          barrier_avg: number | null
          claim: number | null
          clsdiff: number | null
          colors_file_name: string | null
          distance_avg: number | null
          event_date: string | null
          event_id: string | null
          favourite: string | null
          field_size_avg: number | null
          form_id: number | null
          horse_id: number | null
          horse_name: string | null
          horse_number: number | null
          id: number | null
          is_winner: number | null
          jockey: string | null
          jockey_id: number | null
          l600_rank: number | null
          last10: number | null
          lb_result: string | null
          lb_status: string | null
          lbw_rank: number | null
          margin_avg: number | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          meeting_datestamp: string | null
          meeting_id: number | null
          meeting_meetingid: number | null
          meeting_track_name: string | null
          ml_winner: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          place_latest: number | null
          position_avg: number | null
          predicted_outcome: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          prob_winner: number | null
          race_distance: number | null
          race_grade: string | null
          race_id: number | null
          raceno: number | null
          record: number | null
          record_count: number | null
          record_distance: number | null
          record_first_up: string | null
          record_good: string | null
          record_heavy: string | null
          record_second_up: string | null
          record_soft: string | null
          record_track: number | null
          record_track_distance: number | null
          reliable: string | null
          result: string | null
          runner_name: string | null
          selection_id: number | null
          sex: string | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_per_hundred_avg: number | null
          time_ranking: number | null
          track_condition_avg: number | null
          trainer: string | null
          trainer_id: number | null
          venue: string | null
          venue_name: string | null
          weight: number | null
          weight_avg: number | null
          weight_class_ranl: number | null
          weight_restrictions: string | null
          weight_type: string | null
        }
        Relationships: []
      }
      order_results_details: {
        Row: {
          auth_id: string | null
          bet_id: number | null
          colors_file_name: string | null
          commission: number | null
          email: string | null
          event_date: string | null
          event_name: string | null
          market_id: string | null
          market_name: string | null
          order_executation_status: string | null
          order_placed_time: string | null
          order_price: number | null
          order_settled_time: string | null
          order_stake: number | null
          order_status: string | null
          percentage: number | null
          price_matched: number | null
          price_requested: number | null
          profit: number | null
          profit_with_comm: number | null
          race_name: string | null
          race_type: string | null
          ref: string | null
          result: string | null
          rn: number | null
          selection_id: number | null
          selection_name: string | null
          side: string | null
          strategy_code: string | null
          user_id: number | null
          venue: string | null
        }
        Relationships: []
      }
      punting_form_lb_data: {
        Row: {
          barrier: number | null
          clsdiff: number | null
          colors_file_name: string | null
          entrant_id: string | null
          event_date: string | null
          event_id: string | null
          favourite: boolean | null
          is_scratched: boolean | null
          l200price: number | null
          l200rank: number | null
          l400price: number | null
          l400rank: number | null
          l600_rank: number | null
          l600price: number | null
          l600rank: number | null
          lb_result: string | null
          lbw_rank: number | null
          market_id: string | null
          meeting_datestamp: string | null
          meeting_meetingid: number | null
          meeting_railposition: string | null
          meeting_track_name: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          pfaiprice: number | null
          pfairank: number | null
          pfaiscore: number | null
          place_latest: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          raceno: number | null
          reliable: boolean | null
          result: string | null
          selection_id: number | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_ranking: number | null
          weight_class_ranl: number | null
        }
        Relationships: []
      }
      race_volume_results: {
        Row: {
          back_price: number | null
          bal_price: number | null
          colors_file_name: string | null
          event_date: string | null
          market_id: string | null
          market_start_time: string | null
          percentage: number | null
          race_name: string | null
          race_number: string | null
          race_total_matched: number | null
          race_type: string | null
          rank: number | null
          result: string | null
          runner_count: number | null
          runner_name: string | null
          selection_id: number | null
          venue: string | null
        }
        Relationships: []
      }
      tommy_two_results: {
        Row: {
          age: number | null
          bab: number | null
          bal: number | null
          barrier: number | null
          barrier_avg: number | null
          claim: number | null
          clsdiff: number | null
          colors_file_name: string | null
          distance_avg: number | null
          event_date: string | null
          event_id: string | null
          favourite: string | null
          field_size_avg: number | null
          form_id: number | null
          horse_id: number | null
          horse_name: string | null
          horse_number: number | null
          id: number | null
          is_winner: number | null
          jockey: string | null
          jockey_id: number | null
          l600_rank: number | null
          last10: number | null
          lb_result: string | null
          lb_status: string | null
          lbw_rank: number | null
          margin_avg: number | null
          market_start_time: string | null
          meeting_datestamp: string | null
          meeting_id: number | null
          meeting_meetingid: number | null
          meeting_track_name: string | null
          ml_winner: string | null
          neural_price: number | null
          neural_rank: number | null
          pf_horse_number: number | null
          pf_horsename: string | null
          place_latest: number | null
          position_avg: number | null
          predicted_outcome: number | null
          predicted_settle_position: number | null
          price_11am: number | null
          price_9am: number | null
          price_jump: number | null
          price_latest: number | null
          prob_winner: number | null
          race_distance: number | null
          race_grade: string | null
          race_id: number | null
          raceno: number | null
          record: number | null
          record_count: number | null
          record_distance: number | null
          record_first_up: string | null
          record_good: string | null
          record_heavy: string | null
          record_second_up: string | null
          record_soft: string | null
          record_track: number | null
          record_track_distance: number | null
          reliable: string | null
          result: string | null
          sex: string | null
          start_time: string | null
          status: string | null
          time_adjusted_weight_class_rank: number | null
          time_per_hundred_avg: number | null
          time_ranking: number | null
          track_condition_avg: number | null
          trainer: string | null
          trainer_id: number | null
          venue_name: string | null
          weight: number | null
          weight_avg: number | null
          weight_class_ranl: number | null
          weight_restrictions: string | null
          weight_type: string | null
        }
        Relationships: []
      }
      trend_backtest: {
        Row: {
          bab: number | null
          bal: number | null
          barrier: number | null
          country: string | null
          event_date: string | null
          event_name: string | null
          favourite: boolean | null
          flucs: string | null
          market_id: string | null
          market_name: string | null
          market_start_time: string | null
          percentage: number | null
          price_11am: number | null
          price_9am: number | null
          price_early_rank: number | null
          price_jump: number | null
          price_jump_rank: number | null
          race_total_matched: number | null
          race_type: string | null
          rank: number | null
          result: string | null
          runner_name: string | null
          runner_number: number | null
          selection_id: number | null
          selection_matched: number | null
          venue: string | null
        }
        Relationships: []
      }
      upcoming_races_sheet: {
        Row: {
          event_date: string | null
          hn: string | null
          horse: string | null
          market_id: string | null
          race_type: string | null
          rn: string | null
          selection_id: number | null
          venue: string | null
        }
        Relationships: []
      }
      user_betting_systems_full: {
        Row: {
          auth_id: string | null
          betting_system_id: number | null
          email: string | null
          name: string | null
          race_type: string | null
          user_betting_system_id: number | null
        }
        Relationships: []
      }
      user_information_full: {
        Row: {
          admin: boolean | null
          auth_id: string | null
          banned_until: string | null
          staff: boolean | null
          betfair_access_token: string | null
          betfair_refresh_token: string | null
          betfair_vendor_client_id: string | null
          betting_system_id: number | null
          betting_system_name: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          last_sign_in_at: string | null
          subscription_expiry: string | null
          system_name: number | null
          tbb4_bot: boolean | null
          tbb4_package: number | null
          tbb4_stake_size: number | null
          tbb4_stop_loss: number | null
          tbb4_take_profit: number | null
          token_last_refresh: string | null
          ud_id: number | null
          us_id: string | null
          use_predictor: boolean | null
          usub_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["system_name"]
            isOneToOne: false
            referencedRelation: "betting_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["betting_system_id"]
            isOneToOne: false
            referencedRelation: "betting_systems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["system_name"]
            isOneToOne: false
            referencedRelation: "user_betting_systems_full"
            referencedColumns: ["betting_system_id"]
          },
          {
            foreignKeyName: "user_betting_system_system_id_fkey"
            columns: ["betting_system_id"]
            isOneToOne: false
            referencedRelation: "user_betting_systems_full"
            referencedColumns: ["betting_system_id"]
          },
          {
            foreignKeyName: "user_subscription_tbb4_package_fkey"
            columns: ["tbb4_package"]
            isOneToOne: false
            referencedRelation: "tbb4_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_orders_mv: {
        Row: {
          auth_id: string | null
          bet_id: number | null
          commission: number | null
          email: string | null
          event_date: string | null
          event_name: string | null
          market_id: string | null
          order_executation_status: string | null
          order_placed_time: string | null
          order_price: number | null
          order_settled_time: string | null
          order_stake: number | null
          order_status: string | null
          percentage: number | null
          price_matched: number | null
          price_requested: number | null
          profit: number | null
          profit_with_comm: number | null
          race_name: string | null
          race_type: string | null
          ref: string | null
          result: string | null
          rn: number | null
          selection_id: number | null
          selection_name: string | null
          side: string | null
          strategy_code: string | null
          user_id: number | null
          venue: string | null
        }
        Relationships: []
      }
      user_results_simplified: {
        Row: {
          commission: number | null
          email: string | null
          event_date: string | null
          event_name: string | null
          first_name: string | null
          last_name: string | null
          order_placed_time: string | null
          order_price: number | null
          order_settled_time: string | null
          order_stake: number | null
          order_status: string | null
          percentage: number | null
          price_matched: number | null
          price_requested: number | null
          profit: number | null
          race_name: string | null
          race_type: string | null
          result: string | null
          selection_name: string | null
          side: string | null
          venue: string | null
        }
        Relationships: []
      }
      website_results: {
        Row: {
          bet_id: number | null
          event_date: string | null
          order_placed_time: string | null
          price_matched: number | null
          selection_name: string | null
          side: string | null
          units: number | null
          venue: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
