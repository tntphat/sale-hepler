import React, { useState } from 'react';
import { Box, Item, ScrollHorizontal } from '../../components/common';
import { useDraggable } from '../../hooks';
import { doSetModalMedia, useAppDispatch } from '../../redux';
import './DetailPost.scss';

export const DetailPost = () => {
  const refScroll = useDraggable();
  const [isExtended, setIsExtended] = useState(false);
  const dispatch = useAppDispatch();
  const handleOpenMedia = (media: any) => {
    dispatch(doSetModalMedia(media));
  };
  return (
    <Box title="Bài viết" classname="detail-post">
      <Item
        image="https://cdn.pixabay.com/photo/2022/02/14/02/39/animal-7012354__340.jpg"
        subName="Phat To"
        width={50}
      />

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam recusandae labore voluptas
        incidunt quaerat! Mollitia excepturi ex ipsam libero magnam earum quas id? Iure, amet.
        Cumque rem neque esse in quia doloremque perspiciatis harum iusto necessitatibus, et sit
        corrupti consectetur cupiditate vero autem. Dolore enim animi delectus, ullam non accusamus
        obcaecati blanditiis maiores qui eligendi aspernatur ratione sit nisi id. Repellendus facere
        fuga eius, esse fugiat, accusamus quidem voluptatum repudiandae quam dolore porro velit
        incidunt autem alias unde natus exercitationem hic nulla blanditiis est, ab optio
        necessitatibus! Debitis, aut nostrum. Nulla laudantium, officiis exercitationem quia quam
        iste numquam! Aspernatur mollitia obcaecati neque nobis? Aliquid rem impedit quasi assumenda
        delectus officia maiores nesciunt ipsa laudantium. Expedita corporis dicta cum quas mollitia
        nisi quo distinctio similique id dolorum ratione soluta tempora, voluptate debitis. Facilis
        deleniti quibusdam facere officiis, eum est voluptates veniam consectetur omnis odit
        corporis ex nulla nisi amet vel excepturi recusandae nihil quod accusantium accusamus
        assumenda. Eaque, odit vitae mollitia commodi a necessitatibus modi maiores provident
        placeat. Dolore libero eaque delectus beatae. Fugiat ipsa distinctio fugit corrupti,
        excepturi accusamus amet! Dignissimos, ducimus non eaque eos voluptate vel esse nulla
        voluptatibus perferendis, maxime, quae temporibus quis amet voluptates veritatis minima
        quod!
      </p>
      <ScrollHorizontal ref={refScroll} className={'horizontal-medias'}>
        {[...Array(8).keys()].map((key) => (
          <div
            key={key}
            onClick={() =>
              handleOpenMedia(
                'https://cdn.pixabay.com/photo/2021/11/17/16/59/mountain-6804152__340.jpg',
              )
            }
          >
            <img
              src="https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=7552209868152598&width=1024&ext=1652280726&hash=AeRCIfrlq50pLtzRl-Q"
              // style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
            {/* <div className="close-wrapper" onClick={() => handleRemoveImage(ind)}>
                <SvgClose />
              </div> */}
          </div>
        ))}
      </ScrollHorizontal>
    </Box>
  );
};
