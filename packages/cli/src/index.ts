import chalk from "chalk"
import { program } from "commander"
// import decompress from "decompress"
import { existsSync, readFileSync } from "fs"
import logSymbols from "log-symbols"
import pacote from "pacote"
import { dirname } from "path"
import { fileURLToPath } from "url"
import checkLatestVersion from "./checkLatestVersion.js"
import { getProjectName } from "./inquirerPrompts.js"
// import removePrePublishScript from "./removePrePublishScript.js"
import Spinner from "./spinner.js"

// Define the path to the package.json file to extract metadata for the CLI.
const packagePath = `${dirname(fileURLToPath(import.meta.url))}/..`
const { description, version } = JSON.parse(readFileSync(`${packagePath}/package.json`, "utf8"))

// List of supported templates for project creation.
const supportedTemplates = [
    {
        value: "hello",
        name: "React + Vite + MPC-framework"
    }
]

// Setup the CLI program with basic information and help text.
program
    .name("mpc-cli-create")
    .description(description)
    .version(version, "-v, --version", "Show MPC-create-app version.")
    .argument("[project-directory]", "Directory of the project.")
    // .option("-t, --template <template-name>", "Supported template.")
    .allowExcessArguments(false)
    .action(async (projectDirectory, { template = "hello" }) => {
        if (!projectDirectory) {
            projectDirectory = await getProjectName()
        }

        // if (!template) {
        //    template = await getSupportedTemplate(supportedTemplates)
        // }

        if (!supportedTemplates.some((t) => t.value === template)) {
            console.info(`\n ${logSymbols.error}`, `error: the template '${template}' is not supported\n`)
            return
        }

        const currentDirectory = process.cwd()
        const spinner = new Spinner(`Creating your project in ${chalk.green(`./${projectDirectory}`)}`)

        if (existsSync(projectDirectory)) {
            console.info(`\n ${logSymbols.error}`, `error: the '${projectDirectory}' folder already exists\n`)
            return
        }

        spinner.start()

        await checkLatestVersion(version)

        // Extract the template package into the project directory.
        await pacote.extract(`@mpc-cli/template-${template}@${version}`, `${currentDirectory}/${projectDirectory}`)

        // Decompress the template files after extraction.
        // await decompress(`${currentDirectory}/${projectDirectory}/files.tgz`, `${currentDirectory}/${projectDirectory}`)

        // Clean up the compressed file after extraction.
        // unlinkSync(`${currentDirectory}/${projectDirectory}/files.tgz`)

        // Read and modify package.json to remove prepublish script
        const packageJsonPath = `${currentDirectory}/${projectDirectory}/package.json`
        const packageJsonContent = readFileSync(packageJsonPath, "utf8")
        // const updatedPackageJsonContent = removePrePublishScript(packageJsonContent)
        // writeFileSync(packageJsonPath, updatedPackageJsonContent)

        spinner.stop()

        console.info(`\n ${logSymbols.success}`, `Your project is ready!\n`)
        console.info(` Please, install your dependencies by running:\n`)
        console.info(`   ${chalk.cyan("cd")} ${projectDirectory}`)
        console.info(`   ${chalk.cyan("npm install")}\n`)

        // Read the package.json to list available npm scripts.
        const { scripts } = JSON.parse(packageJsonContent)

        if (scripts) {
            console.info(` Available scripts:\n`)

            console.info(
                `${Object.keys(scripts)
                    .map((s) => `   ${chalk.cyan(`npm run ${s}`)}`)
                    .join("\n")}\n`
            )

            console.info(` See the README.md for more information!\n`)
        }
    })
    .configureOutput({
        outputError: (message) => {
            console.info(`\n ${logSymbols.error}`, message)
        }
    })

program.parse(process.argv)
