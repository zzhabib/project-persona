const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


let worldView = 'Charachter is a cowboy at his hometown bar and is delighted to see you';
let personalityTraits = 'brash and enthusiastic';
let actions = 'buy you a drink, get annoyed and walk away';
let userTraits = 'old friend of the cowboy who has come into town after a long time away';

const prompt = `
    you are simulating a character in a game, \n
    this character has the following worldview: ${worldView}
    'this character has the following personality traits: ${ personalityTraits }
    this character is allowed to perform the following actions:  ${ actions }
    this character can freely respond with a response and can also give an action if appropriate.
    the character must also respond in accordance with their personality traits and world view.
    For the rest of this conversation, please respond in a json format with the characters response as well as the characters action to the inputs given
    from a user with the following traits 
    User Traits: ${userTraits}
`;


async function RunPrompt() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0,
  });

  console.log(completion.choices[0].text);
}
module.exports = { RunPrompt };