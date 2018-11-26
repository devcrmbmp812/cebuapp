/**
 * created by  Kash.C on 26/12/2018
 */
import * as actions from "../actions/action-types";

export default function signupReducer(state, action = {}) {
    switch(action.type) {
        case actions.SIGNUP_SUCCESS: {
            return state.withMutations(state => state
                .set('isLoggedIn', true)
                .set('progress', false)
                .set('authorizationId', action.token.id)
                .set('username', action.username)
                .set('token', action.token.token)
                );
        }
        case actions.SIGNUP_ERROR: {
            return state.withMutations(state => state
                .set('isLoggedIn', false)
                .set('progress', false)
                .set('signupError', action.error)
                );
        }
        default:
            return state
    }
}