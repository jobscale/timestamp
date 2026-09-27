export const createTimezone = (opts = {}) => {
  const {
    timeZone = 'Asia/Tokyo',
    useSpace = true,
    milliseconds = false,
    offset = true,
  } = opts;
  return (opts = {}) => {
    const {
      ts = Date.now(),
      space = useSpace,
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
    if (space) res.ts = res.ts.replace('T', ' ');
    return res.ts;
  };
};

export const formatTimestamp = createTimezone();

export const formatDuration = (target, someone = Date.now()) => {
  const startInstant = new Date(target).toTemporalInstant();
  const endInstant = new Date(someone).toTemporalInstant();
  const duration = endInstant.since(startInstant, { largestUnit: 'hour' });
  const totalHours = Math.floor(Math.abs(duration.total({ unit: 'hour' })));
  const minutes = Math.abs(duration.minutes);
  const seconds = Math.abs(duration.seconds);
  const hh = String(totalHours);
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
    return `${totalHours ? `${hh}:` : ''}${mm}:${ss}`;
};
