## WaveBoard

![WaveBoardLogo](https://github.com/jeevan10017/WaveBoard/assets/132948936/ee3bdf84-5c88-4b3a-86b3-8c9511628562)

Wave Board is a virtual whiteboard application built with React and Canvas HTML, utilizing the Rough JS library for sketchy graphics. It includes tools for drawing lines, shapes, and text, with options for customization and functionalities like undo, redo, erase, and downloading the canvas as a PNG file.

![Screenshot 2024-06-28 191158](https://github.com/jeevan10017/WaveBoard/assets/132948936/2c502546-568d-430a-ace1-1a297506cf6e)


## Features

- 🖌️ Draw freehand brush strokes
- 📏 Draw lines, rectangles, circles, and arrows
- ✏️ Add text annotations
- 🎨 Customize stroke color, stroke width, and fill color
- ↩️ Undo and redo actions
- 🧹 Erase elements
- 📥 Download the canvas as a PNG image
- 🌗 Toggle between light and dark modes

## Project Structure

```bash
waveboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── index.js
│   │   │   └── index.module.css
│   │   ├── Toolbar/
│   │   │   ├── index.js
│   │   │   └── index.module.css
│   │   ├── Toolbox/
│   │   │   ├── index.js
│   │   │   └── index.module.css
│   ├── store/
│   │   ├── board-context.js
│   │   ├── BoardProvider.js
│   │   ├── toolbox-context.js
│   │   ├── ToolboxProvider.js
│   ├── constants.js
│   ├── utils/
│   │   ├── element.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Installation 


1. Clone the repository:
  ```bash
git clone https://github.com/yourusername/waveboard.git
 ```

2. Navigate to the project directory:
 ```bash
cd waveboard
```
3. install the dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

# Available Scripts
In the project directory, you can run:

## npm start
Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

## npm build
Builds the app for production to the build folder.

## npm test
Launches the test runner in the interactive watch mode.

## npm eject
Ejects the project from create-react-app configuration. Use this only if you know what you are doing.

## Dependencies
@testing-library/jest-dom
@testing-library/react
@testing-library/user-event
classnames
icons
perfect-freehand
react
react-dom
react-icons
react-scripts
roughjs
web-vitals

## Dev Dependencies
ajv
tailwindcss
Folder Structure
src/components/Board/index.js
Handles the drawing logic and renders the canvas.

## src/components/Board/index.module.css
CSS module for styling the board component.

## src/components/Toolbar/index.js
Contains the toolbar with drawing tools and actions.

## src/components/Toolbar/index.module.css
CSS module for styling the toolbar.

## src/components/Toolbox/index.js
Contains the toolbox for selecting colors and sizes.

## src/components/Toolbox/index.module.css
CSS module for styling the toolbox.

## src/store/board-context.js
Context for managing the board state.

## src/store/BoardProvider.js
Provider component for the board context.

## src/store/toolbox-context.js
Context for managing the toolbox state.

## src/store/ToolboxProvider.js
Provider component for the toolbox context.

## src/constants.js
Contains constants used throughout the application.

## src/utils/element.js
Utility functions for creating and managing board elements.

## src/App.js
Main application component that renders the board, toolbar, and toolbox.

## src/App.css

# Author
Wave Board is created and maintained by JEEVAN KUMAR KORRA




