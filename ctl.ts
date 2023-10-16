import { flags } from "./deps.ts";

const BINARY_NAME = "briectl"

function parseArgs(args: Array<string>) {
    const parsed = flags(args, {
        alias: {
            help: "h"
        },
        boolean: [
            "help"
        ]
    });

    return parsed;
}

const help = `${BINARY_NAME}
Command line tool.

SUBCOMMANDS:
    open        Open application in web browser
`;

// deno-lint-ignore require-await no-explicit-any
async function openSubcommand(_rawArgs: Record<string, any>): Promise<void> {
    console.log("open subcommand")
}

if (import.meta.main) {
    const args = parseArgs(Deno.args);

    const subcommand = args._.shift();
    switch (subcommand) {
        case "open":
            await openSubcommand(args);
            break;
        default:
            if (args.help) {
                console.log(help);
                Deno.exit(0);
            }
            console.error(help);
            Deno.exit(1);
    }
}