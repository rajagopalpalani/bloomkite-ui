import * as CONSTANTS from './Chat.actions';

const initialState = {
    loggedInUser: {},
    chats: [],
    requests: [],
    loading: false,
    followingChat : [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_ADVISOR: {
            return {
                ...state,
                loading: true,
            };
        }
        case CONSTANTS.FETCH_ADVISOR_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                loggedInUser: payload,
            };
        }
        case CONSTANTS.FETCH_CHAT_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case CONSTANTS.FETCH_CHAT_REQUEST_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                followingChat: payload,
            };
        }
        case CONSTANTS.FETCH_ALL_CHATS: {
            return {
                ...state,
                loading: true,
            };
        }
        case CONSTANTS.FETCH_ALL_CHATS_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                chats: payload,
                requests: payload
            };
        }
        default:
            return state;
    }
};
