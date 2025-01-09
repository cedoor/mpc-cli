import {EmpWasmBackend} from "emp-wasm-backend"
import {Protocol} from "mpc-framework"
import * as summon from "summon-ts"
import getCircuitFile from "./getCircuitFiles"

export default async function generateProtocol() {
    await summon.init()

    const circuit = summon.compileBoolean("circuit/main.ts", 16, await getCircuitFile())

    const mpcSettings = [
        {
            name: "alice",
            inputs: ["a"],
            outputs: ["main"]
        },
        {
            name: "bob",
            inputs: ["b"],
            outputs: ["main"]
        }
    ]

    return new Protocol(circuit, mpcSettings, new EmpWasmBackend())
}
