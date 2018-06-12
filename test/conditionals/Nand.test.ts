import test from 'ava';
import { assert } from '../helpers/assert';

import { Bool, False, True, If, Nand } from '../../src';

test('Conditions can be based on NAND', t => {
    assert<Nand<True, True>,   False>(t);
    assert<Nand<False, True>,  True>(t);
    assert<Nand<True, False>,  True>(t);
    assert<Nand<False, False>, True>(t);
});
