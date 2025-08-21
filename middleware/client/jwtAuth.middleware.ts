// Middleware for token verification
import jwt from "jsonwebtoken";
const secretKeyJWT =process.env.JWT_SECRET_KEY;
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token required');

  jwt.verify(token, secretKeyJWT, (err:Error, user:any) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req.user = user;
    next();
  });
};

// Protected route example
// app.get('/dashboard', authenticateToken, (req, res) => {
//   res.status(200).send('Welcome to the dashboard, ' + req.user.userId);
// });

export default authenticateToken;