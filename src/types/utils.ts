import { ObjectType } from "./objects";
/**
 * Prevent T from being inferred in generic function
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & ObjectType<T>;

export type Nullable<T> = T | null | undefined;
export type Unknown = {} | null | undefined;

export declare class Tagged<N extends string> { private _nominal_: N; }
export type Nominal<T, N extends string> = T & Tagged<N>;
