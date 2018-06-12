import test from 'ava';
import { assert } from '../helpers/assert';

import { Vector } from '../../src';

test('Can extend a vector with tuple', t => {
    function doStuff<T extends Vector<any>, E extends T, L extends number>(x: T, y: E, length: L) {
        assert<T, E>(t);
        assert<T['length'], L>(t);
    }

    const x: ['hey', 22] = ['hey', 22];
    const y: ['hey', 'there', 'friend'] = ['hey', 'there', 'friend'];
    doStuff(x, ['hey', 22], 2);
    doStuff(y, ['hey', 'there', 'friend'], 3);
});
