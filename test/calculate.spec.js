import calculate from '../src/logic/calculate';

function mockCalc(total, next = undefined, operation = undefined) {
  return { total, next, operation };
}

describe('addition, subtraction, multiplication, or division', () => {
  describe('pending operation before continuing', () => {
    test('calculates and builds new calc with pending operation', () => {
      const numberOne = '1';
      const numberTwo = '2';
      let calc;
      let given;
      let refValue;

      calc = mockCalc(numberOne, numberTwo, '+');
      given = calculate(calc, '+');
      refValue = mockCalc('3', undefined, '+');
      expect(given).toEqual(refValue);

      calc = mockCalc(numberOne, numberTwo, '-');
      given = calculate(calc, 'X');
      refValue = mockCalc('-1', undefined, 'X');
      expect(given).toEqual(refValue);

      calc = mockCalc(numberOne, numberTwo, 'X');
      given = calculate(calc, '÷');
      refValue = mockCalc('2', undefined, '÷');
      expect(given).toEqual(refValue);

      calc = mockCalc(numberOne, numberTwo, '+');
      given = calculate(calc, '-');
      refValue = mockCalc('3', undefined, '-');
      expect(given).toEqual(refValue);
    });
  });
});

describe('percents (%)', () => {
  describe('no next number provided', () => {
    test('it divides the total by 100', () => {
      const calc = mockCalc('5', undefined, undefined);
      const given = calculate(calc, '%');
      const refValue = mockCalc('0.05', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });

  describe('pending operation', () => {
    test('it performs the pending operation and divides by 100', () => {
      const calc = mockCalc('5', '19', '+');
      const given = calculate(calc, '%');
      const refValue = mockCalc('0.24', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });
});

describe('swap sign (+/-)', () => {
  describe('only total is available', () => {
    test('it swaps the sign of total', () => {
      const calc = mockCalc('23', undefined, undefined);
      const given = calculate(calc, '+/-');
      const refValue = mockCalc('-23', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });

  describe('there is a pending operation', () => {
    test('it swaps the sign of the second operand', () => {
      const calc = mockCalc('5', '99', 'X');
      const given = calculate(calc, '+/-');
      const refValue = mockCalc('5', '-99', 'X');
      expect(given).toEqual(refValue);
    });
  });
});

describe('equal sign (=)', () => {
  describe('there is a pending operation', () => {
    test('it updates the total and resets the other properties', () => {
      const calc = mockCalc('87', '-34', '+');
      const given = calculate(calc, '=');
      const refValue = mockCalc('53', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });

  describe('only total is available', () => {
    test('it sets the total to itself', () => {
      const calc = mockCalc('66', undefined, undefined);
      const given = calculate(calc, '=');
      expect(given).toEqual(calc);
    });
  });
});

describe('digits', () => {
  describe('operation is present', () => {
    test('it modifies next to be the sequence of digits passed', () => {
      let calc;
      let given;
      let refValue;

      calc = mockCalc('0', undefined, '+');
      given = calculate(calc, '5');
      refValue = mockCalc('0', '5', '+');
      expect(given).toEqual(refValue);

      calc = mockCalc('17', undefined, 'X');
      given = calculate(calc, '9');
      given = calculate(given, '8');
      refValue = mockCalc('17', '98', 'X');
      expect(given).toEqual(refValue);
    });
  });

  describe('only total is present', () => {
    describe('total is zero', () => {
      // 0 ? ? 7 -> 7 ? ?
      const calc = mockCalc('0', undefined, undefined);
      const given = calculate(calc, '7');
      const refValue = mockCalc('7', undefined, undefined);
      expect(given).toEqual(refValue);
    });

    describe('total is not zero', () => {
      // 7 ? ? 4 -> 74 ? ?
      const calc = mockCalc('7', undefined, undefined);
      const given = calculate(calc, '4');
      const refValue = mockCalc('74', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });
});

describe('decimal point', () => {
  describe('operation is present', () => {
    describe('there is a next number', () => {
      test('it places a decimal point at the end of the next number', () => {
        // 5 - 3 . -> 5 - 3.
        const calc = mockCalc('5', '3', '-');
        const given = calculate(calc, '.');
        const refValue = mockCalc('5', '3.', '-');
        expect(given).toEqual(refValue);
      });

      test('it does nothing if there is a decimal point already', () => {
        // 5 - 3. . -> 5 - 3.
        const calc = mockCalc('5', '3.', '-');
        const given = calculate(calc, '.');
        expect(given).toEqual(calc);
      });
    });

    describe('there is no next number', () => {
      test('it creates 0. as the next number', () => {
        // 5 - ? . -> 5 - 0.
        const calc = mockCalc('5', undefined, '-');
        const given = calculate(calc, '.');
        const refValue = mockCalc('5', '0.', '-');
        expect(given).toEqual(refValue);
      });
    });
  });

  describe('only total is present', () => {
    test('it places a decimal point at the end of the total', () => {
      // 99 ? ? . -> 99. ? ?
      const calc = mockCalc('99');
      const given = calculate(calc, '.');
      const refValue = mockCalc('99.');
      expect(given).toEqual(refValue);
    });

    test('it does nothing if there is a decimal point already', () => {
      // 99. ? ? . -> 99. ? ?
      const calc = mockCalc('99.');
      const given = calculate(calc, '.');
      expect(given).toEqual(calc);
    });
  });
});

describe('AC', () => {
  describe('there is a next number', () => {
    test('it sets the next number to zero', () => {
      // 65 + 23 AC -> 65 + 0
      const calc = mockCalc('65', '23', '+');
      const given = calculate(calc, 'AC');
      const refValue = mockCalc('65', '0', '+');
      expect(given).toEqual(refValue);
    });
  });

  describe('there is no next number, but there is an operation', () => {
    test('it undefines the operation', () => {
      // 87 X ? AC -> 87 ? ?
      const calc = mockCalc('87', undefined, 'X');
      const given = calculate(calc, 'AC');
      const refValue = mockCalc('87', undefined, undefined);
      expect(given).toEqual(refValue);
    });
  });

  describe('there is only total', () => {
    test('it sets total to zero', () => {
      // 76 ? ? AC -> 0 ? ?
      const calc = mockCalc('76');
      const given = calculate(calc, 'AC');
      const refValue = mockCalc('0');
      expect(given).toEqual(refValue);
    });
  });
});
