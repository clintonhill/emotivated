import styled from 'styled-components';
import openmoji from 'openmoji'
import faker from 'faker'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const MainComponent = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 5px gray;
`;

const StickerContainer = styled.div`
  background-color: ${props => props.theme.accent};
  width: 100%;
  height: 15%;
  border-radius: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-wrap: no-wrap;
`;

const Sticker = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/${props => props.emojiId}.svg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  flex: 0 0 10%;
  &:hover {
    cursor: pointer;
    border: 1px black solid;
  }
`;

const ProfileContainer = styled.div`
  height: 75%;
  width: 100%;
  `;

  const ProfileTop = styled.div`
    display:flex;
    align-items: center;
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
`;

const Blurb = styled.h3`
  margin: 25px;
`;

const testEmojis = [openmoji.openmojis[0].hexcode, openmoji.openmojis[1].hexcode, openmoji.openmojis[2].hexcode, openmoji.openmojis[3].hexcode,
                    openmoji.openmojis[4].hexcode, openmoji.openmojis[5].hexcode, openmoji.openmojis[6].hexcode, openmoji.openmojis[7].hexcode,
                    openmoji.openmojis[8].hexcode, openmoji.openmojis[9].hexcode, openmoji.openmojis[10].hexcode, openmoji.openmojis[11].hexcode,
                    openmoji.openmojis[12].hexcode, openmoji.openmojis[13].hexcode, openmoji.openmojis[14].hexcode, openmoji.openmojis[15].hexcode,
                    openmoji.openmojis[0].hexcode, openmoji.openmojis[1].hexcode, openmoji.openmojis[2].hexcode, openmoji.openmojis[3].hexcode,
                    openmoji.openmojis[4].hexcode, openmoji.openmojis[5].hexcode, openmoji.openmojis[6].hexcode, openmoji.openmojis[7].hexcode,
                    openmoji.openmojis[8].hexcode, openmoji.openmojis[9].hexcode, openmoji.openmojis[10].hexcode, openmoji.openmojis[11].hexcode,
                    openmoji.openmojis[12].hexcode, openmoji.openmojis[13].hexcode, openmoji.openmojis[14].hexcode, openmoji.openmojis[15].hexcode,]

export default function ProfilePage() {

  const user = {
    username: 'Demo-Testman',
    sticker_id: 49,
    blurb: faker.lorem.paragraph(),
    kudos: 43,
  }
  return (
    <PageWrapper>
      <MainComponent>
        <StickerContainer>
            {testEmojis?.map(emoji => <Sticker emojiId={emoji}/>)}
        </StickerContainer>
        <ProfileContainer>
          <ProfileTop>
            <ProfilePicture emojiId={openmoji.openmojis[user.sticker_id].hexcode}/>
            <UserName>{user.username}</UserName>
            <Kudos><span>{user.kudos}</span></Kudos>
          </ProfileTop>
          <Blurb>{user.blurb}</Blurb>
        </ProfileContainer>
      </MainComponent>
    </PageWrapper>
  );
}
