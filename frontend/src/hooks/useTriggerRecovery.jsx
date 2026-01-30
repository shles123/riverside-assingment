
export const useTriggerRecovery = () => {
    const triggerRecover = async (sessionId) => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

        try {
            const response = await fetch(`${apiUrl}/api/mock-zendesk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionId })
                // body: JSON.stringify({})  // Test: sending empty body to trigger 400
            })

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid session ID provided.')
                }
                throw new Error(`Failed to trigger recovery (Status: ${response.status})`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Network error. Please check your connection and try again.')
            }
            throw error
        }
    }

    return { triggerRecover }
}