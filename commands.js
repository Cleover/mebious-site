var commands = {
    "help": {
        "message": " ",
        "function": function (args) {
            if (args.length == 0) commands.help.message = Object.keys(commands).join(", ");
            if (args.length == 1) commands.help.message = commands[args[0]].helpMessage;
        },
        "helpMessage": "help [command] - Shows all commands or help for a specific command"
    },
    "whoami": {
        "message": "you",
        "helpMessage": "whoami - Displays the current user"
    },
    "pastehelp": {
        "message": "ctrl+v = paste",
        "helpMessage": "pastehelp - Displays the paste shortcut"
    },
    "copyhelp": {
        "message": "Right Arrow = copy",
        "helpMessage": "copyhelp - Displays the copy shortcut"
    },
    "encode": {
        "message": " ",
        "function": function (args) {
            if (!args || args.length == 0) commands.encode.message = "Please enter a string to encode";
            else commands.encode.message = shift_up(args[0]);
        },
        "helpMessage": "encode [text] - Encodes text"
    },
    "decode": {
        "message": " ",
        "function": function (args) {
            if (!args || args.length == 0) commands.decode.message = "Please enter a string to decode";
            else commands.decode.message = shift_down(args[0]);
        },
        "helpMessage": "decode [text] - Decodes text"
    },
    "echo": {
        "message": " ",
        "function": function (args) {
            if (args && args.length > 0) commands.echo.message = args.join(" ");
        },
        "helpMessage": "echo [text] - Displays text"
    },
    "ls": {
        "message": " ",
        "function": function () {
            commands.ls.message = Object.keys(files).join(", ");
        },
        "helpMessage": "ls - Lists all files"
    },
    "cat": {
        "message": "File Not Found",
        "function": function (args) {
            if (args || args.length > 0 && files[args[0]] && files[args[0]].content) {
                commands.cat.message = files[args[0]].content;
            }
        },
        "helpMessage": "cat [file] - Displays the contents of a file"
    },
    // "play": {
    //   "message": "",
    //   "set": [{
    //     "name": "canType",
    //     "value": false
    //   }, {
    //     "name": "playingGame",
    //     "value": true
    //   }, {
    //     "name": "chapter",
    //     "value": "start"
    //   }, {
    //     "name": "page",
    //     "value": "begin"
    //   }]
    // }
}