# [Remote Code Execution App](https://runcode.paulonteri.com) 

Remote code execution app built with JavaScript (React, NodeJS & Express).

Try out the live system [here](https://runcode.paulonteri.com/#/).

<img src="https://user-images.githubusercontent.com/45426293/87253451-02cdf280-c484-11ea-83fd-2c59000da265.png" width="90%"></img> 

---

Have you ever wondered how Remote Code Execution works? 

This happens on sites like HackerRank & competitive programming websites. You write some code then it's executed on another computer(server). The results are then shown to you.

I tried implementing that.

Feel free to go through the code, fix bugs, add new features, e.t.c

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
    $ cd core && yarn install && cd ../frontend && yarn install && cd..

## Running the project

To run both the frontend and backend run the `run` script

```sh
./run
```
   
---

##
Made with love by [Paul Onteri](https://paulonteri.com/).
