import test from 'ava';
import { assert } from '../helpers/assert';

import { Predicate } from '../../src';

test('Can build a predicate function with single known argument type', t => {
    type PredFunc = Predicate<string>;
    type expected = (arg: string) => boolean;

    assert<PredFunc, expected>(t);
});

test('Can build a predicate function with unknown argument types', t => {
    type PredFunc = Predicate;
    type works = (arg1: string, arg2: number) => boolean;
    type expected = (...args: any[]) => boolean;

    assert<PredFunc, works>(t);
    assert<PredFunc, expected>(t);
});
