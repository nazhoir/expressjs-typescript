import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '@/configs/jwt';

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);

      const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: jwtExpiresIn });
      return res.json({ message: 'Logged in successfully', user, token });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Failed to log out' });
    res.json({ message: 'Logged out successfully' });
  });
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};
