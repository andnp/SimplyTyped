import test from 'ava';
import { assert } from '../helpers/assert';

import { AnyFunc } from '../../src';

test('Can define the type of a function that takes any arguments', t => {
    type got = AnyFunc;
    type got2 = AnyFunc<number>; // takes anything, returns a number

    type expected = (...args: any[]) => any;
    type expected2 = (...args: any[]) => number;

    assert<got, expected>(t);
    assert<got2, expected2>(t);
});
