# FILE: `backend/package.json`

## Purpose of this File

This file is the **identity card** of the backend project.
It tells Node.js and npm (Node Package Manager) everything about this project:
- What it's called
- What version it is
- What other packages it needs (dependencies)
- How to run it (scripts)

---

## Line-by-Line Explanation

---

### Lines 1-20

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "mk",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.6.3",
    "nodemon": "^3.1.14"
  }
}
```

---

### Line 2

```json
  "name": "backend",
```
The project name. This is used when publishing to npm.

---

### Line 3

```json
  "version": "1.0.0",
```
The version number following **semantic versioning** (SemVer):
- `1` = Major version (big changes, breaking changes)
- `0` = Minor version (new features)
- `0` = Patch version (bug fixes)

---

### Line 4

```json
  "description": "",
```
A description of the project. Currently empty.

---

### Line 5

```json
  "license": "ISC",
```
The license type. ISC is a permissive open-source license, similar to MIT.

---

### Line 6

```json
  "author": "mk",
```
The author of the project.

---

### Line 7

```json
  "type": "commonjs",
```
Tells Node.js to use **CommonJS** module system (`require()` and `module.exports`).
The alternative is `"module"` which uses ES Modules (`import` and `export`).

---

### Line 8

```json
  "main": "index.js",
```
The entry point file. This is what runs when you just `require('backend')`.
Note: This project actually uses `app.js` (specified in the start script), not `index.js`.

---

### Line 9-12 - Scripts

```json
  "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

**Scripts** are shortcuts for running commands.

**`"start": "nodemon app.js"`**
- When you run `npm start`, it executes `nodemon app.js`.
- `nodemon` = A tool that watches your files for changes and auto-restarts the server.
- `app.js` = The file to run.

**`"test"`**
- Currently just prints an error. No tests have been written yet.

---

### Lines 13-19 - Dependencies

```json
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.6.3",
    "nodemon": "^3.1.14"
  }
```

**Dependencies** are packages this project needs to run.

| Package | Version | Purpose |
|---|---|---|
| `cors` | ^2.8.6 | Allow cross-origin requests |
| `dotenv` | ^17.4.2 | Load environment variables from .env file |
| `express` | ^5.2.1 | Web framework for creating APIs |
| `mongoose` | ^9.6.3 | MongoDB object modeling |
| `nodemon` | ^3.1.14 | Auto-restart server on file changes |

**The `^` caret symbol** means "allow minor and patch updates."
- `^2.8.6` means: version 2.8.6 or higher, but below 3.0.0.

---

## Summary

`package.json`:
1. Identifies the project (name, version, author)
2. Defines how to start the project (`npm start`)
3. Lists all required packages (dependencies)
4. Specifies the module system (CommonJS)

---

## Knowledge Check

### Q1: What happens when you run `npm install` in the backend folder?

**Answer:** npm reads `package.json`, looks at the `dependencies` section, downloads all listed packages (cors, dotenv, express, mongoose, nodemon) from the npm registry, and puts them in a `node_modules` folder.

---

### Q2: What is the difference between `dependencies` and `devDependencies`?

**Answer:**
- **dependencies**: Required for the app to run in production (cors, express, mongoose, dotenv).
- **devDependencies**: Only needed during development (testing libraries, build tools). Nodemon is used here as a regular dependency, but it's really a dev tool.

---

### Q3: What does `nodemon` do?

**Answer:** Nodemon watches your project files. Whenever you edit and save a file, nodemon automatically restarts the server. Without nodemon, you would have to manually stop (`Ctrl+C`) and restart (`npm start`) the server after every code change.

---

### Q4: Why does the `start` script say `nodemon app.js` instead of just `node app.js`?

**Answer:** Using `nodemon` makes development easier because the server restarts automatically when files change. In production, you would use `node app.js` (without nodemon).

---

### Q5: What does `^2.8.6` mean?

**Answer:** The caret `^` allows npm to install minor updates. Version 2.8.6 means:
- Major version: 2
- Minor version: 8
- Patch version: 6

`^2.8.6` allows any version from 2.8.6 up to (but not including) 3.0.0.
