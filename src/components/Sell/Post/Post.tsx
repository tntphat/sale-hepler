import { IEmojiData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { SvgDate, SvgImg } from '../../../assets/svg';
import { Template } from '../../../containers';
import { useDraggable, useModalLoading } from '../../../hooks';
import { useAppSelector } from '../../../redux';
import {
  Box,
  CheckBox,
  DateTimePicker,
  Divider,
  EmojiPicker,
  GridLayoutTwoCol,
  HorizontalMedias,
  Item,
  Modal,
  ScrollHorizontal,
  TextArea,
} from '../../common';
import { Button } from '../../common/Button/Button';
import { ListNetWork } from '../SelectNetwork/SelectNetwork';
import { Templates } from '../Templates/Templates';
import './Post.scss';

type TypePost = {
  handlePost: (value: { text: string; image: any }) => void;
  selectedGroups: IResGroup[];
  setSelectedGroups: React.Dispatch<React.SetStateAction<Array<IResGroup>>>;
  product?: any;
  isBuyer?: boolean;
};

export const Post: React.FC<TypePost> = ({ handlePost, selectedGroups, product, isBuyer }) => {
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const [value, setValue] = useState('');
  const refImage = useRef<HTMLInputElement | any>(null);
  const [images, setImages] = useState<any>(product?.images || []);
  const [time, setTime] = useState();
  const { user } = useAppSelector((state) => state.authSlice);

  // const refScroll = useDraggable();
  // const [previewImages, setPreviewImages] = useState<any>([]);
  // const [currentPositionCursor, setCurrentPositionCursor] = useState(0);
  const [cursorPos, setCursorPos] = useState();
  const [schedule, setSchedule] = useState<string>('');
  const [openSchedule, setOpenSchedule] = useState<boolean>(false);
  const [openTemplates, setOpenTemplates] = useState<boolean>(false);

  const handleClickEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    event.stopPropagation();
    refArea.current?.focus();

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

  return (
    <GridLayoutTwoCol className="post">
      <Box classname="post__create" title="Tạo bài đăng">
        <Modal
          isOpen={openTemplates}
          setIsOpen={setOpenTemplates}
          className="post__modal-templates"
        >
          {/* <TableProduct setProduct={setProduct} setIsOpen={setOpenTemplates} /> */}
          <div className="post__modal-title">
            <h4>Chọn bài đăng mẫu</h4>
          </div>
          <Template
            isHideAdd
            setOpenTemplates={setOpenTemplates}
            product={product}
            setValue={setValue}
          />
        </Modal>
        {!isBuyer && (
          <Button className="post__btn-template" onClick={() => setOpenTemplates(true)}>
            Chọn bài đăng mẫu
          </Button>
        )}
        <Item image={user.picture} subName={user.name} width={50} />

        <TextArea className="post__textarea" ref={refArea} value={value} onChange={handleChange} />
        <EmojiPicker onClickEmoji={handleClickEmoji} refArea={refArea} />

        <HorizontalMedias
          images={images}
          setImages={setImages}
          ref={refImage}
          className="post__medias"
        />

        <div className="post__add">
          <span>Chèn vào bài viết</span>
          <div onClick={() => refImage.current?.click()}>
            <SvgImg />
          </div>
        </div>
        {/* <div className="post__selected-gr">
          <p>Nhóm đã chọn ({selectedGroups.length}):</p>
          <div>
            {selectedGroups.map((item) => (
              <Box key={item.id}>
                <Item image={item.picture?.data?.url} name={item.name} isOval />
              </Box>
            ))}
          </div>
        </div> */}
      </Box>

      <Box classname="post__select-group" title="Đăng bài">
        {/* <ListNetWork className="list-favorite-gr" title="Nhóm yêu thích" hideTickAll />

        <Divider margin="10px -18px 20px" />
        <ListNetWork className="list-favorite-gr" title="Nhóm yêu thích" hideTickAll /> */}
        <div className="post__selected-gr">
          <p>Nhóm đã chọn ({selectedGroups.length}):</p>
          <div>
            {selectedGroups.map((item) => (
              <Box key={item.id}>
                <Item image={item.picture?.data?.url} subName={item.name} isOval />
              </Box>
            ))}
          </div>
        </div>
        <div className="post__row">
          <Button
            onClick={() =>
              handlePost({
                content: value,
                images,
                ...(schedule && { schedulePostTime: time.getTime() }),
              })
            }
            width="100%"
          >
            Đăng
          </Button>
          <Button
            width="80px"
            backgroundColor="#DFDFDF"
            // onClick={() => handleTest({ text: value, image })}
            className="post__btn-schedule"
            onClick={() => {
              setOpenSchedule(true);
            }}
          >
            <SvgDate />
            <div className="post__schedule" style={{ display: openSchedule ? 'block' : 'none' }}>
              <div className="post__schedule-option" onClick={() => setSchedule('')}>
                <CheckBox isActive={!schedule} />
                <span>Đăng ngay bây giờ</span>
              </div>
              <div className="post__schedule-divider" />
              <div className="post__schedule-option" onClick={() => setSchedule('1')}>
                <CheckBox isActive={!!schedule} />
                <span>Lịch trình</span>
              </div>
              {schedule ? <DateTimePicker onChange={setTime} /> : null}
              <Button
                className="post__schedule-btn"
                width="100%"
                onClick={(e) => {
                  e?.stopPropagation();
                  setOpenSchedule(false);
                }}
              >
                Xác nhận
              </Button>
            </div>
          </Button>
        </div>
      </Box>
    </GridLayoutTwoCol>
  );
};
