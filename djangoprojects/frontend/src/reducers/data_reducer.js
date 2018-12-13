import { FETCH_TESTDATA } from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TESTDATA:
      const data = action.payload;
      return [...state, data];
    default:
      return state;
  }
}
