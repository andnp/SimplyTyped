import test from 'ava';
import { NoInfer, Nullable, NotNullable, Nominal } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass(); }

test('Will not infer based on second argument', t => {
    function doStuff<T>(x: T, y: NoInfer<T | 'there'>): T { return x; }

    const hi = 'hi' as 'hi' | number;
    const there = 'there';
    const x = doStuff(hi, there);

    assert<typeof x, 'hi'>(t);
    assert<typeof x, number>(t);
});

test('Will make a type nullable (null | undefined)', t => {
    type got = Nullable<string>;
    type expected = string | null | undefined;

    assert<got, expected>(t);
});

test('Will make a type not nullable', t => {
    type got = NotNullable<Nullable<string>>;

    assert<got, string>(t);
});

test('Can make a new nominal type', t => {
    type Id = Nominal<string, 'id'>;

    // TODO: improve once negative testing is in place
    assert<Id, Nominal<string, 'id'>>(t);
});
