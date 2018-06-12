import test from 'ava';
import { assert } from '../helpers/assert';

import { Overwrite } from '../../src';

test('Can overwrite properties on an object', t => {
    type a = { x: number, y: string, z: 'hello there' };

    type expected = { x: number, y: string, z: 'hello' | 'there' };
    type got1 = Overwrite<a, { z: 'hello' | 'there' }>;
    type got2 = Overwrite<a, { z: 'hello' | 'there', w: number }>;

    assert<got1, expected>(t);
    assert<expected, got1>(t);
    assert<got2, expected>(t);
    assert<expected, got2>(t);
});
