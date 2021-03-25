import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'
import { MainComponent, PageWrapper } from '../styles'
import TopicRow from './TopicRow'
import {getPublishedPage} from '../../store/conversations'

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
  const published = useSelector(state => state.conversations)

  const nextPage = () => {
    setPage((prev) => prev + 1);
  }

  const fetchConversationsPage = (page) => {
    dispatch(getPublishedPage(page))
  }

  function onChange(isVisible) {
    if(isVisible) {
      nextPage();
    }
  }

  useEffect(() => {
    fetchConversationsPage(page)
  }, [page])

  return (
    <PageWrapper>
      <MainComponent>
        <Topics>
          {Object.values(published).map(conv => <TopicRow topic={conv}/>)}

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
