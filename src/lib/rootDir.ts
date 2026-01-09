import path from 'path';

/**
 * Get the root directory of the project
 * In Next.js, process.cwd() returns the directory where the Next.js application is running
 * @returns {string} The absolute path to the project root directory
 */
export function getRootDir(): string {
  return process.cwd();
}

/**
 * Resolve a path relative to the project root directory
 * @param relativePath - The relative path to resolve
 * @returns {string} The absolute path
 */
export function resolveFromRoot(...relativePath: string[]): string {
  return path.join(getRootDir(), ...relativePath);
}

/**
 * The root directory of the project
 * This is a constant that can be imported and used throughout the application
 */
export const ROOT_DIR = process.cwd();
