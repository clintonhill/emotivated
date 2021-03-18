import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'
import { MainComponent, PageWrapper } from '../styles'
import TopicRow from './TopicRow'
import {getTopicsPage} from '../../store/topics'

const Topics = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function BrowsePage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const topics = useSelector(state => state.topics)

  const nextPage = () => {
    setPage((prev) => prev + 1);
  }

  const fetchTopicPage = (page) => {
    dispatch(getTopicsPage(page))
  }

  function onChange(isVisible) {
    if(isVisible) {
      nextPage();
    }
  }

  useEffect(() => {
    fetchTopicPage(page)
  }, [page])

  return (
    <PageWrapper>
      <MainComponent>
        <Topics>
          {Object.values(topics).map(topic => <TopicRow topic={topic}/>)}

          <VisibilitySensor onChange={onChange}>
            <div>.</div>
          </VisibilitySensor>
        </Topics>
        {/* <Navigation>
          <button>Prev</button>
          <button>Next</button>
        </Navigation> */}
      </MainComponent>
    </PageWrapper>
  )
}
