export default async function getCircuitFiles() {
    const circuitFiles: Record<string, string> = {}

    const content = await import("../circuit/main.ts")

    console.log(content)

    //for (const [path, get] of Object.entries(files)) {
    //circuitFiles[path.slice(2)] = (await get()) as string
    //}

    return circuitFiles
}
