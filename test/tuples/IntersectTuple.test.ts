import test from 'ava';
import { assert } from '../helpers/assert';

import { IntersectTuple } from '../../src';

test('Can get the intersection of tuple values', t => {
    type t = [{a: 'hi'}, {b: 'there'}, {c: 'friend'}];

    type got = IntersectTuple<t>;
    type expected = {a: 'hi'} & {b: 'there'} & {c: 'friend'};

    assert<got, expected>(t);
    assert<expected, got>(t);
});
