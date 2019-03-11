import test from 'ava';
import { assert } from '../helpers/assert';

import { ArgsAsTuple } from '../../src';

test("Can get a tuple of function's argument types", t => {
    type F0 = () => any;
    type F1 = (x: number) => any;
    type F2 = (x: number, y: string) => any;
    type F3 = (x: number, y: string, z: boolean) => any;

    type E0 = [];
    type E1 = [number];
    type E2 = [number, string];
    type E3 = [number, string, boolean];

    assert<ArgsAsTuple<F0>, E0>(t);
    assert<ArgsAsTuple<F1>, E1>(t);
    assert<ArgsAsTuple<F2>, E2>(t);
    assert<ArgsAsTuple<F3>, E3>(t);
});
