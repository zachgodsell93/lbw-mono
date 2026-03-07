// import { getUsersUpcomingRaces } from "@/utils/user";
// import { supabase } from "@/utils/supabase/client";
// import moment from "moment";
// import { Database } from "@/types/supabase.types";

// type User = Database["public"]["Views"]["user_information_full"]["Row"];

// // Mock the supabase client
// jest.mock("../src/supabase/client", () => ({
//   supabase: {
//     from: jest.fn().mockReturnThis(),
//     select: jest.fn().mockReturnThis(),
//     eq: jest.fn().mockReturnThis(),
//     gt: jest.fn().mockReturnThis(),
//     in: jest.fn().mockReturnThis(),
//     not: jest.fn().mockReturnThis(),
//     order: jest.fn().mockReturnThis(),
//     limit: jest.fn().mockReturnThis(),
//     gte: jest.fn().mockReturnThis(),
//   },
// }));

// const mockSupabase = supabase as jest.Mocked<typeof supabase>;

// describe("getUsersUpcomingRaces", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return empty array if user has no races", async () => {
//     const user: User = {
//       tbb4_package: 1,
//       subscription_expiry: moment().subtract(1, "day").utc().format(),

//       // other user properties
//     };

//     mockSupabase.from.mockReturnThis();
//     mockSupabase.select.mockResolvedValue({ data: [], error: null });

//     const result = await getUsersUpcomingRaces(user);
//     expect(result).toEqual([]);
//   });

//   it("should return upcoming races based on user package settings", async () => {
//     const user: User = {
//       tbb4_package: 5,
//       // other user properties
//     };

//     const mockRaces = [
//       {
//         market_start_time: moment().add(5, "minutes").utc().format(),
//         market_id: "1",
//         race_type: "Thoroughbred",
//       },
//       // more mock races
//     ];

//     mockSupabase.from.mockReturnThis();
//     mockSupabase.select.mockReturnThis();
//     mockSupabase.gt.mockReturnThis();
//     mockSupabase.eq.mockReturnThis();
//     mockSupabase.not.mockReturnThis();
//     mockSupabase.order.mockReturnThis();
//     mockSupabase.limit.mockResolvedValue({ data: mockRaces, error: null });

//     const result = await getUsersUpcomingRaces(user);
//     expect(result).toHaveLength(1);
//     expect(result[0]).toHaveProperty("timeTilJump");
//   });

//   it("should exclude races based on user settings", async () => {
//     const user: User = {
//       tbb4_package: 5,
//       // other user properties
//     };

//     const excludedRaces = [{ market_id: "1" }];
//     const availableRaces = [
//       {
//         market_start_time: moment().add(10, "minutes").utc().format(),
//         market_id: "2",
//         race_type: "Thoroughbred",
//       },
//     ];

//     mockSupabase.from.mockReturnThis();
//     mockSupbase.select.mockReturnThis();
//     mockSupbase.gt.mockReturnThis();
//     mockSupbase.eq.mockReturnThis();
//     mockSupbase.not.mockReturnThis();
//     mockSupbase.order.mockReturnThis();
//     mockSupbase.limit.mockReturnThis();

//     // Mock excluded races response
//     mockSupabase.select.mockResolvedValueOnce({
//       data: excludedRaces,
//       error: null,
//     });

//     // Mock available races response
//     mockSupabase.limit.mockResolvedValueOnce({
//       data: availableRaces,
//       error: null,
//     });

//     const result = await getUsersUpcomingRaces(user);
//     expect(result).toHaveLength(1);
//     expect(result[0].market_id).toBe("2");
//   });

//   // Add more test cases for other branches and conditions in your function
// });
