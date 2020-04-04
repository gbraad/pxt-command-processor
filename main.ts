namespace commandprocessor {

    // Command processor
    type CommandProcessor = (cmd: string) => void

    // Array definition to allow string indexer
    interface CommandProcessors {
        [prefix: string]: CommandProcessor
    }

    let commandProcessors: CommandProcessors = {}

    export function SetProcessor(prefix: string, processor: CommandProcessor) {
        commandProcessors[prefix] = processor
    }

    export function ProcessCommand(command: string) {
        let cmdPrefix = command.slice(0, 1)
        let cmdParams = command.slice(1, command.length)

        let processor = commandProcessors[cmdPrefix]
        processor(cmdParams)
    }
}