#!/usr/bin/env ts-node
import { execSync } from "child_process"

async function main() {
    execSync(`yarn build`, { stdio: "inherit" })
    execSync(`yarn workspaces foreach -A --no-private npm publish --tolerate-republish --access public`, {
        stdio: "inherit"
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
