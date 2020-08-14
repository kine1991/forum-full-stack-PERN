import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/errors';


const errorController = (err: Error | any, req: Request, res: Response, next: NextFunction) => {
  console.log('eRRR@@', err);
  console.log('eRRR@@CODE', err.code!);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors()
    });
  }

  if(+err.code === 23505) {
    const field = err.detail.match(/\((.*?)\)/g)[0];
    const value = err.detail.match(/\((.*?)\)/g)[1];
    const message = `${field}: ${value} already been taken`;
    return res.status(429).send({
      errors: [{message}]
    });
  }

  if(+err.code === 23503) {
    // const field = err.detail.match(/\((.*?)\)/g)[0];
    // const value = err.detail.match(/\((.*?)\)/g)[1];
    // const message = `${field}: ${value} already been taken`;
    const message = err.detail
    return res.status(429).send({
      errors: [{message}]
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(429).send({
      errors: [{message: 'Invalid token.'}]
    });
  }

  // 'Key (nickname)=(nk2) already exists2.'.match(/(2)+/i)
  // if (err.name === 'CastError') {
  //   // @ts-ignore
  //   const message = `This route is not found: (${err.path}: ${err.value})`;
  //   return res.status(404).json({
  //     errors: [{message}]
  //   });
  // }

  console.error('@log (errorController)', err);
  // res.status(400).send({
  //   errors: [{ message: err }]
  // })
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  })
};

export default errorController;