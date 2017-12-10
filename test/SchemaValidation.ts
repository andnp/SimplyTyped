import test from 'ava';
import { schemaIsValid } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass() }

const schema = {
    "type": "object" as 'object',
    "properties": {
        "type": {
            "type": "string" as 'string',
            "minLength": 1
        },
        "data": {
            "type": "object" as 'object',
            "properties": {
                "name": { type: "string" as 'string' }
            }
        },
        "arr": {
            "type": "array" as "array",
            "items": {
                "type": "object" as "object",
                "properties": { thing: { type: 'boolean' as 'boolean' } }
            }
        }
    }
}

test('Can confirm that any object matches trivial schema', t => {
    const obj: any = { a: '' };
    const schema = {};

    if (schemaIsValid(obj, schema)) {
        assert<typeof schema, typeof obj>(t);
    } else {
        t.fail();
    }
});

test('Can confirm that object matches complex schema', t => {
    const obj: any = {
        type: 'imma string',
        data: {
            name: 'hello world'
        },
        arr: [ { thing: false }, { thing: true }]
    };

    type schemaType = {
        type: string,
        data: { name: string },
        arr: Array<{ thing: boolean }>
    };

    if (schemaIsValid(obj, schema)) {
        assert<schemaType, typeof obj>(t);
    } else {
        t.fail();
    }
});
