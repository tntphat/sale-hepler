import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiMessages } from '../../../services/api';

interface IParamMessageContent {
  receiverId: any;
  messageText: string;
  messageAttachment?: any[];
}

export const getAllConversations = createAsyncThunk('chat/getAllConversations', async () => {
  return apiMessages.getAllConversations(110681441599820);
});

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

interface ChatState {
  directMessages: any;
  selectedChat: any;
  chatUserDetails: any;
  myInfo: any;
  chatUserConversations: any;
  isOpenUserDetails: boolean;
  error: any;
  isRead: boolean;
  isMessageSent: boolean;
  loading: boolean;
  loadingSetting: boolean;
}

const initialState: ChatState = {
  directMessages: [],
  selectedChat: null,
  myInfo: {},
  chatUserDetails: {},
  chatUserConversations: {},
  isOpenUserDetails: false,
  error: null,
  isRead: false,
  isMessageSent: false,
  loading: false,
  loadingSetting: false,
};

const messagesSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    changeSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      const selectedConversation = state.directMessages?.data.find(
        (conversation: any) => conversation.id === state.selectedChat,
      );
      const paticipants = selectedConversation.participants.data;
      state.chatUserDetails = paticipants.find((paticipant: any) => {
        return paticipant.id != state.myInfo.id;
      });
    },
    toggleLoading: (state) => {
      state.loadingSetting = !state.loadingSetting;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.fulfilled, (state, action) => {
      state.directMessages = action.payload?.data;
      state.myInfo = state.directMessages?.data[0].participants?.data[1];
      // state.loading = false;
    });
    // builder.addCase(getAllConversations.rejected, (state, action) => {
    //   const error = action.error;
    //   state.error = error;
    // });
    // builder.addCase(getAllConversations.pending, (state, action) => {
    //   // state.loading = true;
    // });
    builder.addCase(getChatUserConversations.fulfilled, (state, action) => {
      state.chatUserConversations = action.payload?.data;
      state.loading = false;
    });
    // builder.addCase(getChatUserConversations.pending, (state, action) => {
    //   state.loading = true;
    // });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isMessageSent = true;
    });
    // builder.addCase(sendMessage.pending, (state, action) => {
    //   state.isMessageSent = false;
    // });
  },
});
export const { changeSelectedChat, toggleLoading } = messagesSlice.actions;
export default messagesSlice.reducer;
