const { generate, scheme } = require('./generate-json');
const { serialize, deserialize } = require('../dist/index');

describe('using example json', () => {
  describe('from file', () => {
    const example = require('./example.json');
    const template = require('./example-template.json');

    const serializedObject = serialize(example);
    test('serializes json', () => {
      expect(serializedObject).toBeTruthy();
    });
    test('deserializes json', () => {
      const deserializedObject = deserialize(serializedObject, template);
      expect(deserializedObject).toBeTruthy();
      expect(deserializedObject).toEqual(example);
    });
  });

  describe('from array', () => {
    const array = [
      'test config',
      0,
      1,
      { attribute: 0.3, inner: true },
      ['inner', 'array', 12338],
    ];
    const expected = 'test%20config&0&1=0.3&true+=inner&array&12338';
    test('serializes json', () => {
      const serializedObject = serialize(array);
      expect(serializedObject).toBe(expected);
    });
    test('deserializes string with template', () => {
      expect(deserialize(expected, array)).toEqual(array);
    });
    test('deserializes string without template', () => {
      const deserialized = deserialize(expected);
      expect(deserialized).toHaveLength(array.length);
    });
  });
  describe('from string', () => {
    const string = '{"a": 0}';
    const expectedWithoutTemplate = ['0'];
    const serialized = serialize(string);
    test('serializes json from string', () => {
      expect(serialized).toEqual('0');
    });
    test('deserializes string without template', () => {
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(expectedWithoutTemplate);
    });

    test('deserializes string with template', () => {
      const template = { b: 1 };
      const expected = { b: 0 };
      const deserialized = deserialize(serialized, template);
      expect(deserialized).toEqual(expected);
    });
  });
});

describe('using wrong data', () => {
  test('throws when separation characters are used in input', () => {
    const example = { testString: '(test-)' };
    expect(() =>
      serialize(example, {
        objectPrefix: '(',
      })
    ).toThrow();
    expect(() =>
      serialize(example, {
        objectPostfix: ')',
      })
    ).toThrow();
    expect(() =>
      serialize(example, {
        separator: '-',
      })
    ).toThrow();
  });
});

describe.each([[scheme()], [scheme()], [scheme()]])(
  'using multiple random json (%#/3)',
  scheme => {
    const json = generate(scheme);

    const serializedObject = serialize(json);
    test('serializes random example', () => {
      expect(serializedObject).toBeTruthy();
    });

    test('deserializes random example', () => {
      const template = generate(scheme);
      const deserializedObject = deserialize(serializedObject, template);
      expect(deserializedObject).toEqual(json);
    });
  }
);
