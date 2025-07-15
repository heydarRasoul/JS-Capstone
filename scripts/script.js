fetch("https://javascript-capstone-backend.onrender.com/users")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error fetching users:", err));
