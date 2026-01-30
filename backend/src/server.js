import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import riskRoutes from './routes/riskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/risk', riskRoutes)

app.get('/api/health', (req, res, next) => {
    res.json({ status: 'Backend is live!' });
});

app.post('/api/mock-zendesk', (req, res, next) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            const error = new Error('Session ID is required');
            error.status = 400;
            return next(error);
        }

        const ticketId = Math.floor(Math.random() * 10000);

        res.json({
            success: true,
            message: 'Zendesk ticket updated',
            ticketId: ticketId
        });
    } catch (error) {
        next(error)
    }
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.path
    });
});

app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
