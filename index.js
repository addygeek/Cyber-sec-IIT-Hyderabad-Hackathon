const projects = [
  {
    name: "Advanced Bot Defense Demo",
    path: "advanced-bot-defense-demo/index.html",
    description: "Demo showcasing advanced bot defense mechanisms."
  },
  {
    name: "Advanced Bot Tester",
    path: "advanced-bot-tester/index.html",
    description: "Test your system against simulated bot attacks."
  },
  {
    name: "Dynamic Fraud System",
    path: "dynamic-fraud-system/index.html",
    description: "AI-driven system to detect fraud dynamically."
  },
  {
    name: "Fixed Biometric Authentication",
    path: "fixed-biometric-auth/index.html",
    description: "Biometric-based authentication module."
  }
];

const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${project.name}</h2>
    <p>${project.description}</p>
    <a href="${project.path}" target="_blank">Open</a>
  `;
  container.appendChild(card);
});
