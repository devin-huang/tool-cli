# tool-cli

### 简介

- `package.json` 的 `bin` 放置执行命令 `tool-cli`

### 第一步：全局安装 tool-cli

- 根目录下执行 `npm link`，将 `tool-cli`脚手架配置的命令注入到全局环境

### 第二步：创建项目

- 命令行窗口运行 `tool-cli create project-demo` 建立新项目 `project-demo` 并安装依赖

### 注意事项：

##### 错误解决

- `npm link` 报错： `EEXIST: file already exists` 需要将 `*\Program Files\nodejs\tool-cli.cmd` 与 `*\Program Files\nodejs\node_modules\tool-cli` 删除

##### npm 发布插件

- 必须设 npm 源为 `npm config set registry https://registry.npmjs.org`

- `npm adduser` 登录 NPM(GITHUB 账号既可)

- `npm version patch`修改版本 `npm publish --tag beta` 标记版本（预发布、测试版）

- `npm publish` 发布 （如已存在同名 NPM 包会显现无权限）
# tool-cli
