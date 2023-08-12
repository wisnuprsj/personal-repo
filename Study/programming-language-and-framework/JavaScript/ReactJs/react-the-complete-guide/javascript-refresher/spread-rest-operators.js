const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];

console.log(newNumbers);

const person = {
  name: "Wisnu",
};

const newPerson = {
  ...person,
  age: 27,
};

console.log(newPerson);

const filter = (...args) => {
  return args.filter((arg) => arg === 1);
};

console.log(filter(1, 2, 3, 4, 1));
