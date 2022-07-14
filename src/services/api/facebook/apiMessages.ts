import { axiosMain } from '../..';
import { objToFormData } from '../../../helpers/api';

interface IParamMessageContent {
  receiverId: any;
  messageText: string;
  messageAttachment?: any[];
}

const baseUrl = 'message/';
export const apiMessages = {
  getAllConversations: (pageId: number | string) => {
    const url = baseUrl + 'messages/allConversations/' + pageId;
    return axiosMain.get(url);
  },
  getConversationDetail: (threadId: number | string) => {
    const url = baseUrl + 'messages/detail/' + threadId;
    return axiosMain.get(url);
  },
  sendMessage: (params: IParamMessageContent) => {
    const url = baseUrl + 'messages/sendMessage';
    return axiosMain.post(url, objToFormData(params));
  },
  getQuickReply: (pageId: number | string) => {
    const url = baseUrl + 'quickReplies/' + pageId;
    return axiosMain.get(url);
  },
  updateQuickReply: (id: any, data: any) => {
    const url = baseUrl + 'quickReplies/' + id;
    return axiosMain.patch(url, data);
  },
  deleteQuickReply: (data: any) => {
    const url = baseUrl + 'quickReplies';
    return axiosMain.delete(url, data);
  },
  addQuickReply: (data: any) => {
    const url = baseUrl + 'quickReplies/addNew';
    return axiosMain.post(url, data);
  },
  sendQuickReply: (data: any) => {
    const url = baseUrl + 'quickReplies/sendMessage';
    return axiosMain.post(url, data);
  },
  getAutoReply: (pageId: number | string) => {
    const url = baseUrl + 'recommendations/' + pageId;
    return axiosMain.get(url);
  },
  updateAutoReply: (id: any, data: any) => {
    const url = baseUrl + 'recommendations/' + id;
    return axiosMain.patch(url, data);
  },
  deleteAutoReply: (data: any) => {
    const url = baseUrl + 'recommendations';
    return axiosMain.delete(url, data);
  },
  addAutoReply: (data: any) => {
    const url = baseUrl + 'recommendations/addNew';
    return axiosMain.post(url, data);
  },
  updateGreeting: (data: any) => {
    const url = baseUrl + 'messages/turnOnGreeting';
    return axiosMain.post(url, data);
  },
  getGreeting: () => {
    const url = baseUrl + 'messages/getGreeting';
    return axiosMain.get(url);
  },
  turnOnGreeting: (data: any) => {
    const url = baseUrl + 'messages/turnOnGreeting';
    return axiosMain.post(url, data);
  },
  turnOffGreeting: () => {
    const url = baseUrl + 'messages/turnOffGreeting';
    return axiosMain.get(url);
  },
  getCustomerInfo: (threadId: number | string) => {
    const url = baseUrl + 'customerInfo/' + threadId;
    return axiosMain.get(url);
  },
  updateCustomerInfo: (data: any, threadId: number | string) => {
    const url = baseUrl + 'customerInfo/' + threadId;
    return axiosMain.patch(url, data);
  },
};
