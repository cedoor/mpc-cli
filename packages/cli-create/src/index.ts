import chalk from "chalk"
import { program } from "commander"
import { existsSync, readFileSync, renameSync, rmSync } from "fs"
import logSymbols from "log-symbols"
import { dirname } from "path"
import { CleanOptions, simpleGit, SimpleGit } from "simple-git"
import { fileURLToPath } from "url"
import { getProjectName, getSupportedTemplate } from "./inquirerPrompts.js"
import Spinner from "./spinner.js"

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)

// Define the path to the package.json file to extract metadata for the CLI.
const packagePath = `${dirname(fileURLToPath(import.meta.url))}/..`
const { description, version } = JSON.parse(readFileSync(`${packagePath}/package.json`, "utf8"))

// List of supported templates for project creation.
export const supportedTemplates = [
    {
        value: "hello-cc",
        description: "MPC Hello with Vite (client <> client)",
        repository: "voltrevo/mpc-hello",
        directory: "client-client"
    },
    {
        value: "hello-cs",
        description: "MPC Hello with Vite (client <> server)",
        repository: "voltrevo/mpc-hello",
        directory: "client-server"
    },
    {
        value: "hello-ss",
        description: "MPC Hello with Vite (server <> server)",
        repository: "voltrevo/mpc-hello",
        directory: "server-server"
    },
    {
        value: "hello-nextjs",
        description: "MPC Hello with NextJS (client <> client)",
        repository: "voltrevo/mpc-hello",
        directory: "next-js"
    },
    {
        value: "lizard-spock",
        description: "Rock Paper Shissors Lizard Spock (client <> client)",
        repository: "voltrevo/mpc-lizard-spock"
    },
    {
        value: "lovers",
        description: "2PC is for lovers (client <> client)",
        repository: "voltrevo/2pc-is-for-lovers"
    }
]

// Setup the CLI program with basic information and help text.
program
    .name("mpc-cli-create")
    .description(description)
    .version(version, "-v, --version", "Show MPC-create-app version.")
    .argument("[project-directory]", "Directory of the project.")
    .option("-t, --template <template-name>", "Supported template.")
    .allowExcessArguments(false)
    .action(async (projectDirectory, { template }) => {
        if (!projectDirectory) {
            projectDirectory = await getProjectName()
            console.info("")
        }

        if (!template) {
            template = await getSupportedTemplate(supportedTemplates)
            console.info("")
        } else {
            template = supportedTemplates.find((t) => t.value === template)

            if (!template) {
                console.info(` ${logSymbols.error}`, `error: the template '${template}' is not supported\n`)
                return
            }
        }

        const currentDirectory = process.cwd()
        const spinner = new Spinner(`Creating your project in ${chalk.green(`./${projectDirectory}`)}`)

        if (existsSync(projectDirectory)) {
            console.info(`${logSymbols.error}`, `error: the '${projectDirectory}' folder already exists\n`)
            return
        }

        spinner.start()

        // Clone the repository of the app into the project directory.
        await git.clone(`https://github.com/${template.repository}.git`, projectDirectory, [
            "--depth",
            "1",
            "--single-branch"
        ])

        // ...
        if (template.directory) {
            renameSync(`${currentDirectory}/${projectDirectory}`, `${currentDirectory}/${projectDirectory}-tmp`)

            renameSync(
                `${currentDirectory}/${projectDirectory}-tmp/${template.directory}`,
                `${currentDirectory}/${projectDirectory}`
            )

            rmSync(`${currentDirectory}/${projectDirectory}-tmp`, { recursive: true })
        } else {
            // Remove the .git file.
            rmSync(`${currentDirectory}/${projectDirectory}/.git`, { recursive: true })
        }

        // Get content from package.json file.
        const packageJsonPath = `${currentDirectory}/${projectDirectory}/package.json`
        const packageJsonContent = readFileSync(packageJsonPath, "utf8")

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
