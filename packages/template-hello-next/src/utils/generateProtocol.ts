import * as summon from "summon-ts"
import { Protocol } from "mpc-framework"
import { EmpWasmBackend } from "emp-wasm-backend"
import main from '../circuit/main?raw';

export default async function generateProtocol() {
    await summon.init()

    const circuit = summon.compileBoolean("circuit/main.ts", 16, {
        "circuit/main.ts": main
    })

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
