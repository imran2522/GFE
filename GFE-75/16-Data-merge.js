/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @returns {Array<{user: number, duration: number, equipment: Array<string>}>}
 */
export default function mergeData(sessions) {
    const mergedSessions = {};
    const firstOccurrence = {};

    sessions.forEach((session, index) => {
        const { user, duration, equipment } = session;

        if (!mergedSessions[user]) {
            mergedSessions[user] = { user, duration: 0, equipment: [] };
            firstOccurrence[user] = index;
        }

        mergedSessions[user].duration += duration;
        mergedSessions[user].equipment = [...new Set([...mergedSessions[user].equipment, ...equipment])].sort();
    });

    return Object.values(mergedSessions).sort((a, b) => firstOccurrence[a.user] - firstOccurrence[b.user]);   
}

const sessions = [
    { user: 1, duration: 30, equipment: ['treadmill'] },
    { user: 2, duration: 45, equipment: ['elliptical'] },
    { user: 1, duration: 20, equipment: ['bike', 'kettlebell'] },
    { user: 3, duration: 60, equipment: ['rowing machine'] },
    { user: 2, duration: 15, equipment: ['treadmill'] }
];

console.log(mergeData(sessions));
/*
[
    { user: 1, duration: 50, equipment: ['treadmill', 'stationary bike'] },
    { user: 2, duration: 60, equipment: ['elliptical', 'treadmill'] },
    { user: 3, duration: 60, equipment: ['rowing machine'] }
]
*/  