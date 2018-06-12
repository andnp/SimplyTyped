import test from 'ava';
import { assert } from '../helpers/assert';

import { NoInfer } from '../../src';

test('Will not infer based on second argument', t => {
    function doStuff<T>(x: T, y: NoInfer<T | 'there'>): T { return x; }

    const hi = 'hi' as 'hi' | number;
    const there = 'there';
    const x = doStuff(hi, there);

    assert<typeof x, 'hi'>(t);
    assert<typeof x, number>(t);
});
