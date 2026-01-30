import { getUsers, getSessions } from '../models/dataStore.js'

export const getRiskSessions = () => {
    const users = getUsers()
    const sessions = getSessions()

    const atRisk = sessions.filter(s =>
        s.status === 'processing' && s.minutes_since_start > 120
    )

    const mapped = atRisk.map(session => {
        const user = users.find(u => u.id === session.user_id)
        const unknownStart = session.minutes_since_start === Infinity
        if (!user) {
            console.warn(`Session ${session.id} references non-existent user ${session.user_id}`)
            return {
                id: session.id,
                sessionName: session.name,
                timeElapsed: session.minutes_since_start,
                userEmail: 'Unknown User',
                isHighPriority: unknownStart
            }
        }
        const isHighPriority = user.tier === 'Business' || unknownStart

        return {
            id: session.id,
            sessionName: session.name,
            timeElapsed: session.minutes_since_start,
            userEmail: user.email,
            isHighPriority: isHighPriority
        }
    })

    return mapped.sort((a, b) => {
        return (b.isHighPriority - a.isHighPriority) || (b.timeElapsed - a.timeElapsed)
    })

}