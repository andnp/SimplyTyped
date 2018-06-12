import test from 'ava';
import { assert } from '../helpers/assert';

import { Required } from '../../src';

test('Can make certain fields of options object required', t => {
    type x = { a?: string, b: number | undefined };
    type got1 = Required<x, 'a'>;
    type got2 = Required<x, 'b'>;
    type got3 = Required<x, 'a' | 'b'>;

    type expected1 = { a: string, b: number | undefined };
    type expected2 = { a?: string, b: number };
    type expected3 = { a: string, b: number };

    assert<got1, expected1>(t);
    assert<got2, expected2>(t);
    assert<got3, expected3>(t);
});
