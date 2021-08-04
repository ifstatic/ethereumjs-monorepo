/*
  This script injects the `resolutions.json` file created by
  the e2e-resolutions.js script into hardhat's root `package.json`.
 */

const fs = require('fs')

const resolutions = require(`${process.cwd()}/resolutions.json`)

// for yarn workspaces, resolutions need to be
// placed in the root package.json
// (https://github.com/yarnpkg/yarn/issues/5039#issuecomment-880166818)
const rootPackageJsonLocation = `${process.cwd()}/hardhat/package.json`
const rootPackageJson = require(rootPackageJsonLocation)

const newRootPackageJson = { ...rootPackageJson, resolutions }

newRootPackageJson.resolutions['@types/bn.js'] = '5.1.0' // adds specific module that hardhat can't find by default
newRootPackageJson.resolutions['eth-sig-util'] = '3.0.1' // resolves provider eth_signTypedData_v4 error

fs.writeFileSync(
  rootPackageJsonLocation,
  JSON.stringify(newRootPackageJson, null, 2)
)
