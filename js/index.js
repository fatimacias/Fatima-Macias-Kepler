// Dark mode toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Get current year
const today = new Date();
const thisYear = today.getFullYear();

// Create and insert footer
const footer = document.createElement("footer");
const footerContent = document.createElement("div");
footerContent.className = "footer-content";
footer.appendChild(footerContent);

const copyright = document.createElement("p");
copyright.className = "copyright";
copyright.textContent = `© ${thisYear} Fatima Macias. All rights reserved.`;
footerContent.appendChild(copyright);
document.body.appendChild(footer);

const skills = [
    {
        name: "C#",
        icon: "fab fa-microsoft",
        level: "Advanced"
    },
    {
        name: ".NET Core",
        icon: "fas fa-cube",
        level: "Advanced"
    },
    {
        name: "JavaScript",
        icon: "fab fa-js",
        level: "Advanced"
    },
    {
        name: "HTML",
        icon: "fab fa-html5",
        level: "Advanced"
    },
    {
        name: "CSS",
        icon: "fab fa-css3-alt",
        level: "Advanced"
    },
    {
        name: "React.js",
        icon: "fab fa-react",
        level: "Intermediate"
    },
    {
        name: "Azure",
        icon: "fab fa-microsoft",
        level: "Intermediate"
    },
    {
        name: "SQL Server",
        icon: "fas fa-database",
        level: "Advanced"
    },
    {
        name: "GitHub",
        icon: "fab fa-github",
        level: "Advanced"
    },
    {
        name: "xUnit",
        icon: "fas fa-vial",
        level: "Intermediate"
    }
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

skills.forEach(skill => {
    const skillItem = document.createElement("li");
    skillItem.innerHTML = `
        <i class="${skill.icon}"></i>
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}</span>
    `;
    skillsList.appendChild(skillItem);
});

const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageContentDiv = document.getElementById("messagesContent");
const messageList = messageSection.querySelector("ul");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const confirmDeleteBtn = document.getElementById("confirmDelete");

let messageToDelete = null;
let messageBeingEdited = null;

function updateMessagesVisibility() {
    if (messageList.children.length === 0) {
        messageContentDiv.style.display = "none";
    } else {
        messageContentDiv.style.display = "block";
    }
}

updateMessagesVisibility();

messageForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    const newMessage = document.createElement("li");
    // Store original data for edit
    newMessage.dataset.name = usersName;
    newMessage.dataset.email = usersEmail;
    newMessage.dataset.message = usersMessage;

    function renderMessageView() {
        newMessage.innerHTML = `
            <div class="message-header">
                <a href="mailto:${newMessage.dataset.email}" class="message-author">${newMessage.dataset.name}</a>
                <span>wrote:</span>
            </div>
            <div class="message-content">${newMessage.dataset.message}</div>
            <div class="message-buttons">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash-alt"></i>
                    Delete
                </button>
            </div>
        `;
        // Add edit functionality
        const editBtn = newMessage.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            if (messageBeingEdited) return; // Only one edit at a time
            messageBeingEdited = newMessage;
            renderEditForm();
        });
        // Add delete functionality with confirmation
        const deleteBtn = newMessage.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            messageToDelete = newMessage;
            deleteModal.classList.add("active");
        });
    }

    function renderEditForm() {
        newMessage.innerHTML = `
            <form class="edit-message-form">
                <div style="margin-bottom:0.5rem;">
                    <label>Name</label>
                    <input type="text" name="editName" value="${newMessage.dataset.name}" required style="width:100%;margin-top:0.25rem;">
                </div>
                <div style="margin-bottom:0.5rem;">
                    <label>Email</label>
                    <input type="email" name="editEmail" value="${newMessage.dataset.email}" required style="width:100%;margin-top:0.25rem;">
                </div>
                <div style="margin-bottom:0.5rem;">
                    <label>Message</label>
                    <textarea name="editMessage" required style="width:100%;margin-top:0.25rem;">${newMessage.dataset.message}</textarea>
                </div>
                <div class="message-buttons">
                    <button type="submit" class="save-btn"><i class="fas fa-save"></i> Save</button>
                    <button type="button" class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
                </div>
            </form>
        `;
        const form = newMessage.querySelector(".edit-message-form");
        const cancelBtn = form.querySelector(".cancel-btn");
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            newMessage.dataset.name = form.editName.value;
            newMessage.dataset.email = form.editEmail.value;
            newMessage.dataset.message = form.editMessage.value;
            messageBeingEdited = null;
            renderMessageView();
        });
        cancelBtn.addEventListener("click", function() {
            messageBeingEdited = null;
            renderMessageView();
        });
    }

    renderMessageView();
    messageList.appendChild(newMessage);
    updateMessagesVisibility();
    messageForm.reset();

    // Show success message
    const successMsg = document.createElement("p");
