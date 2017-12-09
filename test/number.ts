import test from 'ava';
import { Add, IsOne, IsZero, NumberToString, Sub, True, False, NumberEqual } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass() }

test('Can check if a number is zero', t => {
    type notZero = IsZero<1>;
    type zero = IsZero<0>;
    assert<notZero, False>(t);
    assert<zero, True>(t);
});

test('Can check if a number is one', t => {
    type notOne = IsOne<0>;
    type one = IsOne<1>;
    assert<notOne, False>(t);
    assert<one, True>(t);
});

test('Can add two numbers', t => {
    type fifty = Add<12, 38>;
    assert<fifty, 50>(t);
});

test('Can subtract two numbers', t => {
    type ten = Sub<22, 12>;
    assert<ten, 10>(t);
});

test('Can check if two numbers are equal', t => {
    type notEqual = NumberEqual<22, 23>;
    type equal = NumberEqual<12, 12>;
    assert<notEqual, False>(t);
    assert<equal, True>(t);
});

test('Can get a number as a string', t => {
    type str = NumberToString<22>;
    assert<str, '22'>(t);
});
