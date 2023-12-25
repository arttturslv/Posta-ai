import dotenv from 'dotenv';
dotenv.config();

export const PORT = 3001;

export const mongoDBURL = process.env.URLMONGO;