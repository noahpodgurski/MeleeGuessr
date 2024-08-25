// @ts-nocheck

import { registerHandler } from './routes/register';
import { loginHandler } from './routes/login';
import { statHandler } from './routes/stat';
import { playHandler } from './routes/play';
import { guessHandler } from './routes/guess';

import schema from './prisma/schema.prisma';
import x from './node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node'

if (process.env.NODE_ENV !== 'production') {
    console.debug(schema, x)
}

export const login = loginHandler;
export const register = registerHandler;
export const stat = statHandler;
export const play = playHandler;
export const guess = guessHandler;