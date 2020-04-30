import test from 'ava';
import { assert } from '../helpers/assert';

import { ElementwiseIntersect } from '../../src';

test('Can combine two objects elementwise', t => {
    type a = { x: number, y: 'hi' };
    type b = { z: number, y: 'there' };

    type got = ElementwiseIntersect<a, b>;
    type expected = {
        x: number,
        y: 'hi' & 'there',
        z: number,
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});

test('Can combine two objects with private members elementwise', t => {
    class A {
        a: number = 1;
        private x: number = 2;
        y: 'hi' = 'hi';
        private z: 'hey' = 'hey';
    }

    class B {
        a: 22 = 22;
        private x: number = 2;
        y: 'there' = 'there';
        private z: 'friend' = 'friend';
    }

    type got = ElementwiseIntersect<A, B>;
    type expected = {
        a: 22,
        y: 'hi' & 'there',
    };

    assert<got, expected>(t);
    assert<expected, got>(t);
});
