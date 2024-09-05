# TURTROLER

**TURTROLER** is a CC-TWEAKED turtle controller that includes a WebSocket server and a turtle script, designed for seamless integration and easy usage.

## Table of Contents

- [Installation](#installation)
- [Server](#server)
- [Web Client](#web-client)
- [Turtle Script](#turtle-script)
- [Usage](#usage)

## Installation

Before using TURTROLER, ensure you have Node.js and npm installed. 

### Dependencies

To install the required package for the WebSocket server, you can choose one of the following methods:

1. **Using npm:**
   ```bash
   npm install ws
   ```

2. **Using the included Python script:**
   ```bash
   python installdependencies.py
   ```

## Server

To deploy the WebSocket server, you can use one of the following methods:

1. **Using Node.js:**
   ```bash
   node ./server/index.js
   ```

2. **Using the included Python script:**
   ```bash
   python startserver.py
   ```

## Web Client

The web client is accessible by simply opening the `index.html` file in your web browser. Just navigate to the file location and double-click it to open.

## Turtle Script

To install the Turtle program, run the following command in your terminal:

```bash
wget https://raw.githubusercontent.com/PotatoGamo/Conturtle/main/turtroller.lua
```

**Note:** It is recommended to rename the downloaded script to `startup.lua` so that the turtle connects on startup:

```bash
rename turtroller.lua startup.lua
```

## Usage

Once everything is set up:
- Start the WebSocket server.
- Open the web client in your browser.
- Ensure the Turtle program is running to start controlling your turtle.

For further assistance or contributions, feel free to open an issue or submit a pull request on the repository!