import { dataFieldsTemplate, dataFieldsTemplateReverse } from '../constants';

export const convertTextToTemplate = (string: string) => {
  let newString = '';
  let start = -1;
  for (let i = 0; i < string.length; ++i) {
    if (string[i] === '<') {
      start = i + 1;
      continue;
    }
    if (string[i] === '>') {
      newString += '<' + dataFieldsTemplateReverse[string.substring(start, i)] + '>';
      start = -1;
      continue;
    }
    if (start === -1) newString += string[i];
  }

  return newString;
};

export const convertTemplateToText = (string: string, title?: string, isGenerateBold = false) => {
  let newString = title ? `<h3> ${title} </h3>` : '';
  let start = -1;
  for (let i = 0; i < string.length; ++i) {
    if (string[i] === '<') {
      start = i + 1;
      continue;
    }
    if (string[i] === '>') {
      newString +=
        (isGenerateBold ? '<b> ' : '<') +
        dataFieldsTemplate[string.substring(start, i)] +
        (isGenerateBold ? ' </b>' : '>');
      start = -1;
      continue;
    }
    if (start === -1) newString += string[i];
  }
  return newString;
};

export const handleLinkToFbPost = (id: string) => {
  const [grId, postId] = id.split('_');
  window.open(`https://www.facebook.com/groups/${grId}/posts/${postId}`, '_blank');
};
