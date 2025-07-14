export const FETCH_ADVISOR = 'FETCH_ADVISOR';
export const FETCH_ADVISOR_SUCCESS = 'FETCH_ADVISOR_SUCCESS';
export const FETCH_CHAT_REQUEST = 'FETCH_CHAT_REQUEST';
export const FETCH_CHAT_REQUEST_SUCCESS = 'FETCH_CHAT_REQUEST_SUCCESS';
export const FETCH_ALL_CHATS = 'FETCH_ALL_CHATS';
export const FETCH_ALL_CHATS_SUCCESS = 'FETCH_ALL_CHATS_SUCCESS';
export const APPROVE_CHAT = 'APPROVE_CHAT';
export const BLOCKED_CHAT = 'BLOCKED_CHAT';
export const CREATE_CHAT_REQUEST = 'CREATE_CHAT_REQUEST';


export const fetchAdvisor = (payload) => ({
    type: FETCH_ADVISOR,
    payload,
});

export const fetchAdvisorSuccess = (payload) => ({
    type: FETCH_ADVISOR_SUCCESS,
    payload,
});

export const fetchAllChatRequest = (payload) => ({
    type: FETCH_CHAT_REQUEST,
    payload,
});

export const fetchAllChatRequestSuccess = (payload) => ({
    type: FETCH_CHAT_REQUEST_SUCCESS,
    payload,
});

export const fetchAllChats = (payload) => ({
    type: FETCH_ALL_CHATS,
    payload,
});

export const fetchAllChatsSuccess = (payload) => ({
    type: FETCH_ALL_CHATS_SUCCESS,
    payload,
});

export const approveChat = (payload) => ({
    type: APPROVE_CHAT,
    payload,
});

export const blockChat = (payload) => ({
    type: BLOCKED_CHAT,
    payload,
});

export const createChatRequest = (payload) => ({
    type: CREATE_CHAT_REQUEST,
    payload,
});
