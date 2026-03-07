import axios from "axios";

export async function POST(req: Request) {
  const { code, user_settings_id } = await req.json();
  if (!code || !user_settings_id) {
    return new Response(
      JSON.stringify({
        message: "missing parameter",
        params: { code, user_settings_id },
      })
    );
  }
  console.log("Handle code started");
  const authServerUrl = `https://sb.laybackandwin.au/functions/v1/betfairAuthExchange?code=${code}&settingsId=${user_settings_id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.SUPABASE_KEY,
    },
    url: authServerUrl,
    method: "post",
    crossdomain: true,
  };

  const response = await axios(config);

  if (response.status === 200) {
    console.log(`[API] betfair-auth-exchange completed successfully settingsId=${user_settings_id}`);
    return new Response(JSON.stringify(response), { status: 200 });
  }

  return new Response(JSON.stringify(response), { status: 500 });
}
