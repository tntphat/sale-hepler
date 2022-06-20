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
    const conversations = await apiMessages.getConversationDetail(threadId);
    return {
      data: conversations,
      param: threadId,
    };
  },
);

export const sendMessage = createAsyncThunk('chat/sendMessage', async (params: any) => {
  return apiMessages.sendMessage(params);
});

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
      const selectedConversation = state.directMessages?.find(
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
      state.directMessages = action.payload?.data.data;
      state.myInfo = state.directMessages[0]?.participants?.data[1];
      state.loading = false;
      state.unSeen = state.directMessages.some((directMessage: any) => {
        return directMessage.isRead === false;
      });
    });
    builder.addCase(getAllConversations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChatUserConversations.fulfilled, (state, action) => {
      const threadId = action.payload.param;
      let unReadConversations = state.directMessages.filter((item: any) => {
        return item.isRead === false;
      });
      unReadConversations = unReadConversations.map((item: any) => {
        return item.id;
      });
      const isReadUnseen = unReadConversations.includes(threadId);
      if (isReadUnseen) {
        const tmpDirectMessages = state.directMessages.map((message: any) => {
          return message.id === threadId
            ? {
                ...message,
                isRead: true,
              }
            : message;
        });
        state.directMessages = tmpDirectMessages;
        state.unSeen = false;
      }
      state.chatUserConversations = action.payload?.data.data;
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
