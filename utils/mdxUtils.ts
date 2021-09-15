import fs from "fs";
import path from "path";

/** Root folder for posts */
export const POSTS_PATH = path.join(process.cwd(), "posts");

/** List of all `mdx` files inside the POSTS_PATH directory */
export const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
