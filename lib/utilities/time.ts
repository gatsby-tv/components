export function format(seconds: number) {
  let time = Time(seconds);
  let result = time
    .slice(time.findIndex((value) => value !== 0))
    .reduce(Time.reduce, "");
  if (result.length < 3) {
    return `0:${result.padStart(2, "0")}`;
  } else {
    return result;
  }
}

function Time(time: number) {
  return [
    Math.floor(time / 3600),
    Math.floor((time % 3600) / 60),
    Math.floor((time % 3600) % 60),
  ];
}

Time.reduce = (acc: string, value: number) => {
  if (acc.length === 0) {
    return value.toString();
  } else {
    return `${acc}:${value.toString().padStart(2, "0")}`;
  }
};
