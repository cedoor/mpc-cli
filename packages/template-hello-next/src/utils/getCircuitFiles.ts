export default async function getCircuitFile() {
    const path = "circuit/main.ts"

    const response = await fetch(path)
    const main = await response.text()

    return {
        [path]: main
    }
}
