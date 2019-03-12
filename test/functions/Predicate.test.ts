import test from 'ava';
import { assert } from '../helpers/assert';

import { Predicate } from '../../src';

test('Can build a predicate function with single known argument type', t => {
    type PredFunc = Predicate<string>;
    type expected = (arg: string) => boolean;

    assert<PredFunc, expected>(t);
});
