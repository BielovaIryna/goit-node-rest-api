import { serverConfig } from '../configs/serverConfig.js';
import HttpError from '../helpers/HttpError.js';

import jwt from 'jsonwebtoken';

const registerToken = (id) =>
  jwt.sign({ id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpiresIn,
  });

const checkToken = (token) => {
  if (!token) throw new HttpError(401, 'Not logged in..');

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw new HttpError(401, 'Not logged in..');
  }
};


export{registerToken}