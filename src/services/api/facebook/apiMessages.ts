import { axiosMain } from '../..';
import { objToFormData } from '../../../helpers/api';

interface IParamMessageContent {
  receiverId: any;
  messageText: string;
  messageAttachment?: any[];
}

const baseUrl = 'facebook/messages/';
export const apiMessages = {
  getAllConversations: (pageId: number | string) => {
    const url = baseUrl + 'allConversations/' + pageId;
    return axiosMain.get(url);
  },
  getConversationDetail: (threadId: number | string) => {
    const url = baseUrl + 'detail/' + threadId;
    return axiosMain.get(url);
  },
  sendMessage: (params: IParamMessageContent) => {
    const url = baseUrl + 'sendMessage';
    return axiosMain.post(url, objToFormData(params));
  },
  getQuickReply: (pageId: number | string) => {
    const url = 'facebook/quickReplies/' + pageId;
    return axiosMain.get(url);
  },
  updateQuickReply: (id: any, data: any) => {
    const url = 'facebook/quickReplies/' + id;
    return axiosMain.patch(url, data);
  },
  deleteQuickReply: (data: any) => {
    const url = 'facebook/quickReplies';
    return axiosMain.delete(url, data);
  },
  addQuickReply: (data: any) => {
    const url = 'facebook/quickReplies/addNew';
    return axiosMain.post(url, data);
  },
  getAutoReply: (pageId: number | string) => {
    const url = 'facebook/recommendations/' + pageId;
    return axiosMain.get(url);
  },
  updateAutoReply: (id: any, data: any) => {
    const url = 'facebook/recommendations/' + id;
    return axiosMain.patch(url, data);
  },
  deleteAutoReply: (data: any) => {
    const url = 'facebook/recommendations';
    return axiosMain.delete(url, data);
  },
  addAutoReply: (data: any) => {
    const url = 'facebook/recommendations/addNew';
    return axiosMain.post(url, data);
  },
  updateGreeting: (data: any) => {
    const url = baseUrl + 'turnOnGreeting';
    return axiosMain.post(url, data);
  },
  getGreeting: () => {
    const url = baseUrl + 'getGreeting';
    return axiosMain.get(url);
  },
  turnOnGreeting: (data: any) => {
    const url = baseUrl + 'turnOnGreeting';
    return axiosMain.post(url, data);
  },
  turnOffGreeting: () => {
    const url =  baseUrl + 'turnOffGreeting';
    return axiosMain.get(url);
  },
  getCustomerInfo: (threadId: number | string) => {
    const url = 'facebook/customerInfo/' + threadId ;
    return axiosMain.get(url);
  },
  updateCustomerInfo: (data: any, threadId: number | string) => {
    const url = 'facebook/customerInfo/' + threadId;
    return axiosMain.patch(url, data);
  },
};
