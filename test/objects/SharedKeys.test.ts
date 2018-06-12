import test from 'ava';
import { assert } from '../helpers/assert';

import { SharedKeys } from '../../src';

test('Can get keys that are same between objects', t => {
    type a = { x: number, y: string };
    type b = { x: string, y: string, z: boolean };

    type got = SharedKeys<a, b>;
    type expected = 'x' | 'y';

    assert<got, expected>(t);
    assert<expected, got>(t);
});
