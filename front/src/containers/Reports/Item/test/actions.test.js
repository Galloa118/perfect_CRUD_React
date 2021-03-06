import expect from 'expect';
import {
  CREATE,
} from '../constants';
import {
  create,
} from '../actions';

const actionsMap = {
  create: {
    name: 'create',
    method: create,
    constant: CREATE,
  },
};

Object.keys(actionsMap).forEach((key) => {
  const { method, name, constant } = actionsMap[key];
  describe(`action ${name}`, () => {
    it('returns the right type', () => {
      expect(method().type).toBe(constant);
    });
    it('sets the first argument to the payload property', () => {
      const target = {};
      expect(method(target).payload).toBe(target);
    });
  });
});
