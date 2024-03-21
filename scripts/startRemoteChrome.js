import fs from 'fs';
import path from 'path';
// 'child_process' module: used to run shell commands, to spawn new processes, and to control their behavior.
// exec: executes a shell command
import { exec } from 'child_process';

// join the current module's URL and '../data/Chrome/Profiles' to get the absolute path to the directory where the remote Chrome user data is stored
// remove 'file:' prefix, if present
const DIR = path.join(path.dirname(import.meta.url), '../data/Chrome/Profiles').replace(/^file:/, '');
// console.log('DIR:', DIR);

try {
  // check if the directory at 'DIR' exists, and store the result in 'dirExists'
  // 'fs.promises.access' is a method on the 'fs' object, and it checks if a file or directory exists.
  // if it exists, 'dirExists' will be true, otherwise it will be false
  const dirExists = await fs.promises.access(DIR).then(() => true).catch(() => false);

  if (dirExists) {
    // 'fs.promises.readdir': returns a Promise which resolves to an array of filenames in the directory.
    const files = await fs.promises.readdir(DIR);

    // for each file in the directory
    for (const file of files) {
      // 'fs.promises.rm': removes a file or directory.
      // two arguments: the path of the file or directory to remove, and an options object.
      // the options object is { recursive: true }, which means to remove all of a directory's contents recursively.
      // we call it on each joined path of the directory and file.
      await fs.promises.rm(path.join(DIR, file), { recursive: true });
    }
  // if the directory doesn't exist
  } else {
    // 'fs.promises.mkdir': creates a new directory.
    // two arguments: the path of the directory to create, and an options object.
    // the options object is { recursive: true }, which means to create any necessary parent directories. This would be helpful if we had multiple user data directories or if we accidentally deleted the Chrome directory itself.
    await fs.promises.mkdir(DIR, { recursive: true });
  }

  // get the value of the 'PORT' environment variable.
  // PORT is set in whichever script is run from our package.json file, and it is the port that our server is running on. In dev mode, it's set to 5555, giving us access to Vite's dev server. In prod mode, it's set to 8888, giving us access to the production server.
  const PORT = process.env.PORT

  // a command to start Chrome with remote debugging enabled and a new window opened to 'http://localhost:PORT'
  // i tried splitting the command into separate lines to make it easier to read but that caused an error.
  const command = `/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222 --user-data-dir="${DIR}" --no-first-run --no-default-browser-check --disable-web-security --new-window http://localhost:${PORT} &`;

    // console.log('\n\n\n');
  // console.log('About to run command:', command);

  // 'exec' is a built-in Node.js function that takes three arguments: the command to run, a callback function to execute when the command completes, and an optional options object.
  // 'command' is the string of the command to run.
  // 'callback' is a function that takes three arguments: an error object if the command failed, the output of the command if it succeeded (stdout), and the error output of the command if it failed (stderr).
  // 'error': a built-in object that represents an error.
  // 'stdout': a string that contains the standard output of the command.
  // 'stderr': a string that contains the error output of the command.
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    // we dont see this logged because we're running a server, which doesn’t produce any output in our case and if it did, we wouldn’t see it until the server closes, i.e. when the process 'finishes'.
    // console.log(`stdout: ${stdout}`);
  });
// if an error occurs, log it to the console
} catch (err) {
  console.error(err);
}
