module.exports = (AllowedOrigins) => {
    return (req, res, next) => {
        const origin = req.headers.origin;
        if (AllowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Request-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PUT, PATCH, GET');
            return res.status(200).json({});
        }
        console.log('proxy for react app');
        next();
    }
};