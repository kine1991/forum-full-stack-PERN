import { Request, Response, NextFunction, query } from 'express';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import catchAsync from '../utils/catchAsync';
import { BadRequestError } from '../utils/errors';
import client from '../utils/client';

const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id);
  const cookieOptions:any = {
    expires: new Date(
      
      Date.now() + <any>process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    token,
    user
  });
}

export const signIn = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await client.query({
    text: 'SELECT * FROM users WHERE users.email = $1',
    values: [email]
  });

  if(!existingUser.rows[0]) throw new BadRequestError('This email do not exists!', 404);

  const comparePassword = await bcrypt.compare(password, existingUser.rows[0].password);
  if (!comparePassword) {
    throw new BadRequestError('Incorrect email or password!', 401);
  }

  createSendToken(existingUser.rows[0], 201, res);
});

export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { nickname, email, password } = req.body;

  if(validator.isEmpty(nickname)) throw new BadRequestError('Please provide nickname!', 400);
  if(!validator.isLength(nickname, { min: 2, max: 30 })) throw new BadRequestError('Nickname should be min: 2, max: 30!', 400);
  if(validator.isEmpty(email)) throw new BadRequestError('Please provide email!', 400);
  if(!validator.isEmail(email)) throw new BadRequestError('Invalid email', 400);
  if(validator.isEmpty(password)) throw new BadRequestError('Please provide password!', 400);
  if(!validator.isLength(password, { min: 6, max: 30 })) throw new BadRequestError('password should be min: 6, max: 30!', 400);

  const countEmail = await client.query({
    text: 'SELECT COUNT(*) FROM users WHERE users.email = $1',
    values: [email]
  });
  const emailIsExists = +countEmail.rows[0].count === 0 ? false : true
  if(emailIsExists) throw new BadRequestError(`Email: '${email}' already been taken`, 400);

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('hashedPassword', hashedPassword);
  const user = await client.query({
    text: 'INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) returning *',
    values: [nickname, email, hashedPassword]
  });
  
  createSendToken(user.rows, 201, res);
});

export const checkAuth2 = catchAsync(async (req: Request, res: Response) => {

});

export const checkAuth = async (req: Request, res: Response) => {
  try {
    let user;
    if(!req.cookies?.jwt) {
      user = null;
    } else {
      const token = req.cookies.jwt;
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET!) as { id: string };
      console.log('decoded2222', decoded);

      const userRes = await client.query({
        text: 'SELECT nickname, email, created_at FROM users WHERE users.id = $1',
        values: [decoded.id]
      });
      user = userRes.rows[0];
    }

    res.json({
      user
    });
  } catch (error) {
    res.json({
      user: null
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true
  });
  res.status(200).json({ 
    data: {
      user: null
    }
  });
};

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies?.jwt) {
    next(new BadRequestError('You are not logged in! Please log in to get access.', 401));
  }
  const token = req.cookies.jwt
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET!) as { id: string };
  
  console.log('@@@, jwt', req.cookies.jwt)
  console.log('@@@, decoded', decoded)
  const currentUserRes = await client.query({
    text: 'SELECT id, nickname, email, created_at FROM users WHERE users.id = $1',
    values: [decoded.id]
  });
  console.log('@@@currentUserRes, currentUserRes', currentUserRes)
  const currentUser = currentUserRes.rows[0];
  if(!currentUser) next(new BadRequestError('The user belonging to this token does no longer exist.', 401));

  req.user = currentUser;
  next();
});

export interface UserDoc {
  id?: number;
  name: string;
  email: string;
  photo?: string;
  role?: string;
  password?: string;
  passwordConfirm?: string | undefined;
  passwordChangedAt?: Date | number;
  passwordResetToken?: string,
  passwordResetExpires?: Date,
  active?: boolean
}

declare global {
  namespace Express {
    interface Request {
      user?: UserDoc | null | undefined;
    }
  }
}