import test from 'ava';
import { assert } from '../helpers/assert';

import { UnionToIntersection} from '../../src';

test('Union of Strings', t => {
    type got = UnionToIntersection<'hi' | 'there'>;
    type expected = 'hi' & 'there';

    assert<got, expected>(t);
});

test('Union of Objects', t => {
    type got = UnionToIntersection<   { a: 0 } |
    { b: 1 } |
    { c: 2 }>;

    type expected =   {
        a: 0
        b: 1
        c: 2
      };

    assert<got, expected>(t);
});
