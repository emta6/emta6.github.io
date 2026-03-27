
const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings
const characters = ["Rosie O'Farrell", "Meredith Case", "Becky Schmitz"];

const places = ["AMBER House", "Key West", "Moab"];

const events = ["got a tramp stamp", "kissed a czech Electrician", "went swimming",];

// Willy the Goblin
// Big Daddy
// Father Christmas

// the soup kitchen
// Disneyland
// the White House

// spontaneously combusted
// melted into a puddle on the sidewalk
// turned into a slug and slithered away

// Partial return random string function

function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `We were all napping on the boat, so ${randomCharacter} went for a walk. When they got to ${randomPlace}, they giggled once they reached their destination, and then ${randomEvent}. Bob saw the whole thing, but was not surprised —  ${randomCharacter} is a crazy girl, and she was hungover.`;

  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();
  
  if (customName.value !== "") {
    const name = customName.value;
    newStory= newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300/14)} stone`;
    const temperature = `${Math.round((94 - 32) * (5/14))} Celsius`;
    newStory = newStory.replace("120 pounds", weight);
    newStory = newStory.replace("70 Fahrenheit", temperature);
  }

  // TODO: replace "" with the correct expression
  story.textContent = newStory;
  story.style.visibility = "visible";
}

