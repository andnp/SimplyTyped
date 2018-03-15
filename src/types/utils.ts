import { ObjectType } from "./objects";
/**
 * Prevent T from being inferred in generic function
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & ObjectType<T>;

export type Nullable<T> = T | null | undefined;
export type NotNullable<T> = T & {};
