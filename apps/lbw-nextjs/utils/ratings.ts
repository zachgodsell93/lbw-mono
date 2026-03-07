export const bestOfTheDay = (baseData: any[]) => {
  const botdData = baseData.filter(
    (data) =>
      data.price_latest < 20 &&
      //   data.horse_count > 7 &&
      data.price_9am &&
      data.reliable === true &&
      data.pfaiprice < data.price_9am &&
      data.pfairank === 1 &&
      (data.l600rank === 1 || data.l200rank === 1)
  );

  const lotdData = baseData.filter(
    (data) =>
      data.pfairank > 3 &&
      data.price_9am &&
      data.price_9am > 5 &&
      data.favourite === true
  );

  const votdData = baseData.filter(
    (data) =>
      data.pfairank <= 3 &&
      data.price_9am &&
      data.price_9am > 10 &&
      (data.l600rank === 1 || data.l400rank === 1 || data.l200rank === 1)
  );
  //   Remove duplicates based on venue name and horse name
  const uniqueBotdData = Array.from(
    new Set(botdData.map((a) => a.meeting_track_name + a.pf_horsename))
  ).map((name) => {
    return botdData.find((a) => a.meeting_track_name + a.pf_horsename === name);
  });

  const uniqueLotdData = Array.from(
    new Set(lotdData.map((a) => a.meeting_track_name + a.pf_horsename))
  ).map((name) => {
    return lotdData.find((a) => a.meeting_track_name + a.pf_horsename === name);
  });

  const uniqueVotdData = Array.from(
    new Set(votdData.map((a) => a.meeting_track_name + a.pf_horsename))
  ).map((name) => {
    return votdData.find((a) => a.meeting_track_name + a.pf_horsename === name);
  });
  return {
    backs: uniqueBotdData,
    lays: uniqueLotdData,
    value: uniqueVotdData,
  };
};
