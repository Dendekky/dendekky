---
title: "How To Build A Command-Line Tool With NodeJS - A step-by-step guide"
date: "2020-01-12"
summary: "This post will guide developers on building CLI tools with node.js. You will also learn how to publish the tool to NPM."
tags: ["node", "javascript", "cli", "npm"]
---

This post will guide developers on building CLI tools with node.js. You will also learn how to publish the tool to NPM. Node.js allows us to build command-line tools using JavaScript. There is a rich node.js package ecosystem as shown by the npm registry.

Building CLI tools that people can use is a good way to increase your coding and problem-solving skills. In this post, we'll explore how I created a [cli tool](https://www.npmjs.com/package/runweb) that checks if a website is up or down. You can find the source code [here](https://github.com/Dendekky/runweb-cli-tool)

## STEPS

### Have A Plan

1. Run the app on nodejs
2. Get my arguments from the terminal
3. Check the website status from [isitup](https://isitup.org)
4. Return the response to the terminal
5. Create an option to launch the website if it is up.

### Create A Node App

Let's create a folder for our project and navigate to the root of the project directory on our terminal.

`mkdir cli-project && cd cli-project`

Initialize a node project

`npm init -y`.

This creates a node app with a package.json structure like this:

```json
{
  "name": "cli-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Create an index.js file

`touch index.js`

Open this file and print "Hello, here is my first CLI tool" to the console

```javascript
// index.js

console.log("Hello, here is my first CLI tool")
```

Navigate back to the terminal now and run `node index`

```
$ node index
Hello, here is my first CLI tool
```

Now that your node app runs, it is time to turn it into a shell command.
In order to invoke our index.js file directly without the node command, put this `#!/usr/bin/env node` at the top of our index.js file

```javascript
// index.js
#!/usr/bin/env node

console.log("Hello, here is my first CLI tool")
```

Next, we are going to add a bin property to our package.json file. However, our project is going to run on a single file so we won't use the bin property to specify command names. We will be using the name property for that.

```json
{
  "name": "cli-project",
  "version": "1.0.0",
  "bin": "./index.js"
}
```

If you run `cli-project` in the project's directory now it should return

```
$ cli-project
Hello, here is my first CLI tool
```

We will make two changes now. We don't want our CLI name to be `cli-project`. So we will change the value of the package.json `name` property to `webcheck`

```json
{
  "name": "webcheck"
}
```

Our shell command is still local. It is time to make it global. Run
`npm link`

Navigate away from the root of our project directory and run `webcheck` from any directory. You should see this as the result.

```
$ webcheck
Hello, here is my first CLI tool
```

CONGRATULATIONS!!! You just created your first shell command with a node app. This can be pushed to NPM for users to download and run but since we are only halfway done with project, I would recommend waiting until our node app is done before publishing.

### Parse Arguments From The Terminal

To parse our arguments from the terminal, we will be using a built-in node module, *argv*. According to the official nodejs docs, [the process.argv property returns an array containing the command line arguments passed when the Node.js process was launched](https://nodejs.org/docs/latest/api/process.html#process_process_argv). The first element will be process.execPath. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command line arguments. So, any argument we pass to the terminal will be the third element of the array. Edit your index.js file to look like this.

```javascript
// index.js
#!/usr/bin/env node

console.log(process.argv);
```

Run your app on the terminal. The output should resemble this.

```
$ webcheck
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\adeniyi\\Desktop\\Projects\\cli-project\\index'
]
```

Now add an additional argument to your command and your output should resemble this.

```
$ webcheck file
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\adeniyi\\Desktop\\Projects\\cli-project\\index',
  'file'
]
```

Note: The more arguments you append, the larger the array becomes. For our purpose, we will limit our argument to a string and parse it into our project as the third element of the array.
It is time to parse this argument into our app and fetch information from [isitup api](http://isitup.remotelan.net/api/api.html).

Open your index.js file and put this code.

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");

// console.log(process.argv);
const website = process.argv[2];

function CheckWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`)
    .then(response => response.json());

  info.then(function(result) {
    if (result.response_code == 200) {
      console.log('website is up and running')
    } else {
      console.log('website is down')
    }
  });
}

CheckWeb(website);
```

We required the `node-fetch` package to help us get our data from the [isitup api](http://isitup.remotelan.net/api/api.html) because node doesn't support native javascript fetch. Run `npm install node-fetch`.

Our CheckWeb function takes in a name argument and fetches the appropriate response from the API. We are now passing our command line argument into the function. Let's head over to the terminal and see some code running.

```
$ webcheck duckduckgo.com
website is up and running
```

Yay!!!

```
$ webcheck google.com
website is down
```

Wait what?!
Let's try to figure out what went wrong here. My favorite debugging tool to the rescue (console).

```javascript
#!/usr/bin/env node
// ...

function CheckWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`)
    .then(response => response.json());

  info.then(function(result) {
    console.log(result)
  });
}

CheckWeb(website);
```

Run the app from the terminal again

```
$ webcheck google.com
{
  domain: "google.com",
  port: 80,
  status_code: 1,
  response_ip: "216.58.210.206",
  response_code: 301,
  response_time: 0.008
}
```

So, [the 301 redirect is considered a best practice for upgrading users from HTTP to HTTPS](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). We need our app to know this and tell us google is up. There are two ways we can go about this; a chain of if else statements navigating the appropriate response codes or looking for `null` response codes.

**Option 1:**

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");

const website = process.argv[2];

function CheckWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`)
    .then(response => response.json());

  info.then(function(result) {
    if (result.response_code == null) {
      console.log('website is down')
    } else {
      console.log('website is up and running')
    }
  });
}

