// Get current year
const today = new Date();
const thisYear = today.getFullYear();

// Create and insert footer
const footer = document.createElement("footer");
document.body.appendChild(footer);

const copyright = document.createElement("p");
copyright.innerHTML = `© Fatima Macias ${thisYear}`;
footer.appendChild(copyright);

const skills = [
    "C#", ".NET Core", "JavaScript", "HTML", "CSS",
    "React.js", "Azure", "SQL Server", "GitHub", "xUnit"
  ];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}