# SimplyTyped

[![Build Status](https://travis-ci.org/andnp/SimplyTyped.svg?branch=NumberPerformance)](https://travis-ci.org/andnp/SimplyTyped)

Yet another typing library.
This differs by aiming to be less experimental than others, driven by industry use cases.

Many of the exposed types are a very thin layer above built in functionality.
The goal is to provide all of the building blocks necessary to make concise, yet complex types.

Additionally packaged with this lib is a JSON-schema validator that will act as a type-guard for appropriately typed object.
Using this will mean run-time checking of user/network/external data, with compile time checking of logic flow.
The primary purpose of packaging the JSON-schema validator is as an example of complexity of types this library is able to specify.
In particular, this shows the library's solution to the conditional mapped types problem without overloading the global namespace.

```
npm install --save-dev simplytyped
```

**[Conditionals](#conditionals)**

[If](#if) - [And](#and) - [Or](#or) - [Not](#not) - [Xor](#xor) - [Nand](#nand)

**[Predicates](#predicates)**

[IsAny](#isany) - [IsArray](#isarray) - [IsBoolean](#isboolean) - [IsFunction](#isfunction) - [IsNever](#isnever) - [IsNumber](#isnumber) - [IsObject](#isobject) - [IsType](#istype)

**[Objects](#objects)**

[Keys](#keys) - [ObjectType](#objecttype) - [CombineObjects](#combineobjects) - [Intersect](#intersect) - [SharedKeys](#sharedkeys) - [DiffKeys](#diffkeys) - [AllKeys](#allkeys) - [Omit](#omit) - [Merge](#merge) - [Overwrite](#overwrite) - [DeepPartial](#deeppartial) - [DeepReadonly](#deepreadonly) - [Optional](#optional) - [GetKey](#getkey) - [AllRequired](#allrequired) - [Required](#required) - [TaggedObject](#taggedobject)

**[Tuples](#tuples)**

[Tuple](#tuple) - [UnionizeTuple](#unionizetuple) - [Length](#length)

**[Strings](#strings)**

[Diff](#diff) - [StringEqual](#stringequal) - [DropString](#dropstring)

**[Numbers](#numbers)**

[IsZero](#iszero) - [IsOne](#isone) - [NumberToString](#numbertostring) - [Next](#next) - [Prev](#prev) - [Add](#add) - [Sub](#sub) - [NumberEqual](#numberequal)

**[Functions](#functions)**

[Predicate](#predicate) - [ConstructorFunction](#constructorfunction) - [AnyFunc](#anyfunc) - [Readonly](#readonly) - [isKeyOf](#isKeyOf) - [objectKeys](#objectkeys)

**[Utils](#utils)**

[Nullable](#nullable) - [NotNullable](#notnullable) - [NoInfer](#noinfer) - [Unknown](#unknown) - [Nominal](#nominal)

**[Schema Validation](#schema-validation)**

## Conditionals

Some (somewhat common) implementations of conditional type logic

### If
```ts
type x = If<True, string, number> // => string
type y = If<False, string, number> // => number
```

### And
```ts
type x = If<And<True, True>, string, number> // => string
type y = If<And<True, False>, string, number> // => number
...
```

### Or
```ts
type x = If<Or<True, False>, string, number> // => string
type y = If<Or<False, False>, string, number> // => number
...
```

### Not
```ts
type x = Not<True> // => False
type y = Not<False> // => True
```

### Xor
```ts
type x = Xor<True, False> // => True
type y = Xor<True, True> // => False
...
```

### Nand
```ts
type x = Nand<True, True> // => False
type y = Nand<False, True> // => True
```

## Predicates

### IsAny
```ts
type x = IsAny<any> // => True
type y = IsAny<'hey'> // => False
```

### IsArray
```ts
type x = IsArray<any[]> // => True
type y = IsArray<number> // => False
```

### IsBoolean
```ts
type x = IsBoolean<false> // => True
type y = IsBoolean<3> // => False
```

### IsFunction
```ts
type x = IsFunction<(() => string)> // => True
type y = IsFunction<'not a function'> // => False
```

### IsNever
Returns true if type is `never`, otherwise returns false.
```ts
type x = IsNever<'hi'> // => False
type y = IsNever<never> // => True
```

### IsNumber
```ts
type x = IsNumber<3> // => True
type y = IsNumber<false> // => False
```

### IsObject
```ts
type x = IsObject<{a: number, b: string}> // => True
type y = IsObject<string> // => False
```

### IsType
Given a base type and a value, check to see if value matches the base type.
Useful for checking if something is an instance of a class.
```ts
class Thing { x: string };
type x = IsType<Thing, { x: string }> // => True
type y = IsType<Thing, { y: number }> // => False
```

## Objects

```ts
type obj1 = { w: string, x: string, y: number }
type obj2 = { y: string, z: number }
```

### Keys
No different than `keyof`, but can look a bit nicer when nesting many types deep
```ts
type x = keyof obj1 // => 'w' | 'x' | 'y'
type y = Keys<obj1> // => 'w' | 'x' | 'y'
```

### ObjectType
On its own, not that interesting.
Takes an object and makes it an object type.
Is useful when combined with `&` intersection types (as seen next).
```ts
type x = ObjectType<obj1> // => { w: string, x: string, y: number }
```

### CombineObjects
Takes the intersection between two objects, and flattens them.
This can make extremely complex types look much nicer.
```ts
type x = obj1 & obj2 // => { w: string, x: string, y: number } & { y: string, z: number }
type y = CombineObjects<obj1, obj2> // => { w: string, x: string, y: string & number, z: number }
```

### Intersect
Returns only the shared properties between two objects.
All shared properties must be the same type.
```ts
type x = Intersect<obj1, { x: string }> // => { x: string }
```

### SharedKeys
Gets all of the keys that are shared between two objects (as in keys in common).
```ts
type x = SharedKeys<obj1, obj2> // => 'y'
```

### DiffKeys
Gets all of the keys that are different from obj1 to obj2.
```ts
type x = DiffKeys<obj1, obj2> // => 'w' | 'x'
type y = DiffKeys<obj2, obj1> // => 'z'
```

### AllKeys
Gets all keys between two objects.
```ts
type x = AllKeys<obj1, obj2> // => 'w' | 'x' | 'y' | 'z'
```

### Omit
Gives back an object with listed keys removed.
```ts
type x = Omit<obj1, 'w' | 'x'> // => { y: number }
```

### Merge
Much like `_.merge` in javascript, this returns an object with all keys present between both objects, but conflicts resolved by rightmost object.
```ts
type x = Merge<obj1, obj2> // => { w: string, x: string, y: string, z: number }
```

### Overwrite
Can change the types of properties on an object.
This is similar to `Merge`, except that it will not add previously non-existent properties to the object.
```ts
type a = Overwrite<obj1, obj2> // => { w: string, x: string, y: string }
type b = Overwrite<obj2, obj1> // => { y: number, z: number }
```

### DeepPartial
Uses `Partial` to make every parameter of an object optional (`| undefined`).
```ts
type x = DeepPartial<obj1> // => { w?: string, x?: string, y?: number }
```

### DeepReadonly
Uses `Readonly` to make every parameter of an object readonly
```ts
type x = DeepReadonly<obj1> // => { w: readonly string, x: readonly string, y: readonly number }
```

### Optional
Makes certain properties on an object optional.
```ts
type x = Optional<obj1, 'w' | 'x'> // => { w?: string, x?: string, y: number }
```

### GetKey
Gets the value of specified property on any object without compile time error (`Property 'b' does not exist on type '{ a: string; }'.`) and the like.
Returns `never` if the key is not on the object.
I suggest using `If<HasKey...` first to handle validity of the object first.
```ts
type x = GetKey<{ a: string }, 'a'> // => string
type y = GetKey<{ a: string }, 'b'> // => never
```

### ConstructorFor
Builds the type of a constructor function for a particular object.
```ts
type c = ConstructorFor<obj1> // => new (...args: any[]) => { w: string, x: string, z: number }
```

### InstanceOf
Reverse of [ConstructorFor](#constructorfor).
This takes a constructor function and gives back the instance of that object.
```ts
type c = ConstructorFor<obj1>
type o = InstanceOf<c> // => { w: string, x: string, z: number }
```

### AllRequired
Makes all fields of an object "required".
This means not Nullable and not optional.
```ts
type x = { a?: string, b: number | undefined };
type o = AllRequired<x>; // => { a: string, b: number }
```

### Required
Makes certain fields of an object "required"
```ts
type x = { a?: string, b: number | undefined };
type o = Required<x, 'a'>; // => { a: string, b: number | undefined }
```

### TaggedObject
Creates an object with each entry being tagged by the key defining that entry.
```ts
const obj = {
    a: { merp: 'hi' },
    b: { merp: 'there' },
    c: { merp: 'friend' },
};

const got = taggedObject(obj, 'name');
/*
got = {
    a: { name: 'a', merp: 'hi' },
    b: { name: 'b', merp: 'there' },
    c: { name: 'c', merp: 'friend' },
};
*/
```

## Utils
A few utility functions that generically work in any context, with any type.

### Nullable
Makes a type nullable (null | undefined).
```ts
type x = Nullable<string>; // => string | null | undefined
```

### NotNullable
Takes a nullable type and removes the option for null | undefined;
```ts
type x = NotNullable<string | undefined>; // => string
type y = NotNullable<Nullable<string>>; // => string
```

### NoInfer
Prevents typescript from being able to infer a generic type.
Useful when trying to get a function to infer based on one argument of a function, but not another.
```ts
function doStuff<T>(x: T, y: NoInfer<T>): T { return x; }
function inferAll<T>(x: T, y: T): T { return x; }
doStuff('hi', 'there') // => compile error
inferAll('hi', 'there') // => typeof T === 'string'
```

### Unknown
A type that has no properties and cannot be passed into functions.
This is particularly useful on the boundaries of an app where you may not know the type of a variable.
For instance `JSON.parse` could return an `Unknown` and would require validation and / or a type assertion to make it a useful type.
```ts
declare let x: Unknown;
x = 'hi'; // valid operation
function doStuff(a: number) {}
doStuff(x); // invalid operation
x.thing // invalid operation
x() // invalid operation
```

### Nominal
This creates a type that, while it shares all of the properties with its parent type, cannot be set to another type without containing the same tag.
This is useful in the case where you have a string that is an id, but you don't want to be able to set just any string to this id; only a string tagged as being an id.
```ts
type Id = Nominal<string, 'id'>; // => string
declare let x: Id;
x = 'hi'; // invalid operation;
x = 'hi' as Nominal<string, 'id'>; // valid operation
x = 'hi' as Id; // valid operation
```

## Tuples
A tuple can be defined in two ways: `[number, string]` which as of Typescript 2.7 has an enforced length type parameter: `[number, string]['length'] === 2` or using this library's `Tuple<any>` which can be extended with any length of tuple: `function doStuff<T extends Tuple<any>>(x: T) {}`.

### Tuple
```ts
function doStuff<T extends Tuple<any>>(x: T) {}

doStuff(['hi', 'there']); // => doStuff(x: ['hi', 'there']): void
```

### UnionizeTuple
Returns elements within a tuple as a union.
```ts
type x = UnionizeTuple<[number, string]> // => number | string
```

### Length
Gets the length of either a built-in tuple, or a Vector.
This will only work after Typescript 2.7 is released.
```ts
type x = Length<['hey', 'there']> // => 2
```

## Strings

### Diff
Get the differences between two unions of strings.
```ts
type x = Diff<'hi' | 'there', 'hi' | 'friend'> // => 'there'
```

### StringEqual
Returns true if all elements in two unions of strings are equal.
```ts
type x = StringEqual<'hi' | 'there', 'hi'> // => False
type y = StringEqual<'hi' | 'there', 'there' | 'hi'> // => True
```

### DropString
Can remove a string from a union of strings
```ts
type x = DropString<'hi' | 'there', 'hi'> // => 'there'
```

## Numbers

Supports numbers from [0, 63]. More slows down the compiler to a crawl right now.

### IsZero
Returns true if the number is equal to zero.
```ts
type x = IsZero<1> // => False
type y = IsZero<0> // => True
```

### IsOne
Returns true if the number is equal to one.
```ts
type x = IsOne<0> // => False
type y = IsOne<1> // => True
```

### NumberToString
Returns the string type for a given number
```ts
type x = NumberToString<0> // => '0'
type y = NumberToString<1> // => '1'
```

### Next
Returns the number + 1.
```ts
type x = Next<0> // => 1
type y = Next<22> // => 23
```

### Prev
Returns the number - 1.
```ts
type x = Prev<0> // => -1
type y = Prev<23> // => 22
```

### Add
Adds two numbers together.
```ts
type x = Add<22, 8> // => 30
```

### Sub
Subtracts the second from the first.
```ts
type x = Sub<22, 8> // => 14
```

### NumberEqual
Returns `True` if the numbers are equivalent
```ts
type x = NumberEqual<0, 0> // => True
type y = NumberEqual<22, 21> // => False
```

## Functions

### Predicate
This is a function that takes some args and returns a boolean
```ts
type x = Predicate // => (...args: any[]) => boolean
const isThing: Predicate = (x: Thing) => x instanceof Thing;
```

### ConstructorFunction
This represents the constructor for a particular object.
```ts
class Thing { constructor(public x: string) {}}
type x = ConstructorFunction<Thing>
declare const construct: x;
const y = new construct(); // => y instanceof Thing
```

### AnyFunc
Concisely and cleanly define an arbitrary function.
Useful when designing many api's that don't care what function they take in, they just need to know what it returns.
```ts
type got = AnyFunc; // => (...args: any[]) => any;
type got2 = AnyFunc<number>; // => (...args: any[]) => number;
```

### Readonly
This takes a runtime object and makes its properties readonly.
Useful for declare object literals, but using inferred types.
```ts
const config = Readonly({
    url: 'https://example.com',
    password: 'immasecurepassword',
}); // => { url: readonly string, password: readonly string }
```

### isKeyOf
Type guard returning true if `k` is a key in `obj`.
```ts
const obj = { a: '' };
const k = 'a';
if (isKeyOf(obj, k)) {
    obj[k] = 'hi'; // typeof k === 'a'
} else {
    throw new Error('oops'); // typeof k === string
}
```

### objectKeys
Same as `Object.keys` except that the returned type is an array of keys of the object.
Note that for the same reason that `Object.keys` does not do this natively, this method _is not safe_ for objects on the perimeter of your code (user input, read in files, network requests etc.).
```ts
const obj = { a: '', b: 22 };
const keys = objectKeys(obj); // Array<'a' | 'b'>
```

## Schema Validation
One of the easiest points of failure with the typescript type system is outside data.
It is difficult to confirm that outside data matches the contract we have set within our typings.
Using the common JSON-schema specification, we can check the validity of our runtime objects, while still having compile checking of logic validity.
If we define our schemas as so:
```ts
const schema = {
    type: 'object' as 'object',
    properties: {
        prop: {
            type: 'string' as 'string'
        }
    }
}
```
then pass in data:
```ts
// use `any` to pretend we don't know the type here.
const runtimeData: any = {
    prop: 'hello world'
};
```
then `schemaIsValid(data, schema)` will give both compile time and run time checking of types.
```ts
if (schemaIsValid(data, schema)) {
    type x = typeof data; // => { prop: string }
} else {
    throw new Error('Uh-oh, you gave me ill-formatted data!!');
}
```
