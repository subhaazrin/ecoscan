# ecolove

### To test out the app, please follow the setup intstructions below:

## 1.Requirements

> Node.js LTS release
> Git
> Watchman for macOS or Linux users

*Only Node.js LTS releases (even-numbered) are recommended. As Node.js officially states, "Production applications should only use Active LTS or Maintenance LTS releases."*

## 2.Recommended Tools
> VSCode Editor

> VSCode Expo Extension for app.json debugging and autocomplete.

> Yarn

> Windows users: PowerShell, Bash via WSL, or the VSCode terminal.

## 3.Installing Expo CLI
```
npm install --global expo-cli
```
Verify that the installation was successful by running ```expo whoami```. You're not logged in yet, so you will see "Not logged in". You can create an account by running ```expo register``` if you like, or if you have one already run ```expo login```, but you also don't need an account to get started.

```
git branch -m firebase ecoscan
git fetch origin
git branch -u origin/ecoscan ecoscan
git remote set-head origin -a
```
