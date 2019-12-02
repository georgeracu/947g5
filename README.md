# Advanced Software Engineering 947G5 project

[![Build Status](https://travis-ci.com/georgeracu/947g5.svg?branch=master)](https://travis-ci.com/georgeracu/947g5)

"Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand."
__Norm Kerth, Project Retrospectives: A Handbook for Team Review__

Table of Contents

* [Team Composition](#team-composition)
* [We are Agile](#the-agile-manifesto)
  * [Prime Directive](#prime-directive)
  * [Agile values](#agile-values)
* [Learning Resources](#a-curated-list-of-learning-resources)
  * [Java for small teams](https://ncrcoe.gitbooks.io/java-for-small-teams/content/)
  * [Create and use GPG key to sign your commits](https://georgeracu.github.io/2019/09/10/setup-gpg-and-git-sign-on-mac.html)
  * [GitHub help on creating GPG keys for all platforms](https://help.github.com/en/articles/generating-a-new-gpg-key)
  * [Git book](https://git-scm.com/book/en/v2)
* [Setup a development machine](#setup-a-development-machine)
  * [Mac version](#mac-version)
  * [Windows version](#windows-version)
  * [Running the app locally](#running-locally)
    * [Run the iOS Simulator](#run-the-ios-simulator)
* [Android commands](#android-commands)
* [Testing](#testing)
  * [Fastlane](#fastlane)
* [Continuous Integration and Delivery](#continuous-integration-and-delivery)
  * [Secrets per environment](#secrets-per-environment)
* [Vulnerabilities automatic scanning](#security-and-vulnerability-scanning)
* [Slack integrations](#slack-integrations)
* [Code Quality](#code-quality)
  * [Code Review](#code-review)

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

### Prime Directive

We use the Prime Directive as the base for an empathic and respectful conversation in our communication inside the team. More details can be found in this [blog post](https://www.thoughtworks.com/insights/blog/applying-prime-directive-beyond-retrospective)

### Agile Values

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

Git hooks will run when a git command will match it. We have our git hooks versioned with our code in `infra/.githooks`. 
To enable them, you need to git >v2.9.0 and you need to run this command to tell git where to find its hooks:

```bash
git config core.hooksPath infra/.githooks
```

#### Git hooks

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

* `emulator -list-avds` - will show all installed AVDs
* `emulator -avd Pixel_3_API_28 -netdelay none -netspeed full` - will run the AVD `Pixel_3_API_28`

In directory `android` run `./gradlew assembleRelease -x bundleReleaseJsAndAssets`. The apk file should reside in `947g5/android/app/build/outputs/apk/release`.

### Run the iOS simulator

Required:
* XCode v10+ with Command line tools
* Cocoapods (in project root run `gem install cocoapods`)
* iOS Simulator v12.4

How to start the app for iOS:

* in project root `gem install cocoapods`
* in ios directory of the app `pod install`
* in project root `react-native run-ios`

## Testing

### [Jest v24.1.0](https://jestjs.io/)

* With preset `react-native`
* Mocked data in directory `__mocks__`
* Running tests with `npm test`
* Recreating the snapshots when the UI changes with `npm test -- -u`
* Android tests from npm: `npm run android-test`
* iOS tests from npm: `npm run ios-test`

### Fastlane

#### Why [fastlane](https://fastlane.tools/)

Fastlane provides a common API for building, testing, packaging and deploying native applications for both Android and iOS.
Having a common API that is also extensible with plugins is makes it easier to abstract the differences in tooling between
these two platforms. We have to use only one tool (fastlane) to achieve the same goal on two different platform.

Because the same tool is used for both platforms, in order to differentiate which lane ran, lanes have a prefix of `ios_`
or `android_`. This way, when fastlane reports back to Slack, we know which lane ran.

#### Installation

Fastlane is installed as a Ruby gem and is working based on a `Fastfile`, which is a specification file where we define
`lanes` and we can invoke them in the build-test pipeline.
First of of ll you need to make sure that you are in `/android` or `/ios` directory. Then you need to install the gem bundle.

```shell script
bundle install
bundle exec fastlane install_plugins
```

#### Usage

Fastlane can run for us `lanes` that are defined in the `Fastfile`. Make sure to wrap all fastlane commands in `bundle exec`
such that they are running faster.

```shell script
bundle exec fastlane ios_tests
```

#### Slack integration

Fastlane is using a Slack incoming hook to post a message with the status of the lane run. This helps us have faster 
feedback on the status of each lane, without having to check the CI servere.

### Android

To run Android only tests, we use Gradle wrapper and JUnit as the test runner and the testing framework.

```shell script
cd android
./gradlew test
```

Gradle is smart enough to detect if there are no changes in tests and it will not run the tests, so it needs a push.

```shell script
cd android
./gradlew cleanTest test
```

Gradle test tasks are defined in app level `app/build.gradle` file.

### iOS

iOS has a two test schemes: `MyAwesomeApp` and `MyAwesomeAppUITests`. The UI version is used for screenshots by `screengrabber`.

```shell script
cd ios
xcodebuild \
  -workspace MyAwesomeApp.xcworkspace \
  -scheme "MyAwesomeApp" \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,OS=11.0,name=iPhone 8' \
  test
```

Based on which `scheme` you try to run, you can switch it in the command above.

## Continuous Integration and Delivery

We chose to do Continuous Delivery and leave the automated deployment to be triggered manually once we are happy with our 
testing results. 

* CI Server is [Travis CI](https://travis-ci.com)
* Deployment using [fastlane](https://fastlane.tools/)

![CI CD diagram](docs/img/CI_CD%20pipeline.drawio.png "CI CD diagram")

### CI stages

In Travis CI stages run sequential.

#### Tests run when build `type = pull_request`

This stage is running three jobs: Node.js tests, Android tests and iOS tests. All the jobs in a stage run in parallel to speedup the feedback cycle.

#### Version patch runs when `(branch = master) AND (type = push) AND (env(BETA_RELEASE) = true)`

We do automatic version patch with each merge to `master`. This process is handled by Travis CI for us.

#### Beta release runs when `(branch = master) AND (type = push) AND (env(BETA_RELEASE) = true)`

Fastlane takes care of creating an APK for us and distributing to Firebase for beta testing. Firebase will notify via email all our users from the beta testing group about the new version available.

#### Release runs when `(branch = master) AND (type != push) AND (env(MASTER_RELEASE) = true)`

This is an automatic process that gets triggered when we toggle the flag `RELEASE_MASTER`. This allows us to release certain build versions.

### Secrets per environment

Secrets are encrypted locally before being uploaded to Travis CI. Travis is able to decrypt them when needed in the
pipeline. Travis CI is using private/public key cryptography to encrypt/decrypt secrets.

Separating environments between `test`, `beta` and `production` is crucial due to several reasons:
* Avoid exposing access credentials for any of the environments
* Keep data separated between testing and production
* Allow integration to break in test and beta but not in production.

Secrets are kept in `./infra/secrets` and are organized in directories, per environment: `/dev, /beta, /prod`.
When the CI pipeline runs, based on who triggered the pipeline, secrets from one of the directories are copied
into the right location for the pipeline to run. For push and PR builds, the environment is considered to be in
development and `dev` secrets are used. After merging to `master`, the commit has promoted to `beta` and the 
corresponding secrets are used to trigger a build and distribution of a beta build. For release triggers (manually)
the pipeline is in `production`. 

#### How to add new secrets

First make sure that you are logged in to Travis CI `travis login --com --github-token <token_here>`

##### For environment variables

* Using Travis CI web UI you can add the secrets.
* Using the Travis CI cli to encrypt and upload your value: `travis encrypt <your value here> --add`. Then just commit
the change to the `.travis.yml` file.

##### For files

* For one file is just `travis encrypt-file <file_name_here> --add`. Then commit the `file_name_here.enc` and the
changes to the `.travis.yml` file.
* For encrypting multiple files:

```shell script
tar cvf secrets.tar <directory_with_files>
travis encrypt-file secrets.tar --com --add # --com is for travis.com vs travis.org 
```

Then commit the `secrets.tar.enc` and the changes to the `.travis.yml` file.

#### How to use them

Travis CI will make sure that the files are decrypted in the `before_install` stage. You will need to extract the
archive from secrets.tar and then copy the files where you need them.

```shell script
tar zxvf secrets.tar
cp infra/secrets/beta/google-services.json android/app
cp infra/secrets/beta/newagent.json android
```

## Security and Vulnerability scanning

We continuously scan our repository for vulnerabilities using [Snyk](https://snyk.io/). When automatic upgrades are possible, 
Snyk will raise PRs with the changes. At the same time it will inform us via a Slack web hook.
We also use GitHub's internal scanner that will allow dependabot to raise PRs with fixes.
Last but not least we use npm's `npm audit` command to generate reports of vulnerabilities and `npm audit fix` to fix them.

## Slack integrations

* GitHub for new PRs, updates on PRs and merges to master
* Fastlane for successful or erroneous lane run
* Travis CI for the build status
* Trello for creating and updating cards
* Snyk for vulnerability reporting
* SonarCloud for quality report after each run

## Code Quality

We use code reviews and [SonarCloud](https://sonarcloud.io) to keep our code quality to a high standard. Each pull request is reviewed and analyzed and
a report is generated. If the code quality falls bellow the setup threshold then the PR doesn't pass the CI stage.

SonarCloud is a source of tech debt related tasks. Using the report generated from each quality gate we have a continuous source of improvements suggestions.

### Code review

Using [Google's](https://google.github.io/eng-practices/review/reviewer/looking-for.html#summary) advice on doing a code review, you should make sure that:

* The code is well-designed.
* The functionality is good for the users of the code.
* Any UI changes are sensible and look good.
* Any parallel programming is done safely.
* The code isn’t more complex than it needs to be.
* The developer isn’t implementing things they might need in the future but don’t know they need now.
* Code has appropriate unit tests.
* Tests are well-designed.
* The developer used clear names for everything.
* Comments are clear and useful, and mostly explain why instead of what.
* Code is appropriately documented (generally in g3doc).
* The code conforms to our style guides.

Make sure to review every line of code you’ve been asked to review, look at the context, make sure you’re improving code health, and compliment developers on good things that they do.
