import Big from 'big.js/big';
import operate from '../src/logic/operate';

function mockBuild(numberOne, numberTwo, operation) {
  const bigOne = Big(numberOne);
  const bigTwo = Big(numberTwo);

  let result;

  switch (operation) {
    case 'X':
      result = bigOne.times(bigTwo);
      break;
    case '÷':
      result = bigOne.div(bigTwo);
      break;

    case '+':
      result = bigOne.plus(bigTwo);
      break;
    case '-':
      result = bigOne.minus(bigTwo);
      break;
    default:
      result = 'NaN';
      break;
  }

  return result.toString();
}

test('it adds two numbers', () => {
  const numberOne = '234';
  const numberTwo = '98';
  const given = operate(numberOne, numberTwo, '+');
  const expected = mockBuild(numberOne, numberTwo, '+');
  expect(given).toEqual(expected);
});

test('it subtracts two numbers', () => {
  const numberOne = '13';
  const numberTwo = '38';
  const given = operate(numberOne, numberTwo, '-');
  const expected = mockBuild(numberOne, numberTwo, '-');
  expect(given).toEqual(expected);
});

test('it multiplies two numbers', () => {
  const numberOne = '16';
  const numberTwo = '98';
  const given = operate(numberOne, numberTwo, 'X');
  const expected = mockBuild(numberOne, numberTwo, 'X');
  expect(given).toEqual(expected);
});

test('it divides two numbers', () => {
  const numberOne = '46';
  const numberTwo = '98';
  const given = operate(numberOne, numberTwo, '÷');
  const expected = mockBuild(numberOne, numberTwo, '÷');
  expect(given).toEqual(expected);
});

test('it returns NaN on unknown operations', () => {
  const numberOne = '14';
  const numberTwo = '88';
  const given = operate(numberOne, numberTwo, 'huh');
  const expected = mockBuild(numberOne, numberTwo, 'huh');
  expect(given).toEqual(expected);
});
