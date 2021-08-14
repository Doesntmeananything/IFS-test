import i18n from '../configs/i18n';

/**
 * Formats broadcast time string based on current locale.
 *
 * @param start broadcast start time in UTC
 * @param end broadcast end time in UTC
 * @returns string containing dash separated broadcast start and end time
 *
 */
export const formatBroadcastTime = (start?: string, end?: string): string => {
    if (!start || !end) return '';

    const startDate = new Date(start).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
    const endDate = new Date(end).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });

    return `${startDate} — ${endDate}`;
};

/**
 * Converts given duration in seconds to formatted string of hours (optionally) and minutes
 *
 * @param seconds duration in seconds
 * @returns string containing whitespace separated hours (optional) and minutes
 */
export const formatSecondsToHoursAndMinutes = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedHours = hours > 0 ? hours + (hours === 1 ? ' hour' : ' hours') : '';
    const formattedMinutes = minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : '';

    return `${formattedHours} ${formattedMinutes}`.trim();
};
