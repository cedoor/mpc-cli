import typescript from "@rollup/plugin-typescript"
import fs from "fs"
import cleanup from "rollup-plugin-cleanup"

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"))
const banner = `#!/usr/bin/env node

/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Cedoor ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/
`

export default {
    input: "src/index.ts",
    output: [{ file: pkg.bin.summonc, format: "es", banner }],
    external: [...Object.keys(pkg.dependencies), "url", "fs", "path", "child_process"],
    plugins: [
        typescript({
            tsconfig: "./build.tsconfig.json"
        }),
        cleanup({ comments: "jsdoc" })
    ]
}
