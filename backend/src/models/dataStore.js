import usersData from '../../data/users.json' with { type: 'json' };
import sessionsData from '../../data/sessions.json' with { type: 'json' };

const users = usersData.filter(user => {
    if (!user.id) {
        console.warn('User missing id, filtering out:', user)
        return false
    }
    return true
}).map(user => {
    let updatedUser = { ...user }

    if (!user.email) {
        console.warn(`User ${user.id} missing email, defaulting to 'unknown@riverside.fm'`)
        updatedUser.email = 'unknown@riverside.fm'
    }

    if (user.tier !== 'Free' && user.tier !== 'Business') {
        console.warn(`User ${user.id} has invalid tier "${user.tier}", defaulting to Unknown`)
        updatedUser.tier = 'Unknown'
    }

    return updatedUser
})

const sessions = sessionsData.filter(session => {
    if (!session.id) {
        console.warn('Session missing critical field (id), filtering out:', session)
        return false
    }
    if (!session.status || (session.status !== 'processing' && session.status !== 'complete')) {
        console.warn(`Session ${session.id} has invalid/missing status "${session.status}", filtering out`)
        return false
    }
    return true
}).map(session => {
    let updatedSession = { ...session }

    if (!session.name) {
        console.warn(`Session ${session.id} missing name, defaulting to 'Unnamed Session'`)
        updatedSession.name = 'Unnamed Session'
    }

    if (session.minutes_since_start === undefined || session.minutes_since_start === null) {
        console.warn(`Session ${session.id} missing minutes_since_start, defaulting to Infinity (requires review)`)
        updatedSession.minutes_since_start = Infinity
    } else if (typeof session.minutes_since_start !== 'number' || session.minutes_since_start < 0) {
        console.warn(`Session ${session.id} has invalid minutes_since_start, defaulting to Infinity (requires review)`)
        updatedSession.minutes_since_start = Infinity
    }

    if (!session.user_id) {
        console.warn(`Session ${session.id} missing user_id, defaulting to 'unknown'`)
        updatedSession.user_id = 'unknown'
    }

    return updatedSession
})

export const getUsers = () => users
export const getSessions = () => sessions