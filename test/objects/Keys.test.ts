import test from 'ava';
import { assert } from '../helpers/assert';

import { Keys } from '../../src';

test('Can get keys from object', t => {
    type obj = { x: number, y: string, z: boolean };
    type expected = 'x' | 'y' | 'z';
    type got = Keys<obj>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
