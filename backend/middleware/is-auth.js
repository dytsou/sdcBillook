import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    req.isAuth = false;
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }
    // token is in the format 'Bearer {token}'
    const token = authHeader.split(' ')[1];
    if (!token || token.trim().length === 0) {
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'genshinImpactActivate');
    } catch (err) {
        return next();
    }
    if (!decodedToken) {
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
};

export default isAuth;