import { IEmojiData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { SvgDate, SvgImg } from '../../../assets/svg';
import { Box, Divider, EmojiPicker, Item } from '../../common';
import { Button } from '../../common/Button/Button';
import { ListNetWork } from '../SelectNetwork/SelectNetwork';
import './Post.scss';

type TypePost = {
  handlePost: (value: string) => void;
  selectedGroups: IResGroup[];
  setSelectedGroups: React.Dispatch<React.SetStateAction<Array<IResGroup>>>;
};

export const Post: React.FC<TypePost> = ({ handlePost, selectedGroups }) => {
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const [value, setValue] = useState('');
  // const [currentPositionCursor, setCurrentPositionCursor] = useState(0);
  const [cursorPos, setCursorPos] = useState();

  const handleClickEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    event.stopPropagation();
    refArea.current?.focus();
    console.log(emojiObject.emoji);

    const ref = refArea.current;
    const start = ref.value.substring(0, ref.selectionStart);
    const end = ref.value.substring(ref.selectionStart);
    const finalText = start + emojiObject.emoji + end;
    setValue(finalText);
    setCursorPos(start.length + emojiObject.emoji.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    refArea.current.selectionEnd = cursorPos;
  }, [cursorPos]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  function textAreaAdjust() {
    refArea.current.style.height = '1px';
    refArea.current.style.height = 25 + refArea.current.scrollHeight + 'px';
  }

  return (
    <div className="post">
      <Box classname="post__create" title="Tạo bài đăng">
        <Item
          image="https://cdn.pixabay.com/photo/2022/02/14/02/39/animal-7012354__340.jpg"
          subName="Phat To"
          width={50}
        />
        <textarea
          onKeyUp={textAreaAdjust}
          name=""
          ref={refArea}
          value={value}
          onChange={handleChange}
          className="post__textarea"
          placeholder="Hãy viết gì đó..."
        />
        {/* <div
          ref={refArea}
          // onChange={(e) => console.log(e)}
          // onInput={(e) => {
          // }}
          onKeyUp={() => {
            const { baseOffset } = window.getSelection();
            // console.log(baseOffset, anchorOffset, extentOffset, focusOffset);

            setCurrentPositionCursor(baseOffset);
          }}
          contentEditable="true"
          className="post__textarea"
          data-ph="My Placeholder String"
        /> */}
        <EmojiPicker onClickEmoji={handleClickEmoji} refArea={refArea} />
        <div className="post__add">
          <span>Chèn vào bài viết</span>
          <div>
            <SvgImg />
          </div>
        </div>
        <div className="post__selected-gr">
          <p>Nhóm đã chọn ({selectedGroups.length}):</p>
          <div>
            {selectedGroups.map((item) => (
              <Box key={item.id}>
                <Item
                  image="https://cdn.pixabay.com/photo/2022/02/14/02/39/animal-7012354__340.jpg"
                  name={item.name}
                  isOval
                />
              </Box>
            ))}
          </div>
        </div>
      </Box>

      <Box classname="post__select-group" title="Chọn nhóm">
        <ListNetWork className="list-favorite-gr" title="Nhóm yêu thích" hideTickAll />

        <Divider margin="10px -18px 20px" />
        <ListNetWork className="list-favorite-gr" title="Nhóm yêu thích" hideTickAll />

        <div className="post__row">
          <Button onClick={() => handlePost(value)} width="100%">
            Đăng
          </Button>
          <Button width="80px" backgroundColor="#DFDFDF">
            <SvgDate />
          </Button>
        </div>
      </Box>
    </div>
  );
};
