# Cognifyz Full-Stack Web Development Internship 🚀

## Level 1: Beginner — Task 1: Basic Server Interaction & Contact Portal

This repository contains the complete implementation for **Level 1 - Task 1** of my Full-Stack Web Development Internship at **Cognifyz Technologies**. The application demonstrates a robust client-server communication workflow utilizing modern backend routing, server-side templating, and dual-layer validation.

---

## 📂 Project Architecture

The project strictly follows the structural and file isolation guidelines required by the internship evaluation metrics:

```text
cognifyz-level1-task1/
├── middleware/
│   └── validateContact.js      # Server-side validation pipeline (express-validator)
├── public/
│   ├── css/
│   │   └── style.css           # Custom UI tokens, layout mechanics, & animations
│   └── js/
│       └── script.js           # Client-side form interception & instant error engine
├── views/
│   └── index.ejs               # Single dynamic EJS layout file containing page switches
├── package.json                # Project description, start scripts, and dependencies
├── server.js                   # Application root, configurations, and Route handles
└── README.md                   # Project documentation
```

---

## ⚡ Key Technical Features Implemented

*   **Server-Side Rendering (SSR)**: Configured with **Node.js, Express, and EJS (Embedded JavaScript)** templates to build a unified single-view document (`index.ejs`) that switches layouts based on state variables sent from the server.
*   **Dual-Layer Form Validation**:
    1.  **Client-Side Protection**: Instantly checks user text formats and blocks faulty form dispatches locally in the browser to optimize traffic.
    2.  **Server-Side Security Grid**: Built as separate middleware using `express-validator` to inspect incoming inputs for deep criteria (e.g., minimum character thresholds and formal email parameters) before server computation.
*   **Responsive Framework Grid**: Styled with **Bootstrap 5** to ensure elegant presentation across varying user views like mobile, tablet, and widescreen.
*   **Micro-Animations**: Uses customized keyframes and CSS transforms to enable fluid fade-in states and button scaling responses.

---

## 🛠️ Step-by-Step Installation & Local Execution

To review or execute this application on your local machine, proceed with the commands below:

1. **Clone this repository** to your local environment:
   ```bash
   git clone https://github.com
   ```

2. **Navigate** into the project directory:
   ```bash
   cd cognifyz-level1-task1
   ```

3. **Install** all required dependencies listed in `package.json`:
   ```bash
   npm install
   ```

4. **Boot up** the Express application:
   ```bash
   npm start
   ```

5. **Interact** with the live system by loading this link in your browser:
   `http://localhost:3000`

---

## 📦 Core Technical Stack Details

*   **Backend Runtime Env**: Node.js
*   **Framework Framework**: Express.js
*   **Template Engine**: EJS
*   **Frontend Framework**: Bootstrap 5
*   **Form Analytics Middleware**: express-validator

---

## 🧑‍💻 Creator Acknowledgement
*   **Developer**: angel sharon
*   **Role**: Full-Stack Web Development Intern
*   **Organization**: Cognifyz Technologies
