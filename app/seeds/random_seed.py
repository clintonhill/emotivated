import random

animals_list = ['Aardvark', 'Anteater', 'Aligator',
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

color_list = [
  'White', 'Yellow', 'Fuchsia', 'Red', 'Silver', 'Gray', 'Olive', 'Purple', 'Maroon',
  'Aqua', 'Lime', 'Teal', 'Green', 'Blue', 'Navy', 'Black', 'Brown', 'Pearl'
]

def get_color():
  index = random.randint(0, len(color_list) - 1)
  return color_list[index]

def get_animal():
  index = random.randint(0, len(animals_list) - 1)
  return animals_list[index]

def get_random_name():
  return get_color() + ' ' + get_animal()
