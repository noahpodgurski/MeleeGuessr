export const Greetings = ['Over 4000 clips!', 'Test yourself!', 'MELEEEEEEEE!', "Guess!"]

export const randomGreeting = () => {
  return Greetings[Math.floor(Math.random() * Greetings.length)]
}