import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import openmoji from 'openmoji'
import StickerContainer from './StickerContainer'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../store/user';
import { getAllStickers } from '../../store/stickers';
import { MainComponent, PageWrapper } from '../styles'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  `;

  const ProfileTop = styled.div`
    display:flex;
    align-items: center;
    margin-top: 20px
  `;

const ProfilePicture = styled.div`
  height: 100px;
  width: 100px;
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/${props => props.emojiId}.svg");
  background-position: center;
  background-repeat: no-repeat;
`;

const UserName = styled.h1`
  flex-grow: 1;
`;

const Kudos = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/1F31F.svg");
  background-position: center;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const Blurb = styled.h3`
  margin: 25px;
`;

export default function ProfilePage() {

  const { userId } = useParams();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session)
  let user = useSelector(state => state.user[userId === 'me' ? session.id : userId])
  let stickers = useSelector(state => state.sticker)
  let allStickers = useRef();;

  useEffect(() => {
    let numId = userId === 'me' ? session.id : userId;
    dispatch(getProfileUser(numId))
  }, [dispatch, userId, session.id])

  useEffect(() => {
    dispatch(getAllStickers())
    allStickers.current = Object.keys(stickers).map(stickerId => stickers[stickerId].path)
    console.log(allStickers)
  }, [dispatch])

  // const user = {
  //   username: 'Demo-Testman',
  //   sticker_id: 866,
  //   blurb: faker.lorem.paragraph(),
  //   kudos: 43,
  // }
  if(!user) return null;
  return (
    <PageWrapper>
      <MainComponent>
        <StickerContainer allStickers={stickers} userStickers={user.stickers}>
            {/* {allStickers?.current?.map(sticker => <Sticker emojiId={sticker} owned={Math.random() < 0.5} />)} */}
        </StickerContainer>
        <ProfileContainer>
          <ProfileTop>
            <ProfilePicture emojiId={openmoji.openmojis[user.sticker_id].hexcode}/>
            <UserName>{user.username}</UserName>
            <Kudos><span>{user.kudos}</span></Kudos>
          </ProfileTop>
          <Blurb>{user.profile_blurb}</Blurb>
        </ProfileContainer>
      </MainComponent>
    </PageWrapper>
  );
}
