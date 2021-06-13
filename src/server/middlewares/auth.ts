import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import admin from '../libs/firebase/firebase-admin';
import asyncWrapper from '../utils/async-wrapper';

const NEXT_REGEX = /\/.next.*/;
const TOKEN_NAME = 'LABS_SID_AUT';

const authMiddleware = (): RequestHandler => {
  return asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[TOKEN_NAME];

    if (NEXT_REGEX.test(req.originalUrl) || !token) {
      return next();
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (!(req as any).state) {
        (req as any).state = {};
      }

      (req as any).state.user = {
        id: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        photo: decodedToken.picture,
      };
    } catch (e) {
      console.error(e);
      if ((req as any).state) {
        (req as any).state.user = null;
      }
      res.cookie(TOKEN_NAME, '', { httpOnly: true, maxAge: 0 });
      res.redirect('/');
    }

    return next();
  });
};

export default authMiddleware;
