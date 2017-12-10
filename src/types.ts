// Conditionals
export type True = '1';
export type False = '0';
export type Bool = False | True;
export type If<Cond extends Bool, Then, Else> = [Else, Then][Cond];
export type Not<A extends Bool> = If<A, False, True>;
export type And<A extends Bool, B extends Bool> = If<A, If<B, True, False>, False>;
export type Or<A extends Bool, B extends Bool> = If<A, True, If<B, True, False>>;
export type Xor<A extends Bool, B extends Bool> = Or<And<A, Not<B>>, And<Not<A>, B>>;
export type Nand<A extends Bool, B extends Bool> = Not<And<A, B>>;

export type ReallyTrue<A extends Bool> = StringEqual<A, True>;

// Unions

export type UnionContains<T extends string, U extends string> = (Record<T, True> & Record<string, False>)[U];

// Prototypes

export type KnownProblemPrototypeKeys = 'toString' | 'toLocaleString' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'constructor' | 'valueOf';
export type ArrayPrototypeKeys = Keys<Array<any>>;
export type NumberPrototypeKeys = Keys<number>;
export type BooleanPrototypeKeys = Keys<false>;
export type StringPrototypeKeys = Keys<string>;
export type ObjectPrototypeKeys = Keys<Object>;
export type FunctionPrototypeKeys = Keys<Function>;

export type IsAny<T> = IsNever<HasKey<T, string>>;
export type IsArray<T> = ReallyTrue<HasKey<T, ArrayPrototypeKeys>>;
export type IsNumber<T> = ReallyTrue<HasKey<T, NumberPrototypeKeys>>;
export type IsString<T> = ReallyTrue<HasKey<T, StringPrototypeKeys>>;
export type IsFunction<T> =
    Xor<
        IsNever<Keys<T>>,
        ReallyTrue<HasKey<T, FunctionPrototypeKeys>>>;

// TODO: this doesn't quite cut it
export type IsStringFunction<T extends string> = And<IsString<T>, IsNever<T>>;
export type IsBoolean<T> =
    And<And<And<
        Not<IsStringFunction<Diff<Keys<T>, BooleanPrototypeKeys>>>, // filter out annoying prototype keys ie: 'toString' & () => boolean
        Not<IsNever<Keys<T>>>>, // Make sure isn't a function because function types have no prototype keys, making first check fail
        Not<HasKey<T, string>>>, // Make sure isn't any, by checking that all strings are in the prototype
        IsNever<Diff<Keys<T>, BooleanPrototypeKeys>>>;

export type IsObject<T> =
    And<And<And<And<
        Not<IsArray<T>>,
        Not<IsNumber<T>>>,
        Not<IsString<T>>>,
        Not<IsBoolean<T>>>,
        Not<IsFunction<T>>>;


// Numbers

export type IsZero<T extends number> = (Vector<False> & [True, False])[T];
export type IsOne<T extends number> = (Vector<False> & [False, True, False])[T];
export type NumberToString<N extends number> = Numbers[N];
export type Numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63'];
export type Next<T extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64][T];
export type Prev<T extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62][T];
export type Add<A extends number, B extends number> = { 1: A, 0: Add<Next<A>, Prev<B>> }[IsZero<B>];
export type Sub<A extends number, B extends number> = { 1: A, 0: Sub<Prev<A>, Prev<B>> }[IsZero<B>];
export type NumberEqual<A extends number, B extends number> = StringEqual<NumberToString<A>, NumberToString<B>>;

// Strings

/**
 * From https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
 */
export type Diff<T extends string, U extends string> = ({[K in T]: K} & Record<U, never> & Record<string, never>)[T];
export type DropString<T extends string, U extends T> = Diff<T, U>;
export type IsNever<S extends string> = UnionContains<UnionContains<S, S>, False>;

export type StringEqual<T extends string, U extends string> =
    And<
        IsNever<Diff<T, U>>,
        IsNever<Diff<U, T>>
    >;

// Tuples

export interface Vector<T> { readonly [x: number]: T; readonly length: number; }
export type Length<T extends Vector<any>> = T['length'];

export type UnionizeTuple<T extends Vector<any>> = T[number];

// Objects

export type UnionizeProperties<T extends object> = T[Keys<T>];
export type Omit<T extends object, K extends Keys<T>> = Pick<T, Diff<Keys<T>, K>>;

export type DeepPartial<T extends object> = Partial<{
    [k in Keys<T>]: DeepPartial<T[k]>
}>;

export type ObjectType<T extends object> = {
    [k in Keys<T>]: T[k];
};

export type CombineObjects<T extends object, U extends object> = ObjectType<T & U>;

export type Keys<T> = keyof T;
export type SharedKeys<T, U> = Keys<T> & Keys<U>;
export type AllKeys<T, U> = Keys<T> | Keys<U>;
export type DiffKeys<T, U> = Diff<Keys<T>, Keys<U>>;
export type HasKey<T, U extends string> = UnionContains<Keys<T>, U>;

export type Intersect<T extends object, U extends Partial<T>> = Omit<U, DiffKeys<U, T>>;

export type Merge<T extends object, U extends object> = CombineObjects<Omit<T, SharedKeys<T, U>>, U>;
export type Overwrite<T extends object, U extends object> = Merge<T, Intersect<T, U>>;
export type GetKey<T extends object, K extends string> = (Record<string, never> & T)[K];
