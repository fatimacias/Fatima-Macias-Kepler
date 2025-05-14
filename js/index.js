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

const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

messageSection.style.display = "none";

messageForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  const newMessage = document.createElement("li");

const messageLink = document.createElement("a");
messageLink.href = `mailto:${usersEmail}`;
messageLink.innerText = usersName;

const messageSpan = document.createElement("span");
const messageText = document.createElement("span");
messageText.className = "message-text";
messageText.innerText = usersMessage;

messageSpan.innerText = " wrote: ";
messageSpan.appendChild(messageText);

newMessage.appendChild(messageLink);
newMessage.appendChild(messageSpan);

  // Create edit button with icon
const editButton = document.createElement("button");
editButton.type = "button";
editButton.innerHTML = '<i class="fas fa-edit"></i>';
editButton.title = "Edit";
editButton.addEventListener("click", function () {
  const messageSpan = newMessage.querySelector(".message-text");
  const newText = prompt("Edit your message:", messageSpan.innerText);
  if (newText !== null && newText.trim() !== "") {
    messageSpan.innerText = newText.trim();
  }
});

// Create remove button with icon
const removeButton = document.createElement("button");
removeButton.type = "button";
removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
removeButton.title = "Remove";
removeButton.addEventListener("click", function () {
  const entry = removeButton.closest("li");
  entry.remove();
  if (messageList.children.length === 0) {
    messageSection.style.display = "none";
  }
});

  

  const buttonContainer = document.createElement("div");
buttonContainer.className = "message-buttons";
buttonContainer.appendChild(editButton);
buttonContainer.appendChild(removeButton);
messageList.appendChild(newMessage);
newMessage.appendChild(buttonContainer);

  messageSection.style.display = "block";

  messageForm.reset();
});
