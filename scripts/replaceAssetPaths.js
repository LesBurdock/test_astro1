// // /scripts/replaceAssetPaths.js

// // all .md files in this directory and subdirectories will be processed
// const postsDirectory = "/src/content/blog/";

// // Find and replace strings
// const find = "/src/assets/images";
// let replace = "../../assets/images";
// // Special characters (https://en.wikipedia.org/wiki/Regular_expression#POSIX_basic_and_extended) need to be escaped

// replace = replace.replaceAll(".", "\\.");

// import { exec } from "child_process";
// // execute bash command
// exec(
//   `find ${process.cwd()}${postsDirectory} -type f -name '*.md' -print0 | xargs -0 sed -i -e 's:${find}:${replace}:g'`,
//   // Note: GNU sed that runs on Linux but not on mac (most servers use Linux)
//   (error, stdout, stderr) => {
//     // error handling
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     // success
//     console.log(stdout);
//     console.log("🖼️ Successfully replaced asset paths");
//   }
// );