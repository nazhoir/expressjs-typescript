import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByUsername, findUserById } from '@/models/user';

// Configure the local strategy for use by Passport.
passport.use(
  new LocalStrategy((username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
    const user = findUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }),
);

// Serialize the user ID to save in the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize the user ID from the session and find the user in the database
passport.deserializeUser((id: number, done) => {
  const user = findUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});

export default passport;
