import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;

function authz(req, res, next) {
    const token = req.header('x-authn-token');
    if (!token)
        return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

export default authz;
