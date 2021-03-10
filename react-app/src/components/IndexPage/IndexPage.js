import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getOneTopic} from '../../store/topics'
import styled from 'styled-components'

const STICKER_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/stickers'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const MainComponent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 5px gray;
  background-color: #E8BA71;
  p {
    font-size: larger;
    font-weight: bold;
  }
`;

const SwipeWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SwipeComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 75%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: ${props => props.theme.accent};
  box-shadow: 3px 3px 5px gray;
  h3, h5, h6 {
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const SwipeRegionLeft = styled.div.attrs(props=> ({
  style: {
    filter: `opacity(${props.fill}%)`
  }
}))`
  height: 50%;
  width: 5%;
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/23EA.svg");
  background-color: red;
  border-radius: 15px 0 0 15px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SwipeRegionRight = styled.div.attrs(props=> ({
  style: {
    filter: `opacity(${props.fill}%)`
  }
}))`
  height: 50%;
  width: 5%;
  background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/23E9.svg");
  background-color: green;
  border-radius: 0 15px 15px 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CommentsContainer = styled.div`
  display: flex;
  width: 10%;
  height: 10%;
  align-items: center;
  justify-content: center;
`;

const CommentImage = styled.div`
    background-image: url("${process.env.PUBLIC_URL}${STICKER_FOLDER}/E248.svg");
    height: 100%;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
`;

const example = {
  topic: 'This is a topic that I feel down about, or need general advice on.',
  body: `Something really frustrating happened, and this is the contents of the post. I really would like some advice about this super frustrating thing. Thank you all for your kind words, and I'm looking forward to chatting with you all. You're all great. Sorry for rambling.`,
  username: 'Ignorant Ape',
  comments: 4
}

export default function IndexPage() {

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [topic, setTopic] = useState(null)
  const topicState = useSelector(state => state.topics)
  const dispatch = useDispatch();

  const SWIPE_SENSITIVITY = 200;

  const onTouchStart = (e) => {
    if(!e.targetTouches) return;
    setTouchStart(e.targetTouches[0].clientX);
  }
  const onTouchEnd = (e) => {
    if(touchDelta > SWIPE_SENSITIVITY)
      getNewTopic();
    if(touchDelta < - SWIPE_SENSITIVITY)
      console.log('Swiped Right')

    console.log(touchDelta/SWIPE_SENSITIVITY)
    setTouchDelta(0);
  }
  const onTouchMove = (e) => {
    if(!e.targetTouches) return;
    setTouchEnd(e.targetTouches[0].clientX);
    setTouchDelta(touchStart - touchEnd);
  }
  //Mouse control.
  const onMouseStart = (e) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  }
  const onMouseEnd = (e) => {
    if(touchDelta > SWIPE_SENSITIVITY)
      getNewTopic();
    if(touchDelta < - SWIPE_SENSITIVITY)
      console.log('Swiped Right')

    console.log(touchDelta/SWIPE_SENSITIVITY)
    setIsDragging(false);
    setTouchDelta(0);
  }
  const onMouseMove = (e) => {
    if(!isDragging) return;
    setTouchEnd(e.clientX);
    setTouchDelta(touchStart - touchEnd);
  }

  const getNewTopic = async () => {
    const topicId = await dispatch(getOneTopic());
    setTopic(topicId)
  }

  useEffect(() => {
    getNewTopic();
  }, [])

  const determineFill = isRight => {
    const base = 10;
    const percentageFilled = touchDelta/SWIPE_SENSITIVITY*100
    if(isRight) {
      if(percentageFilled < 0) {
        return Math.max(10, Math.abs(percentageFilled));
      }
      return base;
    }
    else {
      if(percentageFilled > 0) {
        return Math.max(10, percentageFilled);
      }
      return base;
    }
  }

  return (
    <PageWrapper>
      <MainComponent>
        <p>Swipe right to eMotivate!</p>
        <SwipeWrapper
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        >
        <SwipeRegionLeft
        fill={determineFill(false)}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseEnd}
          />
        <SwipeComponent
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseStart}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseEnd}
        >
          {topic && <h6>{topicState[topic].author_nickname}</h6>}
          {topic && <h3>{topicState[topic].name}</h3>}
          {topic && <h5>{topicState[topic].description}</h5> }
          <CommentsContainer>
            <CommentImage />
            <h6>{example.comments}</h6>
          </CommentsContainer>
        </SwipeComponent>
        <SwipeRegionRight fill={determineFill(true)}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        />
        </SwipeWrapper>
      </MainComponent>
    </PageWrapper>
  )
}
