import chalk from "chalk"
import { program } from "commander"
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import logSymbols from "log-symbols"
import { dirname } from "path"
import * as summon from "summon-ts-pr-1"
import { fileURLToPath } from "url"
import Spinner from "./spinner.js"

// Define the path to the package.json file to extract metadata for the CLI.
const packagePath = `${dirname(fileURLToPath(import.meta.url))}/..`
const { description, version } = JSON.parse(readFileSync(`${packagePath}/package.json`, "utf8"))

// Setup the CLI program with basic information and help text.
program
    .name("mpc-cli-summonc")
    .description(description)
    .version(version, "-v, --version", "Show MPC-create-app version.")
    .argument("<circuit-file>", "Circuit file to compile.")
    .allowExcessArguments(false)
    .action(async (circuitFilePath) => {
        if (!existsSync(circuitFilePath)) {
            console.info(`\n ${logSymbols.error}`, `error: the '${circuitFilePath}' file does not exist\n`)
            return
        }

        const currentDirectory = process.cwd()

        const spinner = new Spinner(`Compiling your circuit`)

        const circuitCode = readFileSync(circuitFilePath, "utf8")

        spinner.start()

        await summon.init()

        const circuit = summon.compile("/src/main.ts", {
            "/src/main.ts": circuitCode
        })

        spinner.stop()

        if (!existsSync(`${currentDirectory}/output`)) {
            mkdirSync(`${currentDirectory}/output`)
        }

        writeFileSync(`${currentDirectory}/output/circuit.txt`, circuit.bristol, "utf8")
        writeFileSync(`${currentDirectory}/output/circuit.json`, JSON.stringify(circuit.info, null, 4), "utf8")

        console.info(`\n ${logSymbols.success}`, `Your circuit has been compiled.\n`)
        console.info(` Check the ${chalk.cyan("output")} folder!\n`)
    })
    .configureOutput({
        outputError: (message) => {
            console.info(`\n ${logSymbols.error}`, message)
        }
    })

program.parse(process.argv)
