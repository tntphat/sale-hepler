import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { apiMessages } from '../../../services/api';

interface IParamMessageContent {
  receiverId: any;
  messageText: string;
  messageAttachment?: any[];
}

interface ChatState {
  directMessages: any;
  selectedChat: any;
  chatUserDetails: any;
  myInfo: any;
  chatUserConversations: any;
  isOpenUserDetails: boolean;
  error: any;
  unSeen: boolean;
  isMessageSent: boolean;
  loading: boolean;
  loadingSetting: boolean;
  loadingMessage: boolean;
  loadingConversation: boolean;
}

export const getAllConversations = createAsyncThunk(
  'chat/getAllConversations',
  async (pageId: number | string) => {
    return apiMessages.getAllConversations(pageId);
  },
);

export const getChatUserConversations = createAsyncThunk(
  'chat/getChatUserConversations',
  async (threadId: number | string) => {
    return apiMessages.getConversationDetail(threadId);
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (params: IParamMessageContent) => {
    return apiMessages.sendMessage(params);
  },
);

const initialState: ChatState = {
  directMessages: [],
  selectedChat: null,
  myInfo: {},
  chatUserDetails: {},
  chatUserConversations: {},
  isOpenUserDetails: false,
  error: null,
  unSeen: false,
  isMessageSent: false,
  loading: false,
  loadingSetting: false,
  loadingMessage: false,
  loadingConversation: false,
};

const messagesSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    changeSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      const selectedConversation = state.directMessages?.data?.find(
        (conversation: any) => conversation.id === state.selectedChat,
      );
      const paticipants = selectedConversation?.participants?.data;
      state.chatUserDetails = paticipants?.find((paticipant: any) => {
        return paticipant.id != state.myInfo.id;
      });
    },
    toggleLoading: (state) => {
      state.loadingSetting = !state.loadingSetting;
    },
    toggleLoading2: (state) => {
      state.loading = !state.loading;
    },
    toggleLoadingConversation: (state) => {
      state.loadingConversation = !state.loadingConversation;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.fulfilled, (state, action) => {
      state.directMessages = action.payload?.data;
      state.myInfo = state.directMessages?.data[0]?.participants?.data[1];
      state.loading = false;
      state.unSeen = state.directMessages.data.some((directMessage: any) => {
        directMessage.isRead === false;
      });
    });
    builder.addCase(getAllConversations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChatUserConversations.fulfilled, (state, action) => {
      state.chatUserConversations = action.payload?.data;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isMessageSent = true;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isMessageSent = false;
    });
  },
});
export const { changeSelectedChat, toggleLoading, toggleLoading2, toggleLoadingConversation } =
  messagesSlice.actions;
export default messagesSlice.reducer;
