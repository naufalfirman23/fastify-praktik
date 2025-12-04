//DAFTAR ROUTE DI SINI

import app from '../index.js';
import authRoutes from './auth.js';
import homeRoute from './home.js';
import userRoute from './user.js';


export async function registerRoutes(app) {
  await app.register(homeRoute, {prefix: '/api/home'});
  await app.register(userRoute, {prefix: '/api/users'});
  await app.register(authRoutes, {prefix: '/api/auth'});
  app.log.info('Routes registered');
}