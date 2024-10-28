
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.details
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized Access',
            details: err.message
        });
    }

    if (err.name === 'DatabaseError') {
        return res.status(500).json({
            error: 'Database Error',
            details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }

    // Default error
    res.status(500).json({
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

// 404 handler
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        details: 'The requested resource was not found'
    });
};