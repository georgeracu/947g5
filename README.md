# Advanced Software Engineering 947G5 project

[![Build Status](https://travis-ci.com/georgeracu/947g5.svg?branch=master)](https://travis-ci.com/georgeracu/947g5)

Table of Contents

* [Team Composition](#team-composition)
* [We are Agile](#agile-manifesto)
* [Learning Resources](#a-curated-list-of-learning-resources)
  * [Java for small teams](https://ncrcoe.gitbooks.io/java-for-small-teams/content/)
  * [Create and use GPG key to sign your commits](https://georgeracu.github.io/2019/09/10/setup-gpg-and-git-sign-on-mac.html)
  * [GitHub help on creating GPG keys for all platforms](https://help.github.com/en/articles/generating-a-new-gpg-key)
  * [Git book](https://git-scm.com/book/en/v2)
* [Setup a development machine](#setup-a-development-machine)
  * [Mac version](#mac-version)
  * [Windows version](#windows-version)
  * [Running the app locally](#running-locally)

## Team composition

Here we have the structure of our team, with roles and responsibilities.

Name | Tech Stack | Role | Comments
-------| ------- | ------ | -----
George Racu | Java, Kotlin, Clojure | DevOps | Software engineer with experience in programming languages that run on the JVM (Java, Kotlin, Clojure). Developer of REST based web APIs with a focus on payment systems. True believer in Agile with XTremeProgramming, flat structures and software craft.
Ben Carter | Java, Python, JavaScript, HTML/CSS, SQL | TBC |Comfortable learning JavaScript for front and backend development and also helping present iterations to the client. I would prefer to work more on software development as I want more experience on a full stack, but would like to shadow the project manager to gain experience in both fields.
Emmanuel Biose | Java, Javascript, Kotlin, HTML, CSS, Jquery, Bootstrap, SQL | Team Lead, Programmer | I am looking to take up the role of a Product Manager (Gathering data in form of requirements for our product and mapping out strategies to achieve them and finally working closely with the devs to implement them) which is my career goal. I also don't mind taking up a few coding task in order to get the team to meet up with inevitable deadlines.
Mark Andrade | Java, Python, JavaScript, HTML/CSS | TBC | I do not mind undertaking various roles may that be some coding (as I am not proficient with web development but I am willing to learn to improve my skillset) or even more of the project management roles. I am looking to develop skills in management and coding.  
Jie Dai (Andy) | Python, Java, JavaScript, C++, HTML/CSS | TBC | I am willing to learn new language and new technologies as well. And I am looking forward to enhancing my programming skills as the most important part.
Assaad Salameh | python, java, javascript, html/css, php, C# | TBC | I am looking forward to take part in the coding task but it doesn't necessarily have to do with the specific skillset that i possess as i would be very intrested in learning new things especially when it comes to the framework react and cloud computing. As a team role besides that i would love to present our project to our clients through out the stages (when the delivery dates arrive) as i am very proficient in public speaking. I wpuldn't mind taking any management role in the team, that being said my main focus is in coding as i am mainly looking forward to sharpen my coding skill and get more experience in coding practices.
Labaran Iben | Java, C#, HTML | NA | Basically I am here to learn. I am willing to learn new languages through you guys and new technologies as well so that I can compete in the disruptive technological era. I a certain that the team members would do there best to enhancing my programming skills.

## The Agile manifesto

### Values

* Individuals and interactions over processes and tools
* Working software over comprehensive documentation
* Customer collaboration over contract negotiation
* Responding to change over following a plan

* [Manifesto](https://agilemanifesto.org/)
* [Principles - must read](https://agilemanifesto.org/principles.html)

# A curated list of learning resources

* [Java for small teams](https://ncrcoe.gitbooks.io/java-for-small-teams/content/) - a free book for server-side Java development
* [Create and use GPG key to sign your commits](https://georgeracu.github.io/2019/09/10/setup-gpg-and-git-sign-on-mac.html)
* [GitHub help on creating GPG keys for all platforms](https://help.github.com/en/articles/generating-a-new-gpg-key)
* [Git book](https://git-scm.com/book/en/v2)

# Setup a development machine

## Mac version

### Install [Homebrew](https://brew.sh/) for package management

Homebrew is not the only package manager for Macintosh (Apple) machines, but is very popular. If you think that you can achieve the same result using a different tool for package management, please feel free to use it.

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### Install [nvm](https://github.com/nvm-sh/nvm)(NodeJS Version Manager)

NVM will help us choose which version of NodeJS to install and to use.

`brew install nvm`

After installing with brew, you might need some additional steps:
`mkdir ~/.nvm`

Edit your `~/.bash_profile` (or other shell config you might use):

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

### Install NodeJS

At the moment of this writing, NodeJS v.10 was the latest LTS version so we will install and use that one.

```bash
nvm install 10
nvm use 10
```

### NPM version

```bash
npm 6.4.1
```

If you do `node --version` you should see `v10.16.3` or whatever is the latest. If you get an error to delete prefix, then you might need to run the command suggested by Brew, something like: `nvm use --delete-prefix v10.16.3`.

### Install [React-native](https://facebook.github.io/react-native/)

We will install it using classic CLI, not using Expo. Expo is cool, but if our client wants to use some APIs that are not covered by Expo, then we cannot use native modules. We will go the classic way now.

#### Install [yarn](https://yarnpkg.com/lang/en/)

This is a dependency management tool for the NodeJS.
This might also install `node`, in case you don't have it installed already.

`brew install yarn`

#### Install [Watchman](https://facebook.github.io/watchman/)

This is a file system watcher that is used to perform actions when files change. In this case, does hot reload and some other goodies.

`brew install watchman`

#### Install Java 8 from OpenJDK

We need Java. Java is everywhere :)

```bash
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

#### Install the React Native CLI (finally what we care about)

`npm install -g react-native-cli`

### Install Android Studio and Android SDK

This is going to take a while and a lot of your network bandwith, so get a coffee and be ready.

A few particular options to choose when installing:

* Android SDK
* Android SDK Platform
* Performance (Intel HAXM)
* Android Virtual Device
* Android version 9 (Pie)
* Android SDK Platform 28
* Google APIs Intel x86 Atom System Image
* Android SDK Build-Tools v. 28.0.3

#### Setup your environment variables

In your `~/.bash_profile` or `$HOME/.bashrc` config file:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Now source your config file `source $HOME/.bash_profile`.

##### Extra settings for Android Studio SDK

Open `Preferences` menu with `cmd + ,` and go to `Android SDK` and here make sure that you have installed:

* SDK Platforms
  * Android 9.0 (Pie)
* SDK Tools
  * NDK (Side bys side)
  * Android Emulator 29.2.1
  * Android SDK Platform-Tools 29.0.4
  * Android SDK Tools 26.1.1, In
  * Intel x86 Emulator Accelerator (HAXM installer)

## Windows version

Aside from Chocolatey, the process is identical to a Mac environment. Refer to Mac instructions for details on each section, as this will just replicate the steps in a Windows environment.

### Install [Chocolatey](https://chocolatey.org) for Windows package management

In an elevated PowerShell run:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

#### Install NodeJS

```bash
choco install nodejs-lts --version=10.16.3
```

#### Install python 2 (and 3 for good measure, not sure how old my guide is!)

```bash
choco install -y python2
choco install -y python3
```

#### Install Java8

```bash
choco install -y jdk8
```

### Install React-native

Restart PowerShell to make sure everything went through. Then run:

```bash
npm install -g react-native-cli
```

#### Install Yarn

```bash
choco install yarn
```

### Install Android Studio

* Android SDK
* Android SDK Platform
* Performance (Intel HAXM)
* Android Virtual Device
* Android version 9 (Pie)
* Android SDK Platform 28
* Google APIs Intel x86 Atom System Image
* Android SDK Build-Tools v. 28.0.3

#### Download and run the Android Studio Installer

* Choose 'custom' install type
  * Select a theme
  
#### SDK Component Setup

* Android SDK
* Android SDK Platform
  * API 29: Android 10.0 (Q)
  * (It may not be possible to select 28 here - you can downgrade the API post-install via: AS Launcher/Configure/SDK Manager-Show Package Details and select 28.0.3)
* Performance (Intel HAXM)
* Android Virtual Device

## Running Locally

After a successful installation of the tools, just go to GitHub and clone the repository:

```bash
git clone git@github.com:georgeracu/947g5.git
```

After clonning the repository, do an npm install

```bash
cd 947g5
npm install
```

### Running the application in Android emulator

`react-native start` - will start the Metro server
`react-native run-android` - will start the application on Android. You need the Android emulator running first

### Git config

We have our git hooks versioned with our code in `infra/.githooks`. To enable them, you need to git >v2.9.0 and you need to run this command to tell git where to find its hooks:

```bash
git config core.hooksPath infra/.githooks
```

#### Git hooks

Git hooks will run when a git command will match it.

* __pre-push__ will run test and lint before push.

### Useful commands for npm:

* Run the tests `npm run test`
* Install the packages `npm clean`
* Run the linter `npm run lint`
* Run the linter and fix the problems `npm run lint-fix`

### Android commands

#### Android Emulators

##### Windows setup

* Add `ANDROID_HOME` path to your environment variables.
  * Open Settings (`WINDOWS+I`)
  * Type "environment" an click "Edit the system environment variables"
  * Click "Environment Variables"
  * Under System Variables, click `NEW`
    * Variable_name: `ANDROID_HOME`
    * Variable_value: `C:\Users\YOUR_ACCOUNT\AppData\Local\Android\Sdk`
    * Click OK
  * Under System Variables again, find `Path` and double click on it to edit, and at the bottom add:
    * `%ANDROID_HOME%\platform-tools`
    * `%ANDROID_HOME%\tools`
    * `%ANDROID_HOME%\tools\bin`

##### Starting the Emulator without Android Studio

Note: an Emulator will have to be set up in Android Studio first - this is for all successive launches.

* `emulator -list-avds` - will show all installed AVDs
* `emulator -avd Pixel_3_API_28 -netdelay none -netspeed full` - will run the AVD `Pixel_3_API_28`
* On Windows, specifiying the emulator path is necessary:
  * `%ANDROID_HOME%/emulator/emulator -avd Pixel_3_API_28 -netdelay none -netspeed full` - will run the AVD `Pixel_3_API_28`

### Build the apk for Android
=======
* `emulator -list-avds` - will show all installed AVDs
* `emulator -avd Pixel_3_API_28 -netdelay none -netspeed full` - will run the AVD `Pixel_3_API_28`

In directory `android` run `./gradlew assembleRelease -x bundleReleaseJsAndAssets`. The apk file should reside in `947g5/android/app/build/outputs/apk/release`.

## Testing

### Frameworks

#### [Jest v24.1.0](https://jestjs.io/)

* With preset `react-native`
* Mocked data in directory `__mocks__`

## Continuous Integration and Delivery

* CI Server is [Travis CI](https://travis-ci.com)
* Deployment using [fastlane](https://fastlane.tools/)
