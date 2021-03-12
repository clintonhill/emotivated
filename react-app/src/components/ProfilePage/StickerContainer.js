import { useEffect, useState } from 'react';
import styled from 'styled-components'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const Wrapper = styled.div`
  width: 100%;
  height: 5%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Overlay = styled.div`
  height: ${props => props.active ? '80%' : '2%' };
  width: 80%;
  background-color: ${props => props.theme.accent};
  position: absolute;
  transition: all .5s ease-in;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tab = styled.div`
  background-color: ${props => props.theme.accent};
  height: 100%;
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-weight: bold;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
`;

const PrevPageRegion = styled.div`
  height: 100%;
  width: 5%;
  background-color: rgba(255, 255, 255, 0.212);
  display: ${props => props.active ? 'flex' : 'none'};
  cursor: pointer;
`;

const NextPageRegion = styled.div`
  height: 100%;
  width: 5%;
  background-color: rgba(255, 255, 255, 0.212);
  display: ${props => props.active ? 'flex' : 'none'};
  cursor: pointer;
`;

const StickerPanel = styled.div`
  width: 90%;
  height: 90%;
  display: ${props => props.active ? 'flex' : 'none'};
  align-items: flex-end;
  flex-wrap: wrap;
`

const Sticker = styled.svg`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/${props => props.emojiId}");
  height: 10%;
  background-position: center;
  background-repeat: no-repeat;
  flex: 0 0 10%;
  filter: ${props=> props.owned ? '': 'grayscale(100%) brightness(25%) opacity(50%)'};
  cursor: pointer;
`;

export default function StickerContainer({allStickers, userStickers}) {
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 50;

  useEffect(() => {
    if (!active) return;

    const closeMenu = () => {
      setActive(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [active]);

  const nextPage = (e) => {
    setPage((prev) => prev + 1);
    e.stopPropagation();
  }
  const prevPage = (e) => {
    setPage((prev) => prev - 1);
    e.stopPropagation();
  }

  const getInCollection = (stickerPath) => {
    const arr = [];
    for(let sticker of userStickers) {
      arr.push(sticker.path)
      // if(sticker.id === stickerId) {
      //   return true;
      // }
    }
    console.log(arr, stickerPath)
    return arr.includes(stickerPath)
  }

  return (
    <>
    <Overlay active={active}>
      <PrevPageRegion active={active} onClick={prevPage} disabled={page===1}/>
      <StickerPanel active={active}>
        { allStickers && Object.keys(allStickers).slice(PER_PAGE * (page - 1), PER_PAGE * page).map(stickerPath => {
        return <Sticker owned={getInCollection(allStickers[stickerPath].path)} emojiId={allStickers[stickerPath].path}/>
        })}
      </StickerPanel>
      <NextPageRegion active={active} onClick={nextPage}/>
    </Overlay>
    <Wrapper>
      <Tab onClick={()=> setActive(!active)}>Sticker Collection</Tab>
    </Wrapper>
    </>
  )
}
