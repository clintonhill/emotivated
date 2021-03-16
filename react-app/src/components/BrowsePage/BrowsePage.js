import styled from 'styled-components'
import { MainComponent, PageWrapper } from '../styles'
import TopicRow from './TopicRow'

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
  return (
    <PageWrapper>
      <MainComponent>
        <Topics>
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
          <TopicRow />
        </Topics>
        {/* <Navigation>
          <button>Prev</button>
          <button>Next</button>
        </Navigation> */}
      </MainComponent>
    </PageWrapper>
  )
}
