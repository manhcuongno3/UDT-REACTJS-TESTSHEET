import { getKeypadLayout, evaluateExpression, formatResult, isOperator, SPECIAL_OPERATORS } from './helpers';
import { OPERATORS } from './constants';

describe('getKeypadLayout', () => {
  it('should return AC when display value is 0', () => {
    const layout = getKeypadLayout('0');
    expect(layout[0][0].value).toBe('AC');
  });

  it('should return C when display value is not 0', () => {
    const layout = getKeypadLayout('123');
    expect(layout[0][0].value).toBe('C');
  });
});

describe('evaluateExpression', () => {
  it('should correctly evaluate basic arithmetic', () => {
    expect(evaluateExpression('2+2')).toBe(4);
    expect(evaluateExpression('3x4')).toBe(12);
    expect(evaluateExpression('10÷2')).toBe(5);
    expect(evaluateExpression('5-3')).toBe(2);
  });

  it('should handle decimal numbers with comma', () => {
    expect(evaluateExpression('2,5+2,5')).toBe(5);
  });
});

describe('formatResult', () => {
  it('should format numbers with comma as decimal separator', () => {
    expect(formatResult(5.5)).toBe('5,5');
    expect(formatResult(10)).toBe('10');
  });

  it('should remove trailing zeros', () => {
    expect(formatResult(5.00)).toBe('5');
    expect(formatResult(5.50)).toBe('5,5');
  });

  it('should return "Error" for numbers larger than 9999999', () => {
    expect(formatResult(10000000)).toBe('Error');
    expect(formatResult(-10000000)).toBe('Error');
  });
});

describe('isOperator', () => {
  it('should return true for valid operators', () => {
    expect(isOperator('+')).toBe(true);
    expect(isOperator('-')).toBe(true);
    expect(isOperator('x')).toBe(true);
    expect(isOperator('÷')).toBe(true);
  });

  it('should return false for non-operators', () => {
    expect(isOperator('1')).toBe(false);
    expect(isOperator('A')).toBe(false);
  });

  it('should return true for special operators', () => {
    expect(isOperator('x')).toBe(true);
    expect(isOperator('+')).toBe(true);
    expect(isOperator('-')).toBe(true);
  });

  it('should return false for non-operators', () => {
    expect(isOperator('A')).toBe(false);
    expect(isOperator('1')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isOperator('')).toBe(false);
  });

  it('should return value for special operators', () => {
    expect(SPECIAL_OPERATORS['x'](2)).toBe(4);
    expect(SPECIAL_OPERATORS['+'](2)).toBe(4);
    expect(SPECIAL_OPERATORS['-'](2)).toBe(0);
  });
});
