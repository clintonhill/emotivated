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

const Sticker = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/${props => props.emojiId}");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  flex: 0 0 10%;
  filter: ${props=> props.owned ? '': 'grayscale(100%) brightness(25%)'};
  &:hover {
    cursor: pointer;
    border: 1px black solid;
  }
`;

export default function StickerContainer() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!active) return;

    const closeMenu = () => {
      setActive(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [active]);

  return (
    <>
    <Overlay active={active}/>
    <Wrapper>
      <Tab onClick={()=> setActive(!active)}>Sticker Collection</Tab>
    </Wrapper>
    </>
  )
}
