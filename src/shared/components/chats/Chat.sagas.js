import { put, takeLatest, call, all } from 'redux-saga/effects';
import {
    fetchAdvisor,
    approveRequest as approveChatRequest,
    fetchChatRequest, fetchAllChats,
    chatRequest, blockChat,
} from './Chat.api';
import {
    fetchAdvisorSuccess,
    fetchAllChatRequestSuccess,
    FETCH_ADVISOR,
    FETCH_CHAT_REQUEST,
    FETCH_ALL_CHATS,
    fetchAllChatsSuccess,
    CREATE_CHAT_REQUEST,
    APPROVE_CHAT, BLOCKED_CHAT, fetchAllChatRequest,
} from './Chat.actions';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';
import { socket } from './Chat.context';

function* getAdvisor({ payload }) {
    try {
        const data = yield call(fetchAdvisor, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(fetchAdvisorSuccess(data.responseData.data));
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

function* getAllChatRequest({ payload }) {
    try {
        const data = yield call(fetchChatRequest, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(fetchAllChatRequestSuccess(data.responseData.data));
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

function* createChatRequest({ payload }) {
    try {
        const data = yield call(chatRequest, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // socket.createUser();
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

function* approveRequest({ payload }) {
    try {
        const data = yield call(approveChatRequest, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // socket.createUser();
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

function* blockRequest({ payload }) {
    try {
        const data = yield call(blockChat, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // socket.createUser();
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

function* getAllChats({ payload }) {
    try {
        const data = yield call(fetchAllChats, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                yield put(fetchAllChatsSuccess(data.responseData.data));
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        toastrError(toastrMessage.personalInfoError);
    }
}

export function* chatWatcher() {
    yield all([
        takeLatest(FETCH_ADVISOR, getAdvisor),
        takeLatest(FETCH_CHAT_REQUEST, getAllChatRequest),
        takeLatest(APPROVE_CHAT, approveRequest),
        takeLatest(BLOCKED_CHAT, blockRequest),
        takeLatest(FETCH_ALL_CHATS, getAllChats),
        takeLatest(CREATE_CHAT_REQUEST, createChatRequest)
    ]);
}
