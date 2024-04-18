# 开发手册
## 组件库
- KeyboardAvoidingView 本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡。
- https://reactnativeelements.com/docs/components/searchbar
## 图标
- https://ionic.io/ionicons
- https://github.com/oblador/react-native-vector-icons?tab=readme-ov-file
- https://www.flaticon.com/search?word=map


```gradle
// 这是一个大坑，请不要限定加入指定的字符集，全加入
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Specify font files
]
```

```jsx
// 使用方法
import { Icon } from 'react-native-elements';
<Icon name='map' type='ionicon' clo/>
```
- **`'material'`** - 来自 Google 的 Material Icons
- **`'material-community'`** - 来自 Material Community Icons
- **`'font-awesome'`** - 来自 FontAwesome
- **`'octicon'`** - 来自 GitHub 的 Octicons
- **`'ionicon'`** - 来自 Ionicons（您已尝试，但有问题）
- **`'foundation'`** - 来自 ZURB Foundation Icons
- **`'evilicon'`** - 来自 Evil Icons
- **`'simple-line-icon'`** - 来自 Simple Line Icons
- **`'zocial'`** - 来自 Zocial Icons
- **`'entypo'`** - 来自 Entypo Icons
- **`'feather'`** - 来自 Feather Icons

## 地图服务及其配置
- https://github.com/qiuxiang/react-native-amap3d
- https://yangandmore.github.io/2020/03/06/React-native-%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE/
## 从这几个网站把相应的包下下来
`https://reactnativeelements.com/docs/installation`

---
# 常用指令
## 虚拟设备
```bash
# 列出虚拟设备列表
emulator -list-avds

#启动虚拟设备
emulator -avd Google_Phone
emulator -avd <avd_name>
```
## 真机调试
```bash
# 下述指令可以查看是否成功连接，随后开启开发者模式之后即可直接npm start
adb devices
```
## 构建项目

```bash
# 在当前终端，先启动Metro(the JavaScript _bundler_ that ships _with_ React Native)，再构建项目
npm start

# OR using Yarn
yarn start
```

```bash
# 新建一个终端并直接构建安卓项目
npm run android
# OR
npx react-native run-android

# OR using Yarn
yarn android
```

---
# 项目架构
在React-Native项目中，项目的架构设计对于代码的可维护性和拓展性都至关重要。下面我将给出一个典型的React-Native项目的目录结构，以及解释各个目录的功能和常见的功能性函数的存放位置。

### 基本项目目录结构

React-Native项目的典型目录结构如下：

```
my-app/
├── android/              # Android原生代码目录
├── ios/                  # iOS原生代码目录
├── src/                  # 源代码目录
│   ├── assets/           # 静态资源目录，如图片、字体等
│   ├── components/       # 可复用组件
│   ├── screens/          # 应用的各个页面
│   ├── utils/            # 工具方法，如时间、字符串处理等
│   ├── services/         # 服务文件，如网络请求、存储管理等
│   ├── touter/           # 路由和导航
│   ├── config/           # 配置文件目录
│   └── App.js            # 应用的入口文件
├── node_modules/         # 项目依赖
├── app.json              # Expo配置文件
├── package.json          # npm配置文件，定义项目依赖和脚本
└── babel.config.js       # Babel配置文件
```

### 目录功能解释

- **`src/`**: 这是存放大部分业务逻辑和视图代码的地方。
  - **`assets/`**: 存放静态资源，如图像、视频、字体文件等。
  - **`components/`**: 存放可重用的UI组件，例如按钮、卡片等。
  - **`screens/`**: 存放应用的各个屏幕/页面，通常每个文件代表一个屏幕。
  - **`utils/`**: 用于存放通用的工具函数，如格式化日期、数据转换等。
  - **`services/`**: 存放执行外部交互的服务文件，如API请求、本地数据存储操作等。
  - **`navigation/`**: 包含导航和路由的相关设置，管理屏幕间的跳转逻辑。
  - **`config/`**: 包含应用的全局配置信息，如环境变量、API密钥等。

### 功能性函数的存放位置

- **网络请求**（例如进行API调用）:
  - 这类函数通常位于`services/`目录中，可能会有一个`api.js`文件或者根据功能划分的多个文件（如`userService.js`、`productService.js`等）来处理与外部接口的交互。

- **逻辑处理**（例如日期计算、数据格式化）:
  - 这类函数一般放在`utils/`目录中，通常会有多个工具性质的文件，如`dateUtils.js`、`formatUtils.js`等。

这样的结构有助于保持项目的清晰和模块化，使得维护和开发工作变得更加容易。

---
# 打包构建APK
在您提供的 `build.gradle` 配置中，如果您想要在开发和调试时使用不同的签名配置，可以同时启用 `debug` 和 `release` 的签名配置。这样做可以让两个版本共存，根据您构建的类型（调试或发布）自动选择相应的签名配置。

### 为什么使用不同的签名配置？

**Debug 配置**：默认的调试配置使用了 Android 的 `debug.keystore`，它是为了快速部署和测试而设置的。这个 keystore 不应用于生产环境，因为它的安全性较低（密码和别名通常都是预设的`android`）。

**Release 配置**：发布配置应使用您自己创建的 keystore，这提高了应用的安全性。发布用的 keystore 保护了应用的完整性，防止未授权的代码更新和版本发布。

### 同时启用 Debug 和 Release 配置

您可以按以下方式配置 `build.gradle`，以同时支持调试和发布的签名：

```groovy
android {
    ...
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        },
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 注意事项

1. **解除注释**：您提供的代码中 `debug` 配置是被注释掉的。如果您想使用它，需要解除注释。
2. **路径和密码**：确保 `debug.keystore` 存在于正确的路径下，通常位于 `android/app` 目录。如果不确定，可以从 Android SDK 的默认位置复制一个过来（通常在 `~/.android/` 目录下）。
3. **切换构建类型**：在运行或打包应用时，可以选择构建类型：
   - 对于调试构建，使用命令 `./gradlew assembleDebug` 或在 Android Studio 中选择 `debug` 构建变体。
   - 对于发布构建，使用命令 `./gradlew assembleRelease`。

通过这种设置，您可以轻松地切换调试和发布环境，而不需要频繁修改配置文件。这样既保证了开发的便利性，也确保了应用发布的安全性。



---
# 原始文档
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!