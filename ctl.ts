import { flags } from "./deps.ts";

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

const help = `briectl
Command line tool for Deno Deploy.

SUBCOMMANDS:
    open        Open application in web browser
`;

if (import.meta.main) {
    const args = parseArgs(Deno.args);

    const subcommand = args._.shift();
    switch (subcommand) {
        case "open":
            console.log("open")
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