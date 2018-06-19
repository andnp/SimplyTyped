# SimplyTyped

[![Greenkeeper badge](https://badges.greenkeeper.io/andnp/SimplyTyped.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/andnp/SimplyTyped.svg?branch=NumberPerformance)](https://travis-ci.org/andnp/SimplyTyped)

Yet another typing library.
This differs by aiming to be less experimental than others, driven by industry use cases.

Many of the exposed types are a very thin layer above built in functionality.
The goal is to provide all of the building blocks necessary to make concise, yet complex types.

```
npm install --save-dev simplytyped
```

## Table of Contents

**[Objects](#objects)**

[AllKeys](#allkeys) - [AllRequired](#allrequired) - [CombineObjects](#combineobjects) - [DeepPartial](#deeppartial) - [DeepReadonly](#deepreadonly) - [DiffKeys](#diffkeys) - [GetKey](#getkey) - [HasKey](#haskey) - [Intersect](#intersect) - [Keys](#keys) - [KeysByType](#keysbytype) - [Merge](#merge) - [ObjectType](#objecttype) - [Omit](#omit) - [Optional](#optional) - [Overwrite](#overwrite) - [PlainObject](#plainobject) - [PureKeys](#purekeys) - [Required](#required) - [SharedKeys](#sharedkeys) - [StringKeys](#stringkeys) - [TaggedObject](#taggedobject) - [UnionizeProperties](#unionizeproperties)

**[Utils](#utils)**

[NoInfer](#noinfer) - [Nominal](#nominal) - [Nullable](#nullable) - [Unknown](#unknown)

**[Functions](#functions)**

[AnyFunc](#anyfunc) - [ConstructorFunction](#constructorfunction) - [OverwriteReturn](#overwritereturn) - [Predicate](#predicate)

**[Strings](#strings)**

[Diff](#diff) - [DropString](#dropstring) - [StringEqual](#stringequal) - [UnionContains](#unioncontains)

**[Tuples](#tuples)**

[IntersectTuple](#intersecttuple) - [Length](#length) - [UnionizeTuple](#unionizetuple)

**[Numbers](#numbers)**

[Add](#add) - [IsOne](#isone) - [IsZero](#iszero) - [Next](#next) - [NumberEqual](#numberequal) - [Numbers](#numbers) - [NumberToString](#numbertostring) - [Prev](#prev) - [Sub](#sub)

**[Conditionals](#conditionals)**

[And](#and) - [If](#if) - [Nand](#nand) - [Not](#not) - [Or](#or) - [Xor](#xor)

**[Predicates](#predicates)**

[IsAny](#isany) - [IsArray](#isarray) - [IsBoolean](#isboolean) - [IsFunction](#isfunction) - [IsNever](#isnever) - [IsNil](#isnil) - [IsNull](#isnull) - [IsNumber](#isnumber) - [IsObject](#isobject) - [IsString](#isstring) - [IsStringFunction](#isstringfunction) - [IsType](#istype) - [IsUndefined](#isundefined)

**[Runtime](#runtime)**

[isKeyOf](#iskeyof) - [objectKeys](#objectkeys) - [Readonly](#readonly) - [taggedObject](#taggedobject)

## Objects

### AllKeys
Gets all keys between two objects.
```ts
test('Can get all keys between objects', t => {
    type a = { w: number, x: string };
    type b = { x: number, z: boolean };

    type got = AllKeys<a, b>;
    type expected = 'w' | 'x' | 'z';

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### AllRequired
Marks all keys as required.
```ts
test('Can make all fields of options object required (not optional and not nullable)', t => {
    type x = { a?: string, b: number | undefined };
    type got = AllRequired<x>;
    type expected = { a: string, b: number };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### CombineObjects
Takes two objects and returns their intersection.
This combines all keys and uses `ObjectType` to "clean up" the resultant object.
Useful for making extremely complex types look nice in VSCode.
```ts
test('Can combine two objects (without pesky & in vscode)', t => {
    type a = { x: number, y: 'hi' };
    type b = { z: number, y: 'there' };

    type got = CombineObjects<a, b>;
    type expected = {
        x: number,
        y: 'hi' & 'there',
        z: number
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### DeepPartial
Uses `Partial` to make every parameter of an object optional (`| undefined`).
Iterates through arrays of objects and nested objects.
```ts
test('Can get a deep partial object', t => {
    type a = {
        b: {
            c: number
        },
        d: string
    };

    type got = DeepPartial<a>;
    type expected = {
        b?: {
            c?: number
        },
        d?: string
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Can get a deep partial object with arrays', t => {
    type a = {
        b: Array<{
            c: number,
        }>,
    };

    type got = DeepPartial<a>;
    type expected = {
        b?: Array<{
            c?: number,
        }>,
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### DeepReadonly
Uses `Readonly` to make every parameter of an object - and its sub-objects recursively - readonly.
```ts
test('Can make nested object readonly', t => {
    type x = { x: { a: 1, b: 'hi' }, y: 'hey' };

    type expected = { readonly x: Readonly<{ a: 1, b: 'hi' }>, readonly y: 'hey' };
    type got = DeepReadonly<x>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Can make nested object with arrays readonly', t => {
    type x = { x: [{ a: 1, b: 'hi' }], y: 'hey' };

    type expected = { readonly x: Array<Readonly<{ a: 1, b: 'hi' }>>, readonly y: 'hey' };
    type got = DeepReadonly<x>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### DiffKeys
Gets all of the keys that are different between two objects.
This is a set difference between `Keys<T>` and `Keys<U>`.
Note that calling this with arguments reversed will have different results.
```ts
test('Can get all keys that are different between objects', t => {
    type a = { x: number, y: string };
    type b = { y: string, z: number };

    type gotA = DiffKeys<a, b>;
    type gotB = DiffKeys<b, a>;

    assert<gotA, 'x'>(t);
    assert<gotB, 'z'>(t);
});

```

### GetKey
Gets the value of specified property on any object without compile time error (`Property 'b' does not exist on type '{ a: string; }'.`) and the like.
Returns `never` if the key is not on the object.
It helps to use `If<HasKey...` to handle validity of the object first.
```ts
test('Can safely get the value at a certain key if it exists', t => {
    type obj = { x: number, y: string };
    type expected = number;
    type got = GetKey<obj, 'x'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Will get `never` if key does not exist', t => {
    type obj = { x: number, y: string };
    type expected = never;
    type got = GetKey<obj, 'z'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### HasKey
Returns `True` if a key, `K`, is present in a type, `T`, else `False`.


### Intersect
Returns only the shared properties between two objects.
All shared properties must be the same type.
```ts
test('Can get an object with only shared properties', t => {
    type a = { x: number, y: string };
    type b = { y: string, z: string };

    type expected = { y: string };
    type got = Intersect<a, b>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Keys
No different than `keyof`, but can look a bit nicer when nesting many types deep.
```ts
test('Can get keys from object', t => {
    type obj = { x: number, y: string, z: boolean };
    type expected = 'x' | 'y' | 'z';
    type got = Keys<obj>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### KeysByType
Gets all keys that point to a given type.
```ts
test('Can filter object keys by right side type', t => {
    type obj = {
        a: 1,
        b: 2,
        c: 3,
    };

    type expected = 'a' | 'b';
    type got = KeysByType<obj, 1 | 2>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Merge
Much like `_.merge` in javascript, this returns an object with all keys present between both objects, but conflicts resolved by rightmost object.
```ts
test('Can merge two objects, resolving matching keys by rightmost object', t => {
    type a = { x: number, y: string };
    type b = { y: number, z: string };

    type got = Merge<a, b>;
    type expected = { x: number, y: number, z: string };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Can merge an object containing all strings as keys', t => {
    type a = {
        y: string;
        [s: string]: string;
    };
    type b = { x: number, y: number };

    type got = Merge<a, b>;
    type expected = { x: number, y: number } & Record<string, string>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### ObjectType
Takes any type and makes it an object type.
Useful when combined with `&` intersection types.
```ts
test('Can turn an object into another object', t => {
    type obj = { x: number, y: string };
    type expected = obj;
    type got = ObjectType<obj>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Omit
Gives back an object with listed keys removed.
This is the opposite of `Pick`.
```ts
test('Can omit keys from an object', t => {
    type a = { x: number, y: string, z: boolean };

    type got = Omit<a, 'x' | 'y'>;
    type expected = { z: boolean };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Optional
Mark specific keys, `K`, of `T` as optional (think `Partial`).
```ts
test('Can make properties optional', t => {
    type x = { x: number, y: string, z: 'hello there' };

    type expected = { x?: number, y?: string, z: 'hello there' };
    type got = Optional<x, 'x' | 'y'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Overwrite
Can change the types of properties on an object.
This is similar to `Merge`, except that it will not add previously non-existent properties to the object.
```ts
test('Can overwrite properties on an object', t => {
    type a = { x: number, y: string, z: 'hello there' };

    type expected = { x: number, y: string, z: 'hello' | 'there' };
    type got1 = Overwrite<a, { z: 'hello' | 'there' }>;
    type got2 = Overwrite<a, { z: 'hello' | 'there', w: number }>;

    assert<got1, expected>(t);
    assert<expected, got1>(t);
    assert<got2, expected>(t);
    assert<expected, got2>(t);
});

```

### PlainObject
An object with string keys and values of type `any`.


### PureKeys
When an object has optional or readonly keys, that information is contained within the key.
When using optional/readonly keys in another object, they will retain optional/readonly status.
`PureKeys` will remove the optional/readonly status modifiers from keys.


### Required
Mark specific keys, `K`, of `T` as required.
```ts
test('Can make certain fields of options object required', t => {
    type x = { a?: string, b: number | undefined };
    type got1 = Required<x, 'a'>;
    type got2 = Required<x, 'b'>;
    type got3 = Required<x, 'a' | 'b'>;

    type expected1 = { a: string, b: number | undefined };
    type expected2 = { a?: string, b: number };
    type expected3 = { a: string, b: number };

    assert<got1, expected1>(t);
    assert<got2, expected2>(t);
    assert<got3, expected3>(t);
});

```

### SharedKeys
Gets all of the keys that are shared between two objects.
```ts
test('Can get keys that are same between objects', t => {
    type a = { x: number, y: string };
    type b = { x: string, y: string, z: boolean };

    type got = SharedKeys<a, b>;
    type expected = 'x' | 'y';

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### StringKeys
Typescript 2.9 introduced `number | symbol` as possible results from `keyof any`.
For backwards compatibility with objects containing only `string` keys, this will
exclude any `number | symbol` keys from `keyof`.


### TaggedObject
For discriminated unions of objects, it is important to have a single "tag" property.
Creates an object with each entry being tagged by the key defining that entry.


### UnionizeProperties
Get a union of the properties of an object.
```ts
test('Can get a union of all values in an object', t => {
    type a = { x: 'hi', y: 'there', z: 'friend' };

    type got = UnionizeProperties<a>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

## Utils

### NoInfer
Prevent `T` from being inferred in generic function
```ts
test('Will not infer based on second argument', t => {
    function doStuff<T>(x: T, y: NoInfer<T | 'there'>): T { return x; }

    const hi = 'hi' as 'hi' | number;
    const there = 'there';
    const x = doStuff(hi, there);

    assert<typeof x, 'hi'>(t);
    assert<typeof x, number>(t);
});

```

### Nominal
Constructs a nominal type of type `T`.
Useful to prevent any value of type `T` from being used or modified in places it shouldn't (think `id`s).
```ts
test('Can make a new nominal type', t => {
    type Id = Nominal<string, 'id'>;

    // TODO: improve once negative testing is in place
    assert<Id, Nominal<string, 'id'>>(t);
});

```

### Nullable
Mark a type as nullable (`null | undefined`).
```ts
test('Will make a type nullable (null | undefined)', t => {
    type got = Nullable<string>;
    type expected = string | null | undefined;

    assert<got, expected>(t);
});

test('Will make a type not nullable', t => {
    type got = NonNullable<Nullable<string>>;

    assert<got, string>(t);
});

```

### Unknown
A constant type that mimics an unknowable type.


## Functions

### AnyFunc
Concisely and cleanly define an arbitrary function.
Useful when designing many api's that don't care what function they take in, they just need to know what it returns.
```ts
test('Can define the type of a function that takes any arguments', t => {
    type got = AnyFunc;
    type got2 = AnyFunc<number>; // takes anything, returns a number

    type expected = (...args: any[]) => any;
    type expected2 = (...args: any[]) => number;

    assert<got, expected>(t);
    assert<got2, expected2>(t);
});

```

### ConstructorFunction
This represents the constructor for a particular object.
```ts
test('Can build a constructor type for a type', t => {
    type Constructor = ConstructorFunction<{ x: string, y: number }>;
    class Thing { x: string = ''; y: number = 22; }

    assert<Constructor, typeof Thing>(t);
});

```

### OverwriteReturn
Modifies the return value of a function of up to 7 parameters.
```ts
test('Can change return type of a function', t => {
    type f = (x: 'hi', y: 'there', z: 22) => number;

    type got = OverwriteReturn<f, string>;
    type expected = (x: 'hi', y: 'there', z: 22) => string;

    assert<got, expected>(t);
    assert<expected, got>(t);
});


```

### Predicate
This is a function that takes some args and returns a boolean
```ts
test('Can build a predicate function with single known argument type', t => {
    type PredFunc = Predicate<string>;
    type expected = (arg: string) => boolean;

    assert<PredFunc, expected>(t);
});

test('Can build a predicate function with unknown argument types', t => {
    type PredFunc = Predicate;
    type works = (arg1: string, arg2: number) => boolean;
    type expected = (...args: any[]) => boolean;

    assert<PredFunc, works>(t);
    assert<PredFunc, expected>(t);
});

```

## Strings

### Diff

```ts
test('Can get difference between unions of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hi' | 'my' | 'friend';

    type gotA = Diff<a, b>;
    type gotB = Diff<b, a>;

    assert<gotA, 'there'>(t);
    assert<gotB, 'my' | 'friend'>(t);
});

```

### DropString

```ts
test('Can remove a string from a union of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hey' | 'there' | never;

    assert<DropString<a, 'hi'>, 'there'>(t);
    assert<DropString<b, 'hey' | 'there'>, never>(t);
    assert<DropString<a, 'hi' | 'there'>, never>(t);
});

```

### StringEqual

```ts
test('Can check that two unions of strings are equal', t => {
    type a = 'hi' | 'there';
    type b = 'there' | 'hi';
    type c = 'hi' | 'there' | 'friend';

    assert<StringEqual<a, b>, True>(t);
    assert<StringEqual<b, a>, True>(t);
    assert<StringEqual<b, c>, False>(t);
});

```

### UnionContains



## Tuples

### IntersectTuple
Gives an intersection of all values contained in a tuple.
```ts
test('Can get the intersection of tuple values', t => {
    type t = [{a: 'hi'}, {b: 'there'}, {c: 'friend'}];

    type got = IntersectTuple<t>;
    type expected = {a: 'hi'} & {b: 'there'} & {c: 'friend'};

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

### Length

```ts
test('Can get the length of a tuple', t => {
    type t = [1, 2, 3, 4];
    type x = ['hello', 'world'];

    type gotT = Length<t>;
    type gotX = Length<x>;

    assert<gotX, 2>(t);
    assert<gotT, 4>(t);
});

```

### UnionizeTuple
Gives a union of all values contained in a tuple.
```ts
test('Can get a union of all values in tuple', t => {
    type t = ['hi', 'there', 'friend'];

    type got = UnionizeTuple<t>;
    type expected = 'hi' | 'there' | 'friend';

    assert<got, expected>(t);
    assert<expected, got>(t);
});

```

## Numbers

### Add
Adds two numbers together.
```ts
test('Can add two numbers', t => {
    type fifty = Add<12, 38>;
    assert<fifty, 50>(t);
});

```

### IsOne
Returns true if the number is equal to one.
```ts
test('Can check if a number is one', t => {
    type notOne = IsOne<0>;
    type one = IsOne<1>;
    assert<notOne, False>(t);
    assert<one, True>(t);
});

```

### IsZero
Returns true if the number is equal to zero.
```ts
test('Can check if a number is zero', t => {
    type notZero = IsZero<1>;
    type zero = IsZero<0>;
    assert<notZero, False>(t);
    assert<zero, True>(t);
});

```

### Next
Returns the number + 1.


### NumberEqual
Returns `True` if the numbers are equivalent
```ts
test('Can check if two numbers are equal', t => {
    type notEqual = NumberEqual<22, 23>;
    type equal = NumberEqual<12, 12>;
    assert<notEqual, False>(t);
    assert<equal, True>(t);
});

```

### Numbers



### NumberToString
Returns the string type for a given number
```ts
test('Can get a number as a string', t => {
    type str = NumberToString<22>;
    assert<str, '22'>(t);
});

```

### Prev
Returns the number - 1.


### Sub
Subtracts the second from the first.
```ts
test('Can subtract two numbers', t => {
    type ten = Sub<22, 12>;
    assert<ten, 10>(t);
});

```

## Conditionals

### And

```ts
test('Conditions can be based on AND', t => {
    type conditional<C extends Bool, D extends Bool> = If<And<C, D>, number, string>;
    type gotFF = conditional<False, False>;
    type gotFT = conditional<False, True>;
    type gotTF = conditional<True, False>;
    type gotTT = conditional<True, True>;

    assert<gotFF, string>(t);
    assert<gotFT, string>(t);
    assert<gotTF, string>(t);
    assert<gotTT, number>(t);
});

```

### If

```ts
test('Can assign type conditionally', t => {
    type conditional<C extends Bool> = If<C, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, string>(t);
    assert<gotT, number>(t);
});

```

### Nand

```ts
test('Conditions can be based on NAND', t => {
    assert<Nand<True, True>,   False>(t);
    assert<Nand<False, True>,  True>(t);
    assert<Nand<True, False>,  True>(t);
    assert<Nand<False, False>, True>(t);
});

```

### Not

```ts
test('Conditional logic can be inversed with NOT', t => {
    type conditional<C extends Bool> = If<Not<C>, number, string>;
    type gotF = conditional<False>;
    type gotT = conditional<True>;

    assert<gotF, number>(t);
    assert<gotT, string>(t);
});

```

### Or

```ts
test('Conditions can be based on OR', t => {
    type conditional<C extends Bool, D extends Bool> = If<Or<C, D>, number, string>;
    type gotFF = conditional<False, False>;
    type gotFT = conditional<False, True>;
    type gotTF = conditional<True, False>;
    type gotTT = conditional<True, True>;

    assert<gotFF, string>(t);
    assert<gotFT, number>(t);
    assert<gotTF, number>(t);
    assert<gotTT, number>(t);
});

```

### Xor

```ts
test('Conditions can be based on XOR', t => {
    assert<Xor<True, True>,   False>(t);
    assert<Xor<False, True>,  True>(t);
    assert<Xor<True, False>,  True>(t);
    assert<Xor<False, False>, False>(t);
});

```

## Predicates

### IsAny



### IsArray



### IsBoolean



### IsFunction



### IsNever



### IsNil



### IsNull



### IsNumber



### IsObject



### IsString



### IsStringFunction



### IsType



### IsUndefined



## Runtime

### isKeyOf
Type guard for any key, `k`.
Marks `k` as a key of `T` if `k` is in `obj`.
```ts
test('Can check if an object contains a key', t => {
    const o = { a: 'hi', b: 22 };
    const key1: string = 'a';

    if (isKeyOf(o, key1)) {
        assert<typeof key1, 'a' | 'b'>(t);
        t.pass();
    } else {
        assert<typeof key1, string>(t);
        t.fail();
    }
});

```

### objectKeys
Same as `Object.keys` except that the returned type is an array of keys of the object.
Note that for the same reason that `Object.keys` does not do this natively, this method _is not safe_ for objects on the perimeter of your code (user input, read in files, network requests etc.).
```ts
test('Can get keys of an object', t => {
    const o = { a: 'hi', b: 22 };
    const keys = objectKeys(o);

    type K = typeof keys;
    type expected = Array<'a' | 'b'>;
    assert<K, expected>(t);
    assert<expected, K>(t);

    t.deepEqual(keys, ['a', 'b']);
});

```

### Readonly
Useful for marking object literals as readonly while still keeping type inference:
`const obj = Readonly({ a: 22, b: 'yellow' });`


### taggedObject
Useful for tagged unions of objects (imagine redux reducers) this tags every sub-object with the key pointing to that sub-object.
```ts
test('Can generate a tagged object', t => {
    const obj = {
        a: { merp: 'hi' },
        b: { merp: 'there' },
        c: { merp: 'friend' },
    };

    const expected = {
        a: { name: 'a' as 'a', merp: 'hi' },
        b: { name: 'b' as 'b', merp: 'there' },
        c: { name: 'c' as 'c', merp: 'friend' },
    };

    const got = taggedObject(obj, 'name');

    t.deepEqual(got, expected);
    assert<typeof got, typeof expected>(t);
    assert<typeof expected, typeof got>(t);

});

```

