import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postOneTopic } from '../../store/topics';

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

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  width: 50%;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  padding: 2px;
  width: 100%;
`;

const animalsList = ['Aardvark', 'Anteater', 'Aligator',
                'Bison', 'Buffalo', 'Bull', 'Bunny', 'Baboon',
                'Cat', 'Cougar', 'Chicken', 'Capybara', 'Camel', 'Coyote',
                'Dog', 'Deer', 'Dolphin', 'Duck', 'Dodo',
                'Elephant', 'Eagle', 'Eel', 'Echidna', 'Emu',
                'Falcon', 'Fox', 'Frog', 'Ferret', 'Flamingo',
                'Gorilla', 'Giraffe', 'Guinea Pig', 'Gopher',
                'Hare', 'Heron', 'Hedgehog', 'Hyena', 'Hippopotamus',
                'Impala', 'Iguana', 'Insect',
                'Jackal', 'Jaguar', 'Jellyfish',
                'Kangaroo', 'Kiwi', 'Koala',
                'Lemur', 'Lion', 'Liger', 'Lobster', 'Lynx', 'Llama', 'Lemming', 'Leopard',
                'Magpie', 'Manatee', 'Mole', 'Muskrat', 'Moose', 'Mule',
                'Narwhal', 'Newt',
                'Ocelot', 'Octopus', 'Oyster', 'Otter', 'Ostrich',
                'Panther', 'Pheasant', 'Porcupine', 'Puffin', 'Penguin', 'Pig', 'Possum', 'Python',
                'Quail', 'Quokka', 'Quetzal',
                'Rabbit', 'Rattlesnake', 'Racoon', 'Rat', 'Reindeer',
                'Sea Lion', 'Shark', 'Sloth', 'Snake', 'Squid', 'Skunk', 'Squirrel',
                'Tasmanian Devil', 'Turkey', 'Turtle', 'Toucan', 'Tiger',
                'Vulture',
                'Wallaby', 'Warthog', 'Walrus', 'Weasel', 'Wombat', 'Wolf', 'Wildebeest',
                'Yak',
                'Zebra']

const colorsList = [
  'White', 'Yellow', 'Fuchsia', 'Red', 'Silver', 'Gray', 'Olive', 'Purple', 'Maroon',
  'Aqua', 'Lime', 'Teal', 'Green', 'Blue', 'Navy', 'Black', 'Brown', 'Pearl'
]

const generateNickname = () => {
  return colorsList[Math.floor(Math.random() * colorsList.length)] + ' ' + animalsList[Math.floor(Math.random() * animalsList.length)]
}

export default function NewEmotivation() {

  const [nickname, setNickname] = useState(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const user = useSelector(state => state.session.id)
  const dispatch = useDispatch();

  useEffect(() => {
    setNickname(generateNickname())
  }, [])

  const submitForm = (e) => {
    e.preventDefault();
    const formData = {
      name: topic,
      description: description,
      author_id: user,
      author_nickname: nickname
    }
    dispatch(postOneTopic(formData))
  }

  return (
    <PageWrapper>
      <MainComponent>
        <p>What do you want to discuss?</p>
        <Form method='post' action='/new'>
        <FormRow>
          <>
          <button
            onClick={e => {
              e.preventDefault();
              setNickname(generateNickname());
            }}>Generate Nickname</button>
          </>
          <input disabled={true} value={nickname}/>
        </FormRow>
        <FormRow>
          <label for='topic'>Topic</label>
          <input
          name='topic'
          value={topic}
          onChange={e => setTopic(e.target.value)}/>
        </FormRow>
        <FormRow>
          <label for='details'>Details</label>
          <textarea
          name='details'
          value={description}
          onChange={e => setDescription(e.target.value)} />
        </FormRow>

        <SubmitButton
        onClick={submitForm}>Submit</SubmitButton>
        </Form>
      </MainComponent>
    </PageWrapper>
  )
}
