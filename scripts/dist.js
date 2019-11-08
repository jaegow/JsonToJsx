// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const glob = require('glob');
const paths = require('../config/paths');

const appPackage = require(paths.appPackageJson);

const globPromise = (glob_url, glob_options) => new Promise((resolve, reject) => {
  glob(glob_url, glob_options, (err, files) => {
    if (err) reject(err);
    resolve(files);
  });
});

const read_write_file = (file_location, onData) => new Promise((resolve, reject) => {
  fs.readFile(file_location, 'utf8', (err, data) => {
    if (err) return reject(err);
    const result = onData(data.toString());
    fs.writeFile(file_location, result, 'utf8', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
});

const replace_in_file = (file_location, replace_pattern, replace_with) => read_write_file(file_location, (data) => {
  const replaced = data.replace(replace_pattern, (match, g1, offset, string) => {
    const relative_path = path.relative(paths.appPath, file_location);
    console.log(chalk.cyan(`Replacing: ${chalk.yellow(match)} with ${chalk.yellow(replace_with)} in file: ${chalk.yellow(chalk.bold(relative_path))}`));
    return replace_with;
  });
  return replaced;
});

const add_version_watermark = (file_location) => read_write_file(file_location, (data) => {
  const version = `${appPackage.name}: ${appPackage.version}`;
  const relative_path = path.relative(paths.appPath, file_location);
  const extension = path.extname(file_location);
  console.log(chalk.cyan(`Adding version: ${chalk.yellow(version)} in file: ${chalk.yellow(chalk.bold(relative_path))}`));
  let result;
  if (extension === '.js' || extension === '.css') {
    result = `/* ${version} */\n${data}`;
  } else {
    console.log(chalk.red(`Adding version not supported for ${extension} files`));
  }
  return result;
});

async function build_and_dist() {
  try {
    console.log(chalk.cyan('Distribution building...'));
    // set the public url to a easy to grab string pattern
    process.env.PUBLIC_URL = 'distributionhackpublicurl';

    // run build after process.env.PUBLIC_URL is set
    const build_cmd = await exec('npm run build');
    // build_cmd.stdout
    // build_cmd.stderr

    // create dist directory if it does not exist
    const dist_folder_exists = await fs.existsSync(paths.appDist);
    if (!dist_folder_exists) {
      await fs.mkdirSync(paths.appDist, '0777', true);
      console.log(chalk.yellow('Distribution folder created'));
    }

    const url_built_index = path.resolve(paths.appBuild, 'index.html');
    const url_dist_index = path.resolve(paths.appDist, 'index.html');
    const url_built_static = path.resolve(paths.appBuild, 'static');
    const url_dist_static = path.resolve(paths.appDist, 'static');

    console.log(chalk.cyan('Copying files into distribution folder:'), chalk.yellow(path.relative(paths.appPath, paths.appDist)));

    // copy all files into distribution folder
    await fs.copySync(url_built_index, url_dist_index, { dereference: true });
    await fs.copySync(url_built_static, url_dist_static, { dereference: true });

    // replace process.env.PUBLIC_URL in runtime.js
    const url_dist_runtime = path.resolve(url_dist_static, 'js/runtime-main.js');
    const pattern_in_runtime_file = new RegExp(`\"${process.env.PUBLIC_URL}\/\"`, 'g');
    await replace_in_file(url_dist_runtime, pattern_in_runtime_file, 'window.__test_config__.root');

    // replace process.env.PUBLIC_URL in the index.html
    const pattern_in_index_file = new RegExp(`${process.env.PUBLIC_URL}`, 'g');
    await replace_in_file(url_dist_index, pattern_in_index_file, '__ADD__ROOT__PATH__HERE__');

    // version added to js files
    const glob_dist_js = path.resolve(url_dist_static, 'js/**/*.js');
    const js_glob_files = await globPromise(glob_dist_js);
    const js_glob_promises = js_glob_files.map(async (file) => add_version_watermark(file));
    await Promise.all(js_glob_promises);

    // version added to css files
    const glob_dist_css = path.resolve(url_dist_static, 'css/**/*.css');
    const css_glob_files = await globPromise(glob_dist_css);
    const css_glob_promises = css_glob_files.map(async (file) => add_version_watermark(file));
    await Promise.all(css_glob_promises);

    console.log(chalk.cyan(`${chalk.bold('DISTRIBUTION COMPLETE')}`));
  } catch (e) {
    console.error(chalk.red(e));
  }
}

build_and_dist();
