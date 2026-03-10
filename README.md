# Smart Email Writer – AI Chrome Extension

Smart Email Writer is an AI-powered Chrome extension that integrates directly with Gmail to generate professional email replies.  
It uses a **Spring Boot backend** connected to the **Gemini API** to analyze email context and automatically generate high-quality responses, helping users draft replies faster and improve productivity.

---

## 🚀 Features

- ✉️ **AI Email Reply Generation**
  - Automatically generates professional responses based on email context.

- ⚡ **One-Click AI Reply**
  - Injects a custom **“AI Reply” button** directly inside the Gmail interface.

- 🧠 **Context-Aware Responses**
  - Uses **Gemini API** to understand the email content before generating replies.

- 🔌 **Chrome Extension Integration**
  - Seamlessly works within Gmail without leaving the browser.

- ⚙️ **Backend API Processing**
  - Spring Boot backend handles request processing and communication with Gemini AI.

---

## 🏗️ System Architecture

```
Gmail UI
   │
   ▼
Chrome Extension (JS, HTML, CSS)
   │
   ▼
Spring Boot Backend API
   │
   ▼
Gemini AI API
   │
   ▼
Generated Email Reply
```

---

## 🛠️ Tech Stack

**Frontend (Extension)**
- JavaScript
- HTML
- CSS
- Chrome Extension APIs

**Backend**
- Spring Boot
- REST APIs
- JSON Processing

**AI Integration**
- Gemini API (Google AI)

---

## 📂 Project Structure

```
smart-email-writer
│
├── chrome-extension
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
├── backend
│   ├── controller
│   ├── service
│   ├── dto
│   └── config
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/smart-email-writer.git
cd smart-email-writer
```

---

### 2️⃣ Backend Setup (Spring Boot)

1. Navigate to backend folder

```bash
cd backend
```

2. Add your **Gemini API Key** in `application.properties`

```
gemini.api.key=YOUR_API_KEY
```

3. Run the Spring Boot application

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 3️⃣ Chrome Extension Setup

1. Open **Chrome**
2. Go to

```
chrome://extensions
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `chrome-extension` folder

The extension will now appear in Chrome.

---

## 📖 Usage

1. Open **Gmail**
2. Open any email conversation
3. Click the **AI Reply button**
4. The extension sends the email content to the backend
5. Backend requests **Gemini API**
6. AI-generated reply appears instantly

---

## 💡 Example Workflow

```
User opens Gmail
       ↓
Clicks "AI Reply"
       ↓
Extension extracts email content
       ↓
Backend processes request
       ↓
Gemini generates response
       ↓
Reply inserted into Gmail draft
```

---

## 🔮 Future Improvements

- Tone selection (Professional / Friendly / Formal)
- Multi-language email generation
- Email summarization
- Custom response templates
- Support for Outlook and other email platforms

---

## 👨‍💻 Author

Mohit Kumar

---

⭐ If you found this project useful, consider giving it a star!
