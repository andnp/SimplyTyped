import test from 'ava';
import { assert } from '../helpers/assert';

import { AllKeys } from '../../src';

test('Can get all keys between objects', t => {
    type a = { w: number, x: string };
    type b = { x: number, z: boolean };

    type got = AllKeys<a, b>;
    type expected = 'w' | 'x' | 'z';

    assert<got, expected>(t);
    assert<expected, got>(t);
});
