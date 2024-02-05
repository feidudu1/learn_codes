const fse = require('fs-extra');
const inquirer = require('inquirer');
const glob = require('glob');
const ejs = require('ejs');

async function ejsRender(options) {
  const dir = options.targetPath
  const projectInfo = options.projectInfo;
  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: dir,
      ignore: options.ignore || '',
      nodir: true, // 筛除掉文件夹
    }, function(err, files) {
      if (err) {
        reject(err);
      }
      Promise.all(files.map(file => {
        const filePath = path.join(dir, file);
        return new Promise((resolve1, reject1) => {
          ejs.renderFile(filePath, projectInfo, {}, (err, result) => {
            if (err) {
              reject1(err);
            } else {
              // Note: 需要写入，不然还是<%= %>，这里的result还是字符串
              fse.writeFileSync(filePath, result);
              resolve1(result);
            }
          });
        });
      })).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  });
}

async function install(options) {
  const projectPrompt = []
  const descriptionPrompt = {
    type: 'input',
    name: 'description',
    message: '请输入项目描述信息',
    default: '',
    validate: function(v) {
      const done = this.async();
      setTimeout(function() {
        if (!v) {
          done('请输入项目描述信息');
          return;
        }
        done(null, true);
      }, 0);
    },
  };
  projectPrompt.push(descriptionPrompt);
  const projectInfo = await inquirer.prompt(projectPrompt);
  options.projectInfo.description = projectInfo.description
  const {sourcePath, targetPath} = options
  try {
    fse.ensureDirSync(sourcePath);
    // /Users/yafei/.imooc-cli-dev/template/node_modules/_imooc-cli-dev-template-vue2@1.0.2@imooc-cli-dev-template-vue2/template
    fse.ensureDirSync(targetPath);
    // /Users/yafei/tempt/test
    fse.copySync(sourcePath, targetPath);
    const templateIgnore = options.templateInfo.ignore || [];
    const ignore = ['**/node_modules/**', ...templateIgnore]
    await ejsRender({ignore, targetPath, projectInfo: options.projectInfo})
  } catch (e) {
    throw e;
  }

}

module.exports = install;