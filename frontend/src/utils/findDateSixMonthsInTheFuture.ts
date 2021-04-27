const SIX_MONTHS_IN_MILLIS = 15552000000;

export const findDateSixMonthsInTheFuture = (): Date => {
  const today = new Date().getTime();

  return new Date(today + SIX_MONTHS_IN_MILLIS);
};
