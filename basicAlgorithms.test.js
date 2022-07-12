const algorithms = require('./basicAlgorithms.js');
const helpers = require('./helpers');

describe('maxSubarray tests', () => {
  it('Correctly adds the max subArray', () => {
    expect(algorithms.maxSubArray([-2, 1, -3, 4, -1])).toEqual(4);
    expect(algorithms.maxSubArray([-2, 1, -3, 4, -1, 7, 8, 3, -2])).toEqual(21);
  });

  // Working! Figure out why later
  it('Throws error when input is not valid', () => {
    expect(() => {
      expect(algorithms.maxSubArray(null)).toThrow(
        'Input must be a valid array of numbers'
      );
    });
  });

  it('Throws an error when the function is called without an arg', () => {
    expect(() => {
      expect(
        algorithms
          .maxSubArray()
          .toThrow('Input must be a valid array of numbers')
      );
    });
  });
});

describe('Testing mock functionality for practice', () => {
  it('Practices using the mock() object', () => {
    const mock = jest.fn(); // If no implementation is provided for jest.fn(), it will return undefined
    const result = mock();

    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith();
  });

  // Awesome!
  it('has been called with the correct arguments and returns a correct value', () => {
    const mock = jest
      .fn()
      .mockReturnValueOnce('First return')
      .mockReturnValueOnce('Second return');

    const resultFirst = mock('First call');
    const resultSecond = mock('Second call');

    expect(resultFirst).toBe('First return');
    expect(resultSecond).toBe('Second return');
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenNthCalledWith(1, 'First call');
    expect(mock).toHaveBeenNthCalledWith(2, 'Second call');
  });
});

describe('spyOn() practice', () => {
  it('returns correct result', () => {
    const addMock = jest.spyOn(helpers, 'add');

    const result = addMock(1, 2);

    // look, in contrast to jest.fn() that returns undefined by default
    // jest.spyOn() calls original implementation
    expect(result).toBe(3);
  });

  it('returns mocked and original result', () => {
    const addMock = jest.spyOn(helpers, 'add');

    // Says, for the function we're mocking, when we call it, give us this implementation
    addMock.mockImplementation(() => 4);

    // redefined implementation
    expect(helpers.add()).toBe(4);

    addMock.mockRestore();

    // original implementation
    expect(helpers.add(1, 2)).toBe(3);
  });

  // Difference than above - the function is referenced through addMock() rather than helpers.add()
  it('returns mocked and original result', () => {
    const addMock = jest.spyOn(helpers, 'add');

    // Mocking the implementation of the function we're spying on
    addMock.mockImplementation(() => 4);

    expect(addMock()).toBe(4);

    addMock.mockRestore();

    expect(helpers.add(1, 3)).toBe(4);
  });
});

describe('String tests using spyOn', () => {
  const substringMock = jest.spyOn(algorithms, 'longestSubstring');
  it('Correctly calculates the longest substring', () => {
    // Syntax is: jest.spyOn(object, methodName)
    expect(substringMock('pwwkew')).toBe(3);
  });

  it('Correctly throws error when no input is provided', () => {
    expect(() => {
      // Remember, when testing throwing errors, an expect function must be wrapped around!
      expect(substringMock()).toThrow(
        'Input must be characters with no spaces'
      );
    });
  });

  it('Correctly throws an error when the input has a space', () => {
    expect(() => {
      expect(
        substringMock('h e llo').toThrow(
          'Input must be characters with no spaces'
        )
      );
    });
  });
});

describe('groupingAnagrams', () => {
  it('Provides the correct result', () => {
    const anagramMock = jest.spyOn(algorithms, 'groupAnagrams');
    expect(
      anagramMock(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
    ).toStrictEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);
  });
  it('Throws an error when the function is called with no input', () => {
    const anagramMock = jest.spyOn(algorithms, 'groupAnagrams');
    expect(() => {
      expect(anagramMock()).toThrow('The input must be an array of strings');
    });
  });
  it('Throws an error when the input type is incorrect', () => {
    const anagramMock = jest.spyOn(algorithms, 'groupAnagrams');
    expect(() => {
      expect(anagramMock(123)).toThrow('The input must be an array of strings');
    });
  });
});
