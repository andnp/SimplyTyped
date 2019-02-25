import test from 'ava';
import { assert } from '../helpers/assert';

import { PromiseOr } from '../../src';

test('Will give back a promise containing given type union the type itself', t => {
    type got = PromiseOr<string>;
    type expected = Promise<string> | string;

    assert<got, expected>(t);
});
