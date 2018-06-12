import test from 'ava';
import { assert } from '../helpers/assert';

import { ConstructorFunction } from '../../src';

test('Can build a constructor type for a type', t => {
    type Constructor = ConstructorFunction<{ x: string, y: number }>;
    class Thing { x: string = ''; y: number = 22; }

    assert<Constructor, typeof Thing>(t);
});
