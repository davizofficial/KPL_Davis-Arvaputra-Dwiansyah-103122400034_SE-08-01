const now = new Date();

const formatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formattedDate = formatter.format(now);

const result = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

console.log(result);
