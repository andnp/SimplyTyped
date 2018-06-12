import test from 'ava';
import { assert } from '../helpers/assert';

import { Merge } from '../../src';

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
