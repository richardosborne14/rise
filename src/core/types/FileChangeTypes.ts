/**
 * @file FileChangeTypes.ts
 * @description Type definitions for the hash-based file change detection system.
 *              Defines the interface for tracking file changes and distinguishing
 *              between tool-generated edits and user edits.
 * 
 * @architecture Phase 0, Task 0.1 - File Watcher with Hash Detection
 * @created 2025-10-26
 * @author AI (Cline) + Human Review
 * @confidence 9/10 - Types are straightforward and well-defined
 * 
 * @see docs/MVP_ROADMAP.md - Phase 0.3 File Watcher Algorithm
 * @see docs/ARCHITECTURE.md - File System Watcher section
 * @see .implementation/phase-0-foundation/task-0.1-file-watcher.md
 * 
 * @security-critical false
 * @performance-critical false
 */

/**
 * Interface for file change detection using content hashing.
 * 
 * PROBLEM SOLVED:
 * Prevents infinite loops between code generation and file watching by
 * distinguishing tool-generated changes from user edits.
 * 
 * SOLUTION:
 * - Store hash of content before tool writes it
 * - Pause watching the file during the write operation
 * - Compare actual file hash with expected hash on file change events
 * - If hashes match = tool edit (ignore), if differ = user edit (process)
 * 
 * USAGE PATTERN:
 * ```typescript
 * // Before generating code
 * await tracker.onBeforeGenerate('/path/Button.tsx', generatedCode);
 * 
 * // Write the file
 * await fs.writeFile('/path/Button.tsx', generatedCode);
 * 
 * // After writing completes
 * await tracker.onAfterGenerate('/path/Button.tsx');
 * 
 * // When file watcher detects a change
 * const isUserEdit = tracker.isUserEdit('/path/Button.tsx', currentContent);
 * if (isUserEdit) {
 *   // Process user's changes
 * }
 * ```
 * 
 * TIMING CRITICAL:
 * - onBeforeGenerate() MUST be called before fs.writeFile()
 * - onAfterGenerate() MUST be called after fs.writeFile() completes
 * - Calling out of order will result in incorrect detection
 * 
 * @interface IFileChangeDetector
 */
export interface IFileChangeDetector {
  /**
   * Prepares the tracker for an upcoming code generation operation.
   * 
   * This method MUST be called BEFORE writing generated content to disk.
   * It stores the hash of the content we're about to write and pauses
   * file watching for this specific file to prevent detecting our own
   * write operation as a user edit.
   * 
   * TIMING CRITICAL:
   * Call immediately before fs.writeFile() in the same execution block.
   * Do not await any async operations between this call and the write.
   * 
   * WHAT IT DOES:
   * 1. Computes SHA-256 hash of the content
   * 2. Stores hash in internal map (key = filepath)
   * 3. Adds filepath to paused paths set
   * 4. Sets 5-second timeout for auto-resume (safety mechanism)
   * 
   * @param filepath - Absolute path to file that will be generated
   *                   Must be within the project directory
   * @param content - Exact content that will be written
   *                  Must match the content passed to fs.writeFile()
   * 
   * @returns Promise that resolves when tracking is set up
   * 
   * @throws {Error} If filepath is invalid or outside project
   * @throws {Error} If content is null/undefined
   * @throws {Error} If hash computation fails
   * 
   * @example
   * ```typescript
   * const code = generateReactComponent(schema);
   * await tracker.onBeforeGenerate('/project/src/Button.tsx', code);
   * await fs.writeFile('/project/src/Button.tsx', code); // Must match content
   * await tracker.onAfterGenerate('/project/src/Button.tsx');
   * ```
   * 
   * @performance O(n) where n = content length, typically <5ms for <1MB files
   * @sideEffects Modifies internal pause state and hash cache
   * @async
   */
  onBeforeGenerate(filepath: string, content: string): Promise<void>;

  /**
   * Resumes file watching after code generation completes.
   * 
   * This method MUST be called AFTER the file write operation completes.
   * It waits 100ms to allow the file system to settle, then resumes
   * watching the file for changes.
   * 
   * TIMING CRITICAL:
   * Call immediately after fs.writeFile() completes successfully.
   * 
   * WHY THE 100ms DELAY:
   * File systems (especially network drives) may take time to propagate
   * changes. The 100ms delay ensures the file system has settled before
   * we resume watching, preventing race conditions.
   * 
   * WHAT IT DOES:
   * 1. Waits 100ms (file system settle time)
   * 2. Removes filepath from paused paths set
   * 3. Clears the auto-resume timeout
   * 4. File watching is now active again for this file
   * 
   * FAILURE HANDLING:
   * If this method is never called (e.g., code generator crashes),
   * the 5-second timeout from onBeforeGenerate() will automatically
   * resume watching to prevent permanent pause.
   * 
   * @param filepath - Absolute path to file that was generated
   *                   Must match the path passed to onBeforeGenerate()
   * 
   * @returns Promise that resolves after pause is lifted
   * 
   * @throws {Error} If filepath is invalid
   * 
   * @example
   * ```typescript
   * try {
   *   await tracker.onBeforeGenerate(path, content);
   *   await fs.writeFile(path, content);
   *   await tracker.onAfterGenerate(path); // Always call even if write succeeds
   * } catch (error) {
   *   // Even on error, onAfterGenerate should be called
   *   // or timeout will handle it
   *   await tracker.onAfterGenerate(path);
   *   throw error;
   * }
   * ```
   * 
   * @performance O(1), typically <1ms plus 100ms delay
   * @sideEffects Modifies internal pause state, clears timeout
   * @async
   */
  onAfterGenerate(filepath: string): Promise<void>;

