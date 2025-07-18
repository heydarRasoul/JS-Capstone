function getData() {
  return fetch("https://javascript-capstone-backend.onrender.com/users")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
    });
}

async function fetchPeopleName() {
  try {
    const persons = await getData();
    if (!persons?.length) return console.error("No users found");
    for (let i = 0; i < 5 && i < persons.length; i++) {
      const label = document.getElementById(`user${i + 1}`);
      if (label) label.innerText = `${persons[i].firstName}:`;
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

fetchPeopleName();

function updateValue(event) {
  const button = event.target;
  const counter = button.closest(".label-buttons");
  const valueSpan = counter.querySelector(".weight");
  let currentValue = Number(valueSpan.textContent);

  if (button.classList.contains("increase")) {
    currentValue += 1;
  } else if (button.classList.contains("decrease") && currentValue > 1) {
    currentValue -= 1;
  }
  valueSpan.textContent = currentValue;
}

async function getRandomPerson() {
  try {
    const persons = await getData();

    if (!persons?.length) return console.error("No users found");

    const weightedPersons = [];

    persons.forEach((person) => {
      const weightEl = document.querySelector(
        `.weight[data-id="${person.id}"]`
      );
      const weight = Number(weightEl.textContent);
      for (let i = 0; i < weight; i++) weightedPersons.push(person);
    });

    if (!weightedPersons.length) return console.warn("No weights found");

    const randomIndex = Math.floor(Math.random() * weightedPersons.length);
    const randomPerson = weightedPersons[randomIndex];
    return randomPerson;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

async function getData() {
  try {
    const res = await fetch(
      "https://javascript-capstone-backend.onrender.com/users"
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

async function fetchPeopleName() {
  const persons = await getData();
  if (!persons?.length) return console.error("No users found");

  persons.slice(0, 5).forEach((person, i) => {
    const label = document.getElementById(`user${i + 1}`);
    if (label) label.innerText = `${person.firstName}:`;
    console.log("firstName:", person.firstName);
  });
}
fetchPeopleName();

function updateValue(event) {
  const valueSpan = event.target
    .closest(".label-buttons")
    .querySelector(".weight");
  let value = Number(valueSpan.textContent);

  if (event.target.classList.contains("increase")) value++;
  else if (value > 1) value--;

  valueSpan.textContent = value;
}

async function getRandomPerson() {
  const persons = await getData();
  if (!persons?.length) return console.error("No users found");

  const weightedPersons = persons.flatMap((person) => {
    const weightEl = document.querySelector(`.weight[data-id="${person.id}"]`);
    const weight = weightEl ? Number(weightEl.textContent) : 0;
    return Array(weight).fill(person);
  });

  if (!weightedPersons.length) return console.warn("No weights found");

  const randomIndex = Math.floor(Math.random() * weightedPersons.length);
  const randomPerson = weightedPersons[randomIndex];
  console.log(randomPerson);
  return randomPerson;
}

async function spining() {
  const spinButton = document.querySelector(".spining");
  const luckyWinnerEl = document.getElementById("lucky-winner");
  const backImgEl = document.querySelector(".right-column");
  const leftColumn = document.querySelector(".left-column");

  spinButton.disabled = true;
  spinButton.classList.add("disabled");

  const person = await getRandomPerson();
  if (!person) return;

  const winnerEl = document.getElementById(person.firstName);
  luckyWinnerEl.innerText = `🎉  ${person.firstName} 🎉`;
  luckyWinnerEl.style.fontSize = "80px";
  backImgEl.style.backgroundImage = "url(../assets/1.jpg)";

  backImgEl.style.backgroundRepeat = "no-repeat";
  backImgEl.style.backgroundSize = "cover";

  leftColumn.style.backgroundColor = "rgba(110, 84, 27, 0.7)";
  if (winnerEl) winnerEl.style.padding = "5px";
  if (winnerEl) winnerEl.style.backgroundColor = "rgba(9, 13, 87, 0.5)";
  if (winnerEl) winnerEl.style.border = "2px solid white";

  setTimeout(() => {
    luckyWinnerEl.innerText = "It's your lucky day🍀";
    luckyWinnerEl.style.fontSize = "";
    backImgEl.style.backgroundImage = "";
    winnerEl.style.backgroundColor = "";
    leftColumn.style.backgroundColor = "";
    winnerEl.style.border = "none";

    document
      .querySelectorAll(".weight")
      .forEach((el) => (el.textContent = "1"));
    spinButton.disabled = false;
    spinButton.classList.remove("disabled");
  }, 4000);
}
