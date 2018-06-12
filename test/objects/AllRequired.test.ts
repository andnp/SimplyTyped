import test from 'ava';
import { assert } from '../helpers/assert';

import { AllRequired } from '../../src';

test('Can make all fields of options object required (not optional and not nullable)', t => {
    type x = { a?: string, b: number | undefined };
    type got = AllRequired<x>;
    type expected = { a: string, b: number };

    assert<got, expected>(t);
    assert<expected, got>(t);
});
