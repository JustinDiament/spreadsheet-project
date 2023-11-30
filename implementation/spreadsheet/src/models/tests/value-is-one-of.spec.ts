import { ValueIsOneOfRule } from "../value-is-one-of-rule";

describe('Value is one of', (): void => {

    beforeEach((): void => {
    });

    
    it('should allow values that are numbers in the specified set', () => {
      const allowedValues = [5, 10, 15];
      const rule = new ValueIsOneOfRule(allowedValues);
  
      // Values that are numbers in the specified set
      for (const value of allowedValues) {
        const isValid = rule.checkRule(value.toString());
        expect(isValid).toBe(true);
      }
    });
  
    it('should not allow values that are not in the specified set', () => {
      const allowedValues = ['oneallowed', 'twoallowed', 'threeallowed'];
      const rule = new ValueIsOneOfRule(allowedValues);
  
      // Values that are not in the specified set
      const invalidValues = ['notallowed1', 'notallowed2', 'notallowed3'];
      for (const value of invalidValues) {
        const isValid = rule.checkRule(value.toString());
        expect(isValid).toBe(false);
      }
    });
  
    it('should handle edge case with an empty set and reject any value', () => {
      const rule = new ValueIsOneOfRule([]);
      const isValid = rule.checkRule('anyValue');
      expect(isValid).toBe(false);
    });
  
    // Add more edge cases as needed
  
  });
export {}