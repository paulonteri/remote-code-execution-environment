# [Remote Code Execution App](https://runcode.paulonteri.com) 

Remote code execution app built with JavaScript (React, NodeJS & Express).

Try out the live app [here](https://runcode.paulonteri.com/#/).

---

## Local Setup

### Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/paulonteri/remote-code-execution-environment.git
    $ cd remote-code-execution-environment
    $ yarn install

## Running the project

### Frontend
To run the react app, navigate to the frontend directory.

    $ cd frontend
    $ yarn start

### Backend
To run the react app, navigate to the frontend directory.

    $ cd core
    $ node Server.js
   
---

##
Made with love by [Paul Onteri](https://paulonteri.com/).
