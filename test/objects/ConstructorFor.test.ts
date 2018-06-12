import test from 'ava';
import { assert } from '../helpers/assert';

import { ConstructorFor } from '../../src';

test('Can get a constructor type for any object', t => {
    type x = { a: number, b: string, c: boolean };

    class Expected {
        a: number = null as any;
        b: string = null as any;
        c: boolean = null as any;
    }

    type got = ConstructorFor<x>;
    assert<got, typeof Expected>(t);
    assert<typeof Expected, got>(t);
});
