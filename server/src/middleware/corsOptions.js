import cors from 'cors';

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if necessary
};

app.use(cors(corsOptions));
