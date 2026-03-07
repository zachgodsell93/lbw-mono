import {
  createUser,
  createUserDetails,
  createCustomerSubscription,
  createCustomerSettings,
  addSubandSettingsToUser,
} from "@/utils/signup";

export async function POST(req: Request) {
  const { customerDetails, product, password } = await req.json();
  if (!product) return new Response("No product selected", { status: 400 });
  // returns auth id if successful
  const user = await createUser({
    email: customerDetails.email,
    password: password,
  });

  if (!user.id) return;
  const userDetails = await createUserDetails(customerDetails, user.id);
  if (!userDetails.id)
    return new Response("Error creating user details", { status: 500 });

  const subscription = await createCustomerSubscription(product?.packageId);
  if (!subscription.id)
    return new Response("Error creating subscription", { status: 500 });
  const settings = await createCustomerSettings();
  if (!settings.id)
    return new Response("Error creating settings", { status: 500 });
  const userWithSubAndSettings = await addSubandSettingsToUser(
    userDetails.id,
    settings.id,
    subscription.id
  );

  console.log(`[API] create-user completed successfully userId=${userDetails.id}`);
  return new Response(JSON.stringify(userWithSubAndSettings), { status: 200 });
}
