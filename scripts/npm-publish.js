// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('react-dev-utils/chalk');
const paths = require('../config/paths');

const appPackage = require(paths.appPackageJson);

// todo: move this to bitbucket-pipelines.yml
async function npmPublish() {
  try {
    console.log(chalk.cyan('NPM Publish'));
    const git_branch = await exec('git branch');
    const branches = git_branch.stdout.split('\n').map((branch_string) => {
      const name_no_spaces = branch_string.replace(/\s/g, '');
      if (!name_no_spaces.length) return false; // remove blank strings
      const current = /^\*/.test(name_no_spaces);
      const name = current ? name_no_spaces.replace(/\*/g, '') : name_no_spaces;
      return {
        name,
        current,
      };
    }).filter(Boolean);

    const current_branch = branches.find((branch) => branch.current);

    console.log(chalk.cyan('current branch:'), current_branch.name);

    const npm_branch_to_tag_hash = {
      master: 'michelin',
    };

    const tag = npm_branch_to_tag_hash[current_branch.name];

    // const package_name = appPackage.name;

    const npm_publish_cmd = `npm dist-tag add ${appPackage.name}@${appPackage.version} ${tag}`;
    console.log(chalk.cyan('NPM Publish Command:'), chalk.green(npm_publish_cmd));

    // const npm_publish_tag = await exec(`npm dist-tag add ${appPackage.name}@${appPackage.version} ${tag}`);
    // if (npm_publish_tag.stderr.length) throw new Error(npm_publish_tag.stderr);
    // npm dist-tag add <pkg>@<version> [<tag>]

    // npm version patch
    // git add *;
    // git commit -m "Commit message"
    // git push
    // npm publish
  } catch (e) {
    console.error(chalk.red(e));
  }
}

npmPublish();
