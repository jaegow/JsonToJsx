import { ActionTypes } from './ActionsTypes';

test('ActionTypes does not have duplicate values', () => {
  const ActionTypes_values = Object.values(ActionTypes);
  const had_duplicate_values = ActionTypes_values.some((val, i) => ActionTypes_values.indexOf(val) !== i);
  expect(had_duplicate_values).toBe(false);
});
