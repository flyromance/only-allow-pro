#!/usr/bin/env node
const { match } = require("../lib");

const [wName, wVersioin] = process.argv.slice(2);

const cwd = process.cwd();
const isDep = cwd.indexOf("node_moudles") > -1; // 是否是依赖包

// 只有不是依赖包安装情况下才执行判断
if (!isDep && !match(wName, wVersioin)) {
  process.exit(1);
}
