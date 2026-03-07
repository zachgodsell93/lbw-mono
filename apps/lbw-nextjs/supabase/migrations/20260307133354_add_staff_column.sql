-- Add staff column to user_settings
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS staff boolean DEFAULT false;

-- Drop dependent view first, then user_information_full
DROP VIEW IF EXISTS public.user_betting_systems_full;
DROP VIEW IF EXISTS public.user_information_full;

-- Recreate user_information_full with staff column
CREATE VIEW public.user_information_full AS
SELECT ud.email,
    ud.auth_id,
    us.id AS us_id,
    usub.id AS usub_id,
    us.betfair_access_token,
    us.betfair_refresh_token,
    us.betfair_vendor_client_id,
    us.tbb4_bot,
    us.tbb4_stake_size,
    us.tbb4_stop_loss,
    us.tbb4_take_profit,
    usub.expires AS subscription_expiry,
    usub.tbb4_package,
    ud.id AS ud_id,
    ud.first_name,
    ud.last_name,
    users.last_sign_in_at,
    us.admin,
    us.staff,
    us.token_last_refresh,
    us.use_predictor,
    bs.system_id AS system_name,
    '1'::text AS betting_system_name,
    bs.system_id AS betting_system_id,
    users.banned_until,
    users.created_at
FROM user_details ud
    LEFT JOIN user_settings us ON ud.settings_id = us.id
    LEFT JOIN user_subscription usub ON ud.subscription_id = usub.id
    LEFT JOIN auth.users ON ud.auth_id = users.id
    LEFT JOIN user_betting_system bs ON bs.auth_id = ud.auth_id;

-- Recreate dependent view
CREATE VIEW public.user_betting_systems_full AS
SELECT ubs.race_type,
    ubs.auth_id,
    bs.name,
    ubs.id AS user_betting_system_id,
    uif.email,
    bs.id AS betting_system_id
FROM user_betting_system ubs
    JOIN betting_systems bs ON bs.id = ubs.system_id
    JOIN user_information_full uif ON uif.auth_id = ubs.auth_id;
