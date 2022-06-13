import { objectHasPropertyWithValue } from "./filter-util";

describe('FilterUtil', () => {
  const objectMock = {
    date: new Date('2022-06-10T00:00:00'),
    sumary: 'Lorem Ipsum',
    temperature: 85,
  };

  const cenarios = [
    { term: 'Lorem', dateFormat: null, expected: true },
    { term: 'lorem', dateFormat: null, expected: true },
    { term: 'XloremX', dateFormat: null, expected: false },
    { term: 'June', dateFormat: 'long', expected: true },
    { term: 'Abril', dateFormat: 'long', expected: false },
    { term: '85', dateFormat: null, expected: true },
    { term: '99', dateFormat: null, expected: false },
  ];

  cenarios.forEach(({ term, dateFormat, expected }) => {
    it(`Should return '${expected}' validate that object contains property with searched term ['${term}']`, () => {
      const actual = objectHasPropertyWithValue(objectMock, 'lorem');
      expect(actual).toBeTruthy();
    });
  });
});
