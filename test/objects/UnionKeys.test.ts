import test from 'ava';
import { assert } from '../helpers/assert';

import { AllKeys, UnionKeys } from '../../src';

test('Can get all keys between objects in a union', t => {
    type a = { w: number, x: string };
    type b = { x: number, z: boolean };
    type c = { y: boolean, z: string };

    type got = UnionKeys<a | b | c>;
    type expected = 'w' | 'x' | 'y' | 'z';

    assert<got, expected>(t);
    assert<expected, got>(t);
});
