const semver = require("semver");

module.exports = {
  getPmInfo,
  match,
};

function getPmInfo() {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) return;

  // npm/x.x.x node/x.x.x
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return {
    name: name === "npminstall" ? "cnpm" : name,
    version: pmSpec.substring(separatorPos + 1),
  };
}

const supportedNames = ["node", "nodejs", "npm", "pnpm", "yarn", "cnpm"];

const curNodeVersion = process.version.slice(1);

function match(wantedName, wantedVersion) {
  if (!wantedName) {
    console.log(`cli name is required.`);
    return true;
  }

  if (supportedNames.indexOf(wantedName) < 0) {
    console.log(`cli name: ${wantedName} is not supported.`);
    return true;
  }

  if (wantedName === "node" || wantedName === "nodejs") {
    if (!wantedVersion) return true;
    if (!semver.satisfies(curNodeVersion, wantedVersion)) {
      console.log(
        `current node verion is ${curNodeVersion}, not match wanted version: ${wantedVersion}.`
      );
      return false;
    }
  }

  const { name, version } = getPmInfo();

  // can't find pm info
  if (!name) return true;

  // curentName is not match wantedName
  if (name !== wantedName) {
    console.log(
      `current package manager is: ${name}, not match wanted package manager: ${wantedName}.`
    );
    return false;
  }

  //   if (wantedVersion && !semver.valid(wantedVersion)) {
  //     console.log("version is invalid.");
  //     return true;
  //   }

  // curent version version is not match wanted version
  if (wantedVersion && !semver.satisfies(version, wantedVersion)) {
    console.log(
      `current ${name} version is: ${version}, not match wanted version: ${wantedVersion}.`
    );
    return false;
  }

  return true;
}
