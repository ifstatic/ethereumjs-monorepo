/*
  This script sets hardhat-core's ethereumjs dependencies to the versions created from the e2e-resolutions.js script.
 */

const fs = require('fs')

const resolutions = require(`${process.cwd()}/resolutions.json`)

const corePackageJsonLocation = `${process.cwd()}/hardhat/packages/hardhat-core/package.json`
const corePackageJson = require(corePackageJsonLocation)

const newCorePackageJson = {
  ...corePackageJson,
  dependencies: {
    ...corePackageJson.dependencies,
    ...resolutions
  },
  devDependencies: {
    ...corePackageJson.devDependencies,
    "@types/node": "^16.0.0" // fixes a build issue by using the node version set in .github/workflows/e2e-hardhat.yml
  }
}

fs.writeFileSync(
  corePackageJsonLocation,
  JSON.stringify(newCorePackageJson, null, 2)
)