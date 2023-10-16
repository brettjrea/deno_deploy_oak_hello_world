import { flags, open } from "./deps.ts";

// NOTE -- temporary name
const BINARY_NAME = "tempctl";

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

type OpenArgs = {
    help: boolean;
};

// deno-lint-ignore no-explicit-any
async function openSubcommand(rawArgs: Record<string, any>): Promise<void> {
    const args: OpenArgs = {
        help: !!rawArgs.help,
    };

    if (args.help) {
        console.log(help);
        Deno.exit(0);
    }

    // TODO -- pass argument
    // FIX -- error on wsl2
    await open("http://localhost:8000", { wait: false });
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