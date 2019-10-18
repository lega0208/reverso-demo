import { setDetails } from '../actions';
import { SET_DETAILS } from '../constants';

describe('Details actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SET_DETAILS,
        data: {},
      };
      expect(setDetails()).toEqual(expected);
    });
  });
});
