import { useState, useEffect } from 'react'

export const useRiskSessions = () => {
    const [riskSessions, setRiskSessions] = useState([])
    const [error, setError] = useState(null)

    const fetchRiskSessions = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
            const response = await fetch(`${apiUrl}/api/risk/sessions`)

            if (!response.ok) {
                throw new Error(`Failed to fetch at-risk sessions (Status: ${response.status})`)
            }

            const data = await response.json()
            setRiskSessions(data)
        } catch (error) {
            console.error('Error fetching at-risk sessions:', error)
            setError(error.message || 'Failed to load at-risk sessions. Please check your connection.')
            setRiskSessions([])
        }
    }

    useEffect(() => {
        fetchRiskSessions()
    }, [])

    return { riskSessions, error }
}