CheckWeb(website);
```

Run your app

```
$ webcheck google.com
website is up and running
```

**Option 2:**

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");

const website = process.argv[2];

function CheckWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`)
    .then(response => response.json());

  info.then(function(result) {
    if (result.response_code == 200) {
      console.log('\x1b[32m%s\x1b[0m', 'website is up and running');
    } else if (result.response_code == 301) {
      console.log('\x1b[34m%s\x1b[0m', 'website has been moved permanently but is up');
    } else if (result.response_code == 302) {
      console.log('\x1b[34m%s\x1b[0m', 'temporary redirect, website is up');
    } else if (result.response_code == 403) {
      console.log('\x1b[33m%s\x1b[0m', 'information not found');
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'website is down')
    }
  });
}

CheckWeb(website);
```

This `'\x1b[31m%s\x1b[0m'` snippet and others like it you see in the console statement determine the color of our response message.

Run your app

```
$ webcheck google.com
website has been moved permanently but is up
```

We can publish the first version of our cli tool to NPM now. You need to create a `.npmignore` file. Copy this into the file.

```
//.npmignore

node_modules/
```

This ensures that you don't publish node modules with the package. Now, run
`npm publish`
If you have not logged in to npm from your terminal before, do so first
`npm login`

Cheers mate. Users can now head to NPM to search for and download your cli tool.

### Launching The Website From The Terminal

For this, we will be requiring `open` a package that will help us open our url. Then we will write a function we can call to launch website.
`npm install open`

Edit your index.js file

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");
const open = require("open");

const website = process.argv[2];

function CheckWeb(name) {
  const info = fetch(`https://isitup.org/${name}.json`)
    .then(response => response.json());

  info.then(function(result) {
    function openWebSite() {
      setTimeout(function() {
        open(`https://${result.domain}`);
      }, 1000);
    }

    if (result.response_code == 200) {
      console.log('\x1b[32m%s\x1b[0m', 'website is up and running');
      openWebSite();
    } else if (result.response_code == 301) {
      console.log('\x1b[32m%s\x1b[0m', 'website has been moved permanently but is up');
      openWebSite();
    } else if (result.response_code == 302) {
      console.log('\x1b[34m%s\x1b[0m', 'temporary redirect, website is up');
      openWebSite();
    } else if (result.response_code == 403) {
      console.log('\x1b[33m%s\x1b[0m', 'information not found');
      openWebSite();
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'website is down')
    }
  });
}

CheckWeb(website);
```

The function openWebsite launches the checked website in your default browser automatically from the terminal. However, we want our users to have the power to open the website or not.

We are going to install two packages `arg` and `inquirer`. We shall be parsing the command line argument into options with `arg` and `inquirer` to prompt users for values.
`npm install arg inquirer`

We are going to structure our index.js file like this

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");
const open = require('open');
const arg = require('arg');
const inquirer = require('inquirer');

function ParseCliArgsIntoOptions() {
  const args = arg(
    {
      '--website': Boolean,
      '--yes': Boolean,
      '-w': '--website',
      '-y': '--yes',
    },
    {
      argv: process.argv.slice(2),
    }
  );
  return {
    website: args['--website'] || false,
  };
}

async function PromptForOptions(options) {
  const questions = [];

  if (!options.website) {
    questions.push({
      type: 'confirm',
      name: 'website',
      message: 'Open the website on your browser?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    website: options.website || answers.website,
  };
}

async function LaunchWebsite(result) {
  let options = ParseCliArgsIntoOptions();
  options = await PromptForOptions(options);
  if (options.website == true) {
    open(`https://${result.domain}`);
  }
}

const website = process.argv[2];

function CheckWeb(name) {
  // ...
}
```

What we have done is create a LaunchWebsite function that takes in two other functions `ParseCliArgsIntoOptions()` which provides you a boolean yes/no option to the question prompted by the `PromptForOptions()` function. If the chosen options is `true` i.e 'yes', the website is opened.

We will now inject the LaunchWebsite function into our Checkweb function and pass the result of our `fetch` operation down to it.

If you run your shell command on the terminal now, this should happen

```
$ webcheck google.com
website has been moved permanently but is up
? Open the website on your browser? (y/N)
```

Great! The journey is almost over.
Let us round off by handling errors for people who might forget to add the website extension. The website might be up but this will definitely return it as down.

```
$ webcheck google
website is down
```

There are many ways to approach this. You could write create an array of all the possible extensions (over 400) and write a regex function that searches for any of the array arguments in our website string. A bit unnecessary if you ask me. Or you could just search for the substring '.' in our argument as done below.

```javascript
#!/usr/bin/env node
const fetch = require("node-fetch");
const open = require('open');
const arg = require('arg');
const inquirer = require('inquirer');

// ... helper functions ...

function CheckWeb(name) {
  if (name.indexOf('.') > -1) {
    const info = fetch(`https://isitup.org/${name}.json`)
      .then(response => response.json());

    info.then(function(result) {
      // ...
    });
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'please append your url extension e.g(mouse.com)')
  }
}

CheckWeb(website);
```

At the terminal.

```
$ webcheck google
please append your url extension e.g(mouse.com)
```

Now, let's publish our updated tool again. You have to update the version number. Run
`npm version 1.1.0`
Then push to NPM
`npm publish`

## Conclusion

Our CLI tool is up and running on NPM.
If you have any questions regarding this, I am available in the comment section. Also, feel free to correct or add anything I might have missed. Do not hesitate to send me a message by email or on [twitter](https://twitter.com/dendekky).
Once again, you can find the source code [here](https://github.com/Dendekky/runweb-cli-tool).
Thanks!
