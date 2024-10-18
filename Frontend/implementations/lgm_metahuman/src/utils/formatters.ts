export abstract class Formatters {
    static toDuration(durationS: number) {
        if (!durationS) return '00:00:00';
        const hours = Math.floor(durationS / 3600);
        const minutes = Math.floor((durationS - hours * 3600) / 60);
        const seconds = Math.floor(durationS - hours * 3600 - minutes * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    static toVerboseDuration(durationS: number, includeSeconds = true) {
        if (!durationS) return '0s';
        const hours = Math.floor(durationS / 3600);
        const minutes = Math.floor((durationS - hours * 3600) / 60);
        const seconds = Math.floor(durationS - hours * 3600 - minutes * 60);
        let duration = (includeSeconds || (!minutes && !hours)) ? seconds + 's' : '';
        if (minutes || hours) duration = minutes + 'm ' + duration;
        if (hours) duration = hours + 'h ' + duration;
        return duration.trim();
    }
}