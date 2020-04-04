# Command processor extension

Extension to handle command blocks based on prefix that can be used in combination with eg. serial communication.


## Example
```
function trim(n: string): string {
    while (n.charCodeAt(n.length - 1) < 0x1f) {
        n = n.slice(0, n.length - 1)
    }
    return n;
}

serial.redirect(SerialPin.P0, SerialPin.P1, 115200)

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let receivedCmd = serial.readUntil("\n")
    receivedCmd = trim(receivedCmd)
    if (receivedCmd.length < 1) {
        return;
    }

    commandProcessor.ProcessCommand(receivedCmd)
})

// Commands
function echoVersion() {
    serial.writeString("Test")
}

function MCommandProcessor(command: string) {
    let cmdArgs = command.split(" ")
    let cmdId = parseInt(cmdArgs[0])

    switch (cmdId) {
        case 0:       // echo version
            echoVersion()
            break;
    }
}

// Start
commandProcessor.SetProcessor('M', MCommandProcessor)
commandProcessor.ProcessCommand("M0")    //echoVersion()
```