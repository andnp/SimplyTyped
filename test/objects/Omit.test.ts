import test from 'ava';
import { assert } from '../helpers/assert';

import { Omit } from '../../src';

test('Can omit keys from an object', t => {
    type a = { x: number, y: string, z: boolean };

    type got = Omit<a, 'x' | 'y'>;
    type expected = { z: boolean };

    assert<got, expected>(t);
    assert<expected, got>(t);
});
