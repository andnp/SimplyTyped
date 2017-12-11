import test from 'ava';
import { IsAny, IsArray, IsBoolean, IsFunction, IsNumber, IsObject, IsString, IsType, True, False } from '../src/index';

function assert<T, U extends T>(t: { pass: any }) { t.pass(); }

class Class { x = 'hey'; }
const inst = new Class();

type num = 0;
type str = 'hi';
type boo = false;
type obj = object;
type func = () => string;
type cls = typeof inst;

test('Can check if a type is an array', t => {
    assert<IsArray<['hi', 'there']>, True>(t);
    assert<IsArray<any[]>, True>(t);

    assert<IsArray<num>, False>(t);
    assert<IsArray<str>, False>(t);
    assert<IsArray<obj>, False>(t);
    assert<IsArray<func>, False>(t);
    assert<IsArray<boo>, False>(t);
    assert<IsArray<any>, False>(t);
    assert<IsArray<cls>, False>(t);
});

test('Can check if a type is a number', t => {
    assert<IsNumber<num>, True>(t);
    assert<IsNumber<number>, True>(t);

    assert<IsNumber<str>, False>(t);
    assert<IsNumber<obj>, False>(t);
    assert<IsNumber<func>, False>(t);
    assert<IsNumber<boo>, False>(t);
    assert<IsNumber<any>, False>(t);
    assert<IsNumber<any[]>, False>(t);
    assert<IsNumber<cls>, False>(t);

});

test('Can check if a type is boolean', t => {
    assert<IsBoolean<boo>, True>(t);
    assert<IsBoolean<boolean>, True>(t);

    assert<IsBoolean<num>, False>(t);
    assert<IsBoolean<str>, False>(t);
    assert<IsBoolean<obj>, False>(t);
    assert<IsBoolean<func>, False>(t);
    assert<IsBoolean<any>, False>(t);
    assert<IsBoolean<any[]>, False>(t);
    assert<IsBoolean<cls>, False>(t);
});

test('Can check if a type is a string', t => {
    assert<IsString<str>, True>(t);
    assert<IsString<string>, True>(t);

    assert<IsString<boo>, False>(t);
    assert<IsString<num>, False>(t);
    assert<IsString<obj>, False>(t);
    assert<IsString<func>, False>(t);
    assert<IsString<any>, False>(t);
    assert<IsString<any[]>, False>(t);
    assert<IsString<cls>, False>(t);
});

test('Can check if a type is a function', t => {
    assert<IsFunction<func>, True>(t);
    assert<IsFunction<Function>, True>(t); // tslint:disable-line

    // TODO: this should probably be False
    assert<IsFunction<obj>, True>(t);

    assert<IsFunction<str>, False>(t);
    assert<IsFunction<boo>, False>(t);
    assert<IsFunction<num>, False>(t);
    assert<IsFunction<any>, False>(t);
    assert<IsFunction<any[]>, False>(t);
    assert<IsFunction<cls>, False>(t);
});

test('Can check if a type is an object', t => {
    assert<IsObject<cls>, True>(t);
    assert<IsObject<{y: any}>, True>(t);

    // TODO: this should probably be True
    assert<IsObject<object>, False>(t);

    assert<IsObject<str>, False>(t);
    assert<IsObject<boo>, False>(t);
    assert<IsObject<num>, False>(t);
    assert<IsObject<obj>, False>(t);
    assert<IsObject<func>, False>(t);
    assert<IsObject<any>, False>(t);
    assert<IsObject<any[]>, False>(t);
});

test('Can check if type is the same as another type', t => {
    assert<IsType<Class, cls>, True>(t);
    assert<IsType<string, str>, True>(t);

    assert<IsType<Class, str>, False>(t);
});

test('Can check if a type is any', t => {
    assert<IsAny<any>, True>(t);

    assert<IsAny<str>, False>(t);
    assert<IsAny<boo>, False>(t);
    assert<IsAny<num>, False>(t);
    assert<IsAny<obj>, False>(t);
    assert<IsAny<func>, False>(t);
    assert<IsAny<any[]>, False>(t);
    assert<IsAny<cls>, False>(t);
});
