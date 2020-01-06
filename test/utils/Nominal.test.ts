import test from 'ava';
import { assert } from '../helpers/assert';

import { Nominal } from '../../src';

test('Can make a new nominal type', t => {
    type Id = Nominal<string, 'id'>;

    // Can assign nominal type to normal type
    function expectsString(s: string) { /* noop */ }
    const id = "foo" as Id;
    expectsString(id);

    // TODO: improve once negative testing is in place
    assert<Id, Nominal<string, 'id'>>(t);
});
