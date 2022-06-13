# monorepo(单一仓库)

> 使用`rush`练习搭建`monorepo`项目

## 存在的问题

- ts会提示找不到`@monorepo/track`模块

## 注意点

- 项目创建后需要在`rush.json`中进行添加，并且项目`package.json`中的`name`属性需要和`rush.json`中的`packageName`属性一致。

- 在项目A中引用另一个项目B时，需要在`package.json`中将项目B添加为依赖`"projectB": "workspace: *"`，并运行`rush update`。

- 在项目目录运行`rush add -p '本地包名'`可以将本地包(在`rush.json`中注册过的包)添加到当前项目中。

## 优缺点

### 优点

1. 一个仓库管理多个项目有利于项目代码风格的统一
2. 抽离公共组件，统一组件样式风格，减少开发重复代码
3. 解决依赖重复安装的问题

## 目录结构

```shell
- apps # 项目目录
- common # rush init产生的目录，一般用于配置信息
- libraries # 公共组件库目录，可用于多个项目
- tools # 工具目录
- rush.json # rush init产生的文件，也是配置文件
```

## rush 命令

### 初始化项目

```shell
mkdir monorepo

cd monorepo

rush init
```

### 更新项目

当有项目的`package.json`发生变化时，需要执行`rush update`来更新项目。

除特殊情况外，不能在项目中使用`npm install`来安装包，应该使用`rush update`来安装/更新。

```shell
rush update
```

### 构建项目

```shell
# 该命令会构建所有项目，如果项目较多，速度会很慢，可以通过参数指定项目
rush build/rebuild

# 构建projectName和依赖该项目的项目
rush build --to projectName

# 构建所有依赖projectName的项目
rush build --from projectName
```

## git hooks

### pre-commit

提交检查，使用`prettier`格式化代码。

### commit-msg

统一commit msg的格式。

## 项目配置

### rush.json

#### 添加项目

项目创建后需要在`rush.json`文件的`projects`字段中进行添加。

**注意**：项目`package.json`中的`name`属性需要和`rush.json`中的`packageName`属性一致。

```json
{
  "packageName": "vite-app",
  "projectFolder": "apps/vite-app",
  "reviewCategory": "production"
}
```

### command-line.json

可在改文件中配置项目的启动命令相关信息。

```json
{
  "name": "start:react-app",
  "commandKind": "global",
  "summary": "react-app dev",
  "shellCommand": "cd apps/react-app && npm run start",
  "safeForSimultaneousRushProcesses": true
},
```
