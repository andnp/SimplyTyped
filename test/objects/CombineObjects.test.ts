import test from 'ava';
import { assert } from '../helpers/assert';

import { CombineObjects } from '../../src';

test('Can combine two objects (without pesky & in vscode)', t => {
    type a = { x: number, y: 'hi' };
    type b = { z: number };

    type got = CombineObjects<a, b>;
    type expected = {
        x: number,
        y: 'hi',
        z: number
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});
