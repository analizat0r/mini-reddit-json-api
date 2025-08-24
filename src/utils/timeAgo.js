export default function timeAgoConverter(epochSeconds) {
    const now = Date.now();
    const diffMs = now - (epochSeconds * 1000); // difference in ms
    const diffSeconds = Math.floor(diffMs / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always", style: "short" });

    if (Math.abs(diffSeconds) < 60) {
        return rtf.format(-diffSeconds, "second");
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (Math.abs(diffMinutes) < 60) {
        return rtf.format(-diffMinutes, "minute");
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) {
        return rtf.format(-diffHours, "hour");
    }

    const diffDays = Math.floor(diffHours / 24);
    return rtf.format(-diffDays, "day");
}