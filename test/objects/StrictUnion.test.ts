import test from 'ava';
import { assert } from '../helpers/assert';

import { StrictUnion } from '../../src';

test('disallow union members with mixed properties', t => {
    type a = { a: number };
    type b = { b: string };

    type good1 = {a: 1};
    type good2 = {b: "b"};
    type bad = {a: 1, b: "foo"};

    type isStrict<T> = T extends Array<StrictUnion<a | b>> ? 'Yes' : 'No';

    type strictUnion = [good1, good2];
    type nonStrictUnion = [good1, good2, bad];

    assert<isStrict<strictUnion>, 'Yes'>(t);
    assert<isStrict<nonStrictUnion>, 'No'>(t);

});
