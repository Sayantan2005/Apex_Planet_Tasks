// Form Validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let formMessage = document.getElementById("formMessage");

  if (!name || !email || !message) {
    showMessage("❌ All fields are required.", "error");
    return;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    showMessage("❌ Please enter a valid email address.", "error");
    return;
  }

  showMessage("✅ Form submitted successfully!", "success");
  this.reset(); // clear form
});

// Show message function
function showMessage(msg, type) {
  let formMessage = document.getElementById("formMessage");
  formMessage.textContent = msg;
  formMessage.style.padding = "8px";
  formMessage.style.borderRadius = "5px";

  if (type === "success") {
    formMessage.style.color = "green";
    formMessage.style.background = "#e0f8e0";
  } else {
    formMessage.style.color = "red";
    formMessage.style.background = "#fdd";
  }
}

// To-Do List
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskValue = taskInput.value.trim();

  if (taskValue === "") {
    showMessage("❌ Task cannot be empty!", "error");
    return;
  }

  let taskList = document.getElementById("taskList");
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  taskDiv.innerHTML = `
    <span>${taskValue}</span>
    <button onclick="this.parentElement.remove()">Delete</button>
  `;

  taskList.appendChild(taskDiv);
  taskInput.value = "";
}
