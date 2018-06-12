import test from 'ava';
import { assert } from '../helpers/assert';

import { ObjectType } from '../../src';

test('Can turn an object into another object', t => {
    type obj = { x: number, y: string };
    type expected = obj;
    type got = ObjectType<obj>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
