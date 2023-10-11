import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


let worldView = '';
let personalityTraits = '';
let actions = '';
let quests = '';
let userTraits = '';

let prompt = {
  "you are simulating a character in a game,\n" +
    "this character has the following personality traits: " + personalityTraits + "\n" +
    "this character is allowed to perform the following actions: " + actions + "\n" +
    "this character can freely respond with a response an must also give an action" +
    "the character must also respond in accordance with their personality traits and world view." +
    "For the rest of this conversation, please respond in a json format with the characters response as well as the characters action to the inputs given" +
    "from a user with the following traits \n" +
    "User Traits: " + userTraits
};




export default async function RunPrompt() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: {prompt},
    max_tokens: 7,
    temperature: 0,
  });

  console.log(completion.choices[0].text);
}
