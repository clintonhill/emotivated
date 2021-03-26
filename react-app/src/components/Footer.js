import styled from 'styled-components'
import {useState} from 'react'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'
const IMAGE_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/images'

const Circle = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/1F917.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 700px;
  height: 700px;
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  filter: blur(${props => props.open ? 0 : 8}px) opacity(${props => props.open ? 100:40}%);
  transform: translate(-50%, ${props => props.open ? -50:30}%);
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: xx-large;
  font-weight: bolder;
  font-family: sans-serif;
  color: white;
  -webkit-text-stroke: 1px black;
  transition: all 2s ease-in;
`;

const InnerCircle = styled.div`
    border-radius: 50%;
    width: 50%;
    height: 50%;
    cursor: pointer;
`;

const SocialLink = styled.div`
  background-image: url("${process.env.PUBLIC_URL}${IMAGE_FOLDER}/${props => props.src}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100px;
  width: 100px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px gray;
    box-sizing: border-box;
  }
`;

const SocialRow = styled.div`
  display: flex;
  background-color: ${props => props.theme.accent};
  border-radius: 5px;
  box-shadow: 0 0 5px gray;
  padding: 5px;
`;


export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <Circle open={open}>
      <InnerCircle onClick={() => setOpen((prev) => !prev)}/>
      Application by Clinton Hill
      <SocialRow>
      <SocialLink src={'linkedIn_PNG9.png'} onClick={event =>  window.location.href='https://www.linkedin.com/in/clinton-hill-4438a0205/'}/>
      <SocialLink src={'github1600.png'} onClick={event =>  window.location.href='https://github.com/clintonhill'}/>
      <SocialLink src={'angellist-512.png'} onClick={event =>  window.location.href='https://angel.co/u/clinton-hill'}/>
      <SocialLink src={'1200px-Gmail_icon_(2020).png'} onClick={event =>  window.location.href='mailto:clint.hill07@gmail.com'}/>
      </SocialRow>
    </Circle>
  );
}
