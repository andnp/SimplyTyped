import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If, Xor } from '../../src';

test('Conditions can be based on XOR', t => {
    assert<Xor<True, True>,   False>(t);
    assert<Xor<False, True>,  True>(t);
    assert<Xor<True, False>,  True>(t);
    assert<Xor<False, False>, False>(t);
});
