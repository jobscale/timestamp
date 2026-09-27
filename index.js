export const createTimezone = (opts = {}) => {
  const {
    timeZone = 'Asia/Tokyo',
    offset = true,
    milliseconds = false,
    separator = false,
  } = opts;
  return (opts = {}) => {
    const {
      ts = Date.now(),
      iso = separator,
      ms = milliseconds,
      tz = offset,
    } = opts;
    const instant = Temporal.Instant.fromEpochMilliseconds(new Date(ts));
    const zonedDateTime = instant.toZonedDateTimeISO(timeZone);
    const res = {
      ts: zonedDateTime.toString({
        timeZoneName: 'never',
        offset: tz ? 'auto' : 'never',
        smallestUnit: ms ? 'millisecond' : 'second',
        fractionalSecondDigits: ms ? 3 : 0,
      }),
    };
    if (!iso) res.ts = res.ts.replace('T', ' ');
    return res.ts;
  };
};

export const formatTimestamp = createTimezone();
