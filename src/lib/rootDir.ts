import path from 'path';

/**
 * The root directory of the project
 * In Next.js, process.cwd() returns the directory where the Next.js application is running
 * This is captured at module load time
 */
export const ROOT_DIR = process.cwd();

/**
 * Get the root directory of the project
 * In Next.js, this returns the directory where the Next.js application is running
 * @returns {string} The absolute path to the project root directory
 */
export function getRootDir(): string {
  return ROOT_DIR;
}

/**
 * Resolve a path relative to the project root directory
 * @param relativePath - The relative path to resolve
 * @returns {string} The absolute path
 */
export function resolveFromRoot(...relativePath: string[]): string {
  return path.join(ROOT_DIR, ...relativePath);
}
