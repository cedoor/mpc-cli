// Since Next.js does not support import.meta.glob, fetch
// is used here instead.
export default async function getCircuitFiles() {
    const files: Record<string, string> = {
        "circuit/main.ts": "",
        "circuit/isLarger.ts": ""
    }

    for (const path of Object.keys(files)) {
        const response = await fetch(path)
        const code = await response.text()

        files[path] = code
    }

    return files
}
