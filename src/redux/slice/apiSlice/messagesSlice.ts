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
  loadingMessage: boolean;
  loadingConversation: boolean;
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
  loadingMessage: false,
  loadingConversation: false,
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
    toggleLoading2: (state) => {
      state.loading = !state.loading;
    },
    toggleLoadingConversation: (state) => {
      state.loadingConversation = !state.loadingConversation;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.fulfilled, (state, action) => {
      console.log('getall done');

      state.directMessages = action.payload?.data;
      state.myInfo = state.directMessages?.data[0].participants?.data[1];
      if (!state.selectedChat) {
        state.selectedChat = state.directMessages?.data[0].id;
        const selectedConversation = state.directMessages?.data.find(
          (conversation: any) => conversation.id === state.selectedChat,
        );
        const paticipants = selectedConversation.participants.data;
        state.chatUserDetails = paticipants.find((paticipant: any) => {
          return paticipant.id != state.myInfo.id;
        });
        getChatUserConversations(state.directMessages?.data[0].id);
      }
      state.loading = false;
    });
    // builder.addCase(getAllConversations.rejected, (state, action) => {
    //   const error = action.error;
    //   state.error = error;
    // });
    builder.addCase(getAllConversations.pending, (state, action) => {
      console.log('get all pending');

      state.loading = true;
    });
    builder.addCase(getChatUserConversations.fulfilled, (state, action) => {
      console.log('user conver done');

      state.chatUserConversations = action.payload?.data;
      // state.loadingConversation = false;
    });
    builder.addCase(getChatUserConversations.pending, (state, action) => {
      console.log('user cnver pending done');

      // state.loadingConversation = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      console.log('send done');
      state.isMessageSent = true;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      console.log('send pending');

      state.isMessageSent = false;
    });
  },
});
export const { changeSelectedChat, toggleLoading, toggleLoading2, toggleLoadingConversation } =
  messagesSlice.actions;
export default messagesSlice.reducer;