require('dotenv').config();

export const mongoURI = process.env.MONGODB_URI;
export const githubClientID = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const sessionSecret = process.env.SESSION_SECRET;
