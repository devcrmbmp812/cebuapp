/**
 * Created by Kash.C on 11/2/18.
 */
import * as actions from "../actions/action-types";


export default function detailsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACTION_README_SUCCESS:
      return state.withMutations(state => state
        .set('readMe', action.readMe));
    default:
      return state
  }
}