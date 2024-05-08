const enableCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // server accept request from any origin
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS'); // server accept request with these methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // server accept request with these headers

    if (req.method === 'OPTIONS') { 
        return res.sendStatus(200); // we simply return 200 status code for preflight request
    }
    next();
}

export default enableCors;