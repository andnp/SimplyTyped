import test from 'ava';
import { assert } from '../helpers/assert';

import { Intersect } from '../../src';

test('Can get an object with only shared properties', t => {
    type a = { x: number, y: string };
    type b = { y: string, z: string };

    type expected = { y: string };
    type got = Intersect<a, b>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
