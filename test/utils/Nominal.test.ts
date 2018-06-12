import test from 'ava';
import { assert } from '../helpers/assert';

import { Nominal } from '../../src';

test('Can make a new nominal type', t => {
    type Id = Nominal<string, 'id'>;

    // TODO: improve once negative testing is in place
    assert<Id, Nominal<string, 'id'>>(t);
});
