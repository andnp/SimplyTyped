import test from 'ava';
import { assert } from '../helpers/assert';

import { Optional } from '../../src';

test('Can make properties optional', t => {
    type x = { x: number, y: string, z: 'hello there' };

    type expected = { x?: number, y?: string, z: 'hello there' };
    type got = Optional<x, 'x' | 'y'>;

    assert<got, expected>(t);
    assert<expected, got>(t);
});
