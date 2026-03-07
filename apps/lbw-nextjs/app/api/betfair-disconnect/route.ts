import axios from "axios";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { access_token, vendor_id } = await req.json();
  const betfairUrl =
    "https://api.betfair.com/exchange/account/rest/v1.0/revokeAccessToWebApp/";

  const headers = {
    "X-Application": "yjzIsyiIeYnfS30s",
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const config = {
    headers: headers,
    url: betfairUrl,
    method: "post",
    data: {
      vendorId: "117531",
    },
  };

  const response = await axios(config);
  console.log(response.data, response.status, response.statusText);

  if (response.status === 200) {
    const { data, error } = await supabase
      .from("user_settings")
      .update({
        betfair_access_token: null,
        betfair_refresh_token: null,
        betfair_vendor_client_id: null,
      })
      .eq("betfair_access_token", access_token);

    if (!error) {
      console.log("[API] betfair-disconnect completed successfully");
      return new Response(JSON.stringify({ data }), { status: 200 });
    }
    console.log(data, error);
    return new Response(
      JSON.stringify({ error: "Issue deleting client data" }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify(response.data), { status: 500 });
}
