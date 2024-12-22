export function formatDateTime(
  date: Date = new Date(),
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
): string {
  const formattedDate = date.toLocaleString(locale, options);
  return formattedDate.replace(",", "");
}
