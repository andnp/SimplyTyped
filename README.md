# ts-types

Yet another typing library.
This differs by aiming to be less experimental than others, driven by industry use cases.

Many of the exposed types are a very thin layer above built in functionality.
The goal is to provide all of the building blocks necessary to make concise, yet complex types.

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

### DeepPartial
Uses `Partial` to make every parameter of an object optional (`| undefined`).
```ts
type x = DeepPartial<obj1> // => { w?: string, x?: string, y?: number }
```

## Tuples
A tuple can be defined in two ways: `[number, string]` which as of Typescript 2.7 has an enforced length type parameter: `[number, string]['length'] === 2` or using this libraries `Tuple<any>` which can be extended with any length of tuple: `function doStuff<T extends Tuple<any>>(x: T) {}`.

### Tuple
```ts
function doStuff<T extends Tuple<any>>(x: T) {}

doStuff(['hi', 'there']); // => doStuff(x: ['hi', 'there']): void
```

### UnionizeTuple
```ts
type x = UnionizeTuple<[number, string]> // => number | string
```

## Strings

### Diff
Get the differences between two unions of strings.
```ts
type x = Diff<'hi' | 'there', 'hi' | 'friend'> // => 'there'
```
