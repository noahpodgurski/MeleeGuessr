export const Greetings = [
  "Over 4000 clips!",
  "Test yourself!",
  "MELEEEEEEEE!",
  "Guess the player!!",
  "Survival!",
  "BREAKK the targets!!",
  "Nice back air",
  "FIYAAAAHHHH!",
  "Mango! Mango! Mango!",
  "Don't get hit",
  "No Johns",
];

export const randomGreeting = () => {
  return Greetings[Math.floor(Math.random() * Greetings.length)];
};
