import './App.css'
import { useState } from 'react'
import { useRiskSessions } from './hooks/useRiskSessions'
import { useTriggerRecovery } from './hooks/useTriggerRecovery'

function App() {
  const { riskSessions, error } = useRiskSessions()
  const { triggerRecover } = useTriggerRecovery()
  const [recoveredSessions, setRecoveredSessions] = useState(new Set())
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleTriggerRecovery = async (sessionId) => {
    try {
      const result = await triggerRecover(sessionId)
      setRecoveredSessions(prev => new Set([...prev, sessionId]))

      setMessage({
        text: `Zendesk Ticket #${result.ticketId || '1092'} updated: Recovery sequence started.`,
        type: 'success'
      })

      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    } catch (error) {
      console.error('Failed to trigger recovery:', error)
      setMessage({
        text: error.message || 'Failed to trigger recovery. Please try again.',
        type: 'error'
      })
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    }
  }

  return (
    <div className="dashboard">
      <div className="navbar">
        <img src="riverside_logo.svg" alt="Riverside Logo" />
      </div>
      <h1>At-Risk Sessions Dashboard</h1>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <table className="sessions-table">
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Time Elapsed (min)</th>
            <th>User Email</th>
            <th>Priority Status</th>
            <th>Trigger Recovery</th>
          </tr>
        </thead>
        <tbody>
          {riskSessions.map((session) => (
            <tr key={session.id}>
              <td>{session.sessionName}</td>
              <td>{session.timeElapsed}</td>
              <td>{session.userEmail}</td>
              <td>
                <span className={session.isHighPriority ? 'priority-high' : 'priority-normal'}>
                  {session.isHighPriority ? 'High Priority' : 'Normal'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleTriggerRecovery(session.id)}
                  disabled={recoveredSessions.has(session.id)}
                >
                  {recoveredSessions.has(session.id) ? 'Recovery Triggered' : 'Trigger Recovery'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {riskSessions.length === 0 && (
        <p className="no-data">No at-risk sessions found.</p>
      )}
    </div>
  )
}

export default App