  /**
   * Determines if a file change was made by a user (not the tool).
   * 
   * This method is called by the file watcher when it detects a change.
   * It distinguishes between changes made by the tool (code generation)
   * and changes made by the user (manual edits).
   * 
   * DECISION FLOW:
   * 
   *   File Changed Event
   *          |
   *          v
   *   Is file paused? ──YES──> Return false (tool is writing, ignore)
   *          |
   *          NO
   *          v
   *   Compute hash of actual content
   *          |
   *          v
   *   Expected hash exists? ──NO──> Return true (first time seeing file)
   *          |
   *          YES
   *          v
   *   Hashes match? ──YES──> Return false (tool wrote what we expected)
   *          |
   *          NO
   *          v
   *   Return true (user made changes)
   * 
   * PERFORMANCE OPTIMIZATION:
   * Pause check happens BEFORE hash computation because:
   * - Pause check is O(1) Set lookup (fast)
   * - Hash computation is O(n) content processing (slower)
   * - Most generation events hit the pause check (fast path)
   * 
   * ERROR HANDLING:
   * On any error (hash computation fails, etc.), returns true (assumes user edit).
   * This is a fail-safe approach - better to process a non-change than miss a real edit.
   * 
   * @param filepath - Absolute path to file that changed
   * @param content - Current content of the file
   * 
   * @returns true if user made the edit, false if tool made it
   * 
   * @example
   * ```typescript
   * // In file watcher callback
   * watcher.on('change', async (filepath) => {
   *   const content = await fs.readFile(filepath, 'utf-8');
   *   const isUserEdit = tracker.isUserEdit(filepath, content);
   *   
   *   if (isUserEdit) {
   *     // User modified the file - parse and update manifest
   *     await bidirectionalSync.processFileChange(filepath, content);
   *   } else {
   *     // Tool wrote this file - ignore to prevent infinite loop
   *     console.log(`Ignoring tool-generated change: ${filepath}`);
   *   }
   * });
   * ```
   * 
   * @performance O(1) for paused files, O(n) for active files where n = content length
   * @sideEffects None - read-only operation
   */
  isUserEdit(filepath: string, content: string): boolean;
}

/**
 * Result type for operations that can fail.
 * 
 * Used for error handling in a type-safe manner without throwing exceptions.
 * Based on Rust's Result<T, E> pattern.
 * 
 * @example
 * ```typescript
 * function validatePath(path: string): Result<string, string> {
 *   if (!path.startsWith('/project/')) {
 *     return { success: false, error: 'Path must be within project' };
 *   }
 *   return { success: true, value: path };
 * }
 * 
 * const result = validatePath(filepath);
 * if (!result.success) {
 *   console.error(result.error);
 *   return;
 * }
 * // Use result.value
 * ```
 * 
 * @template T - Type of successful result value
 * @template E - Type of error (typically string or Error)
 */
export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

/**
 * Options for configuring the FileChangeTracker.
 * 
 * All options are optional and have sensible defaults.
 * These options exist for testing and future customization.
 * 
 * @interface FileChangeTrackerOptions
 */
export interface FileChangeTrackerOptions {
  /**
   * Duration to pause file watching after generation (milliseconds).
   * 
   * This delay allows the file system to settle before resuming watch.
   * Longer delays are safer but less responsive.
   * 
   * DEFAULT: 100ms
   * - Fast file systems (local SSD): 50ms sufficient
   * - Network drives (SMB/NFS): 100-200ms recommended
   * - Very slow drives: 500ms
   * 
   * @default 100
   */
  pauseDuration?: number;

  /**
   * Timeout for auto-resuming file watching if onAfterGenerate never called (milliseconds).
   * 
   * Safety mechanism to prevent orphaned pauses. If the code generator crashes
   * between onBeforeGenerate and onAfterGenerate, this timeout will automatically
   * resume watching to prevent permanent file ignoring.
   * 
   * DEFAULT: 5000ms (5 seconds)
   * - Must be longer than typical generation operation
   * - Should be short enough to not block user edits for long
   * 
   * @default 5000
   */
  autoResumeTimeout?: number;

  /**
   * Whether to log debug information to console.
   * 
   * Useful for development and troubleshooting.
   * Should be false in production.
   * 
   * @default false
   */
  debug?: boolean;
}

/**
 * Internal state maintained by FileChangeTracker.
 * 
 * This type documents the internal data structures for debugging
 * and testing purposes. Not part of the public API.
 * 
 * @internal
 */
export interface FileChangeTrackerState {
  /**
   * Map of file paths to their expected content hashes.
   * Hash is computed from content passed to onBeforeGenerate().
   * Used to detect if file content changed from what we generated.
   */
  generationHashes: Map<string, string>;

  /**
   * Set of file paths currently paused (being generated).
   * While paused, file change events are ignored for these files.
   * Enables concurrent operations on different files.
   */
  pausedPaths: Set<string>;

  /**
   * Map of file paths to their auto-resume timeout IDs.
   * Timeouts are set during onBeforeGenerate and cleared during onAfterGenerate.
   * If onAfterGenerate never called, timeout fires and resumes watching.
   */
  timeouts: Map<string, ReturnType<typeof setTimeout>>;
}
