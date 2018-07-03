import test from 'ava';
import { assert } from '../helpers/assert';

import { DeepPartial } from '../../src';

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

test('Can get a deep partial object with functions', t => {
    type x = {
        a: () => 22,
        b: string,
        c: {
            d: number,
        },
    };

    type expected = {
        a?: () => 22,
        b?: string,
        c?: {
            d?: number,
        },
    };

    type got = DeepPartial<x>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