successMsg.textContent = "Message sent successfully!";
successMsg.style.color = "green";
successMsg.style.fontWeight = "500";
successMsg.style.marginTop = "1rem";
messageForm.appendChild(successMsg);

// Remove success message after 3 seconds
setTimeout(() => {
    successMsg.remove();
}, 3000);
});

// Handle delete confirmation
cancelDeleteBtn.addEventListener("click", function() {
    deleteModal.classList.remove("active");
    messageToDelete = null;
});

confirmDeleteBtn.addEventListener("click", function() {
    if (messageToDelete) {
        messageToDelete.remove();
        updateMessagesVisibility();
    }
    deleteModal.classList.remove("active");
    messageToDelete = null;
});

// Close modal if clicking outside
deleteModal.addEventListener("click", function(e) {
    if (e.target === deleteModal) {
        deleteModal.classList.remove("active");
        messageToDelete = null;
    }
});

// Format date function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Fetch and display repositories

const projectSection = document.getElementById("projects");
const projectList = projectSection.querySelector("ul");

const loadingMessage = document.createElement("li");
loadingMessage.innerHTML = `
  <div class="project-error">
    <i class="fas fa-spinner fa-spin"></i>
    <p>Loading projects...</p>
  </div>
`;
projectList.appendChild(loadingMessage);

fetch("https://api.github.com/users/fatimacias/repos")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(repositories => {
        const projectSection = document.getElementById("projects");
        const projectList = projectSection.querySelector("ul");

        // Filter repositories that start with "Fatima"
        const filteredRepos = repositories.filter(repo => 
            repo.name.toLowerCase().startsWith('fatima')
        );

        // Sort by update date (most recent first)
        filteredRepos.sort((a, b) => 
            new Date(b.updated_at) - new Date(a.updated_at)
        );

        filteredRepos.forEach(repo => {
            const project = document.createElement("li");
            
            // Fetch repository languages
            fetch(repo.languages_url)
                .then(response => response.json())
                .then(languages => {
                    const languagesList = Object.keys(languages);
                    const createdDate = formatDate(repo.created_at);
                    const updatedDate = formatDate(repo.updated_at);
                    
                    project.innerHTML = `
                        <div class="project-header">
                            <a href="${repo.html_url}" class="project-title" target="_blank">
                                <i class="fab fa-github"></i>
                                ${repo.name}
                            </a>
                            ${repo.description ? `
                                <p class="project-description">
                                    <i class="fas fa-info-circle"></i>
                                    ${repo.description}
                                </p>
                            ` : ''}
                        </div>
                        <div class="project-info">
                            <span class="project-dates">
                                <span class="date-item">
                                    <i class="fas fa-calendar-plus"></i>
                                    Created: ${createdDate}
                                </span>
                                <span class="date-item">
                                    <i class="fas fa-calendar-check"></i>
                                    Updated: ${updatedDate}
                                </span>
                            </span>
                            ${repo.homepage ? `
                                <a href="${repo.homepage}" class="demo-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            ` : ''}
                        </div>
                        <div class="project-stats">
                            <span class="stat-item">
                                <i class="fas fa-code-branch"></i>
                                ${repo.forks_count} Forks
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-star"></i>
                                ${repo.stargazers_count} Stars
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-eye"></i>
                                ${repo.watchers_count} Watchers
                            </span>
                        </div>
                        <div class="project-languages">
                            ${languagesList.map(lang => 
                                `<span class="language-tag">
                                    <i class="fas fa-code"></i>
                                    ${lang}
                                </span>`
                            ).join('')}
                        </div>
                    `;
                    projectList.appendChild(project);
                })
                .catch(error => {
                    console.error("Error fetching languages:", error);
                    project.innerHTML = `
                        <div class="project-error">
                            <i class="fas fa-exclamation-circle"></i>
                            Error loading repository details
                        </div>
                    `;
                    projectList.appendChild(project);
                });
        });
        if (filteredRepos.length === 0) {
            const noProjects = document.createElement("li");
            noProjects.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>No projects found</p>
                </div>
            `;
            projectList.appendChild(noProjects);
        }
    })
    .catch(error => {
        const projectSection = document.getElementById("projects");
        const projectList = projectSection.querySelector("ul");
        const errorItem = document.createElement("li");
        errorItem.innerHTML = `
            <div class="project-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading repositories: ${error.message}</p>
            </div>
        `;
        projectList.appendChild(errorItem);
    }).finally(() => {
        loadingMessage.remove();
    });

