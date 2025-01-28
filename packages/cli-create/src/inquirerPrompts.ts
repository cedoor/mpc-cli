import inquirer from "inquirer"

/**
 * Prompts the user to input the name of their project. Provides a default name of "my-app".
 * @returns A promise that resolves to the user's input for the project name.
 */
export async function getProjectName() {
    const { projectName } = await inquirer.prompt({
        name: "projectName",
        type: "input",
        message: "What is your project name?",
        default: "my-app"
    })

    return projectName
}

/**
 * Prompts the user to select a template from a list of supported templates. Each template is presented
 * with its value and name for better clarity.
 * @param supportedTemplates An array of objects, each containing a 'value' and 'name' property for the template.
 * @returns A promise that resolves to the selected template's value.
 */
export async function getSupportedTemplate(supportedTemplates: any[]) {
    const { selectedTemplate } = await inquirer.prompt({
        name: "selectedTemplate",
        type: "list",
        message: "Select one of the supported templates:",
        default: 0,
        choices: supportedTemplates.map((template) => ({
            value: template,
            name: template.description
        }))
    })

    return selectedTemplate
}
