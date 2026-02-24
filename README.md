# 🌍 Text Translator

This is a simple Text Translator web application built using React.js and Vite.
It allows users to translate text between multiple languages using the Gemini API.

---

## 🚀 Features

* Translate text between various languages
* Supports popular languages with country flags
* Swap source and target languages
* Scrollable translated text area
* Responsive and user-friendly UI

---

## 🛠 Technologies Used

* React.js
* Vite
* Tailwind CSS
* Gemini API
* Docker

---

## 📸 Screenshot

![Translator UI](img.png)

---

# 🖥 Local Installation (Without Docker)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/PidadhDinesh5095/text-translator.git
cd text-translator
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open browser:

```
http://localhost:5173
```

---

# 🐳 Run Using Docker (Production)

## 📦 Build Docker Image

```bash
docker build -t text-translator .
```

## ▶ Run Container

```bash
docker run -p 8080:80 text-translator
```

Open:

```
http://localhost:8080
```

---

# 🐳 Dockerfile Used (Production)

```dockerfile
# -------- Stage 1: Build --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- Stage 2: Serve --------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# 🔐 Gemini API Configuration

Instead of hardcoding API key inside `Translator.js`,
create a `.env` file:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Then access it in code:

```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

⚠️ Never push real API keys to GitHub.

---

# 📂 .dockerignore

```
node_modules
dist
.git
.env
```

---

# 🌎 Deployment Options

* Docker Hub
* AWS EC2
* DigitalOcean
* GitHub Actions (CI/CD)

---

# 📌 Author

Dinesh Pidadh
GitHub: [https://github.com/PidadhDinesh5095](https://github.com/PidadhDinesh5095)
