export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
export const FETCH_FOLLOWERS_SUCCESS = 'FETCH_FOLLOWERS_SUCCESS';
export const FETCH_FOLLOWERS_REQUEST = 'FETCH_FOLLOWERS_REQUEST';
export const FETCH_FOLLOWERS_REQUEST_SUCCESS = 'FETCH_FOLLOWERS_REQUEST_SUCCESS';
export const BLOCK_FOLLOWER = 'BLOCK_FOLLOWER';
export const UNFOLLOW_FOLLOWER = 'UNFOLLOW_FOLLOWER';
export const APPROVE_FOLLOWER = 'APPROVE_FOLLOWER';
export const FOLLOW = 'FOLLOW';

export const fetchAllFollowers = (payload) => ({
    type: FETCH_FOLLOWERS,
    payload
});

export const fetchAllFollowersSuccess = (payload) => ({
    type: FETCH_FOLLOWERS_SUCCESS,
    payload
});

export const fetchFollowersRequest = (payload) => ({
    type: FETCH_FOLLOWERS_REQUEST,
    payload
});

export const fetchFollowersRequestSuccess = (payload) => ({
    type: FETCH_FOLLOWERS_REQUEST_SUCCESS,
    payload
});

export const follow = (payload) => ({
    type: FOLLOW,
    payload
});

export const blockFollower = (payload) => ({
    type: BLOCK_FOLLOWER,
    payload
});

export const unFollowFollower = (payload) => ({
    type: UNFOLLOW_FOLLOWER,
    payload
});

export const approveFollower = (payload) => ({
    type: APPROVE_FOLLOWER,
    payload
});
