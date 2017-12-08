import test from 'ava';
import { Diff, DropString, IsNever, StringEqual, True, False } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass() }

// Strings

test('Can get difference between unions of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hi' | 'my' | 'friend';

    type gotA = Diff<a, b>;
    type gotB = Diff<b, a>;

    assert<gotA, 'there'>(t);
    assert<gotB, 'my' | 'friend'>(t);
});

test('Can ask if a string is of type "never"', t => {
    type str = 'hi';
    assert<IsNever<str>, False>(t);
    assert<IsNever<never>, True>(t);
});

test('Can check that two unions of strings are equal', t => {
    type a = 'hi' | 'there';
    type b = 'there' | 'hi';
    type c = 'hi' | 'there' | 'friend';

    assert<StringEqual<a, b>, True>(t);
    assert<StringEqual<a, b>, True>(t);
    assert<StringEqual<b, c>, False>(t);
});

test('Can remove a string from a union of strings', t => {
    type a = 'hi' | 'there';
    type b = 'hey' | 'there' | never;

    assert<DropString<a, 'hi'>, 'there'>(t);
    assert<DropString<b, 'hey' | 'there'>, never>(t);
    assert<DropString<a, 'hi' | 'there'>, never>(t);
});
