const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const input = document.getElementById('selected');
const typing = document.querySelector(".typing");
window.canType = true;
const prefix = "&gt;  "
let clear = true;
let commandsRun = 0;

input.focus();

input.addEventListener('input', function () {
    console.log("hit")
    if (window.canType) {
        if (input.value != "") {
            if (clear) {
                typing.innerHTML = prefix
                clear = false;
            }
            var currentText = typing.innerHTML;
            typing.innerHTML = currentText + input.value;
        }
        input.value = '';
        input.focus();
    }
});

input.addEventListener('focusout', (event) => input.focus());
document.addEventListener("click", (event) => input.focus());

document.addEventListener("keydown", function (event) {
    let input = typing.innerHTML.slice(prefix.length);
    if (event.code == "ArrowRight" && input != "") {
        navigator.clipboard.writeText(input);
        typing.innerHTML = "Copied to Clipboard";
        clear = true;
    } else if (event.code == "Backspace") {
        if (clear) {
            typing.innerHTML = prefix
            clear = false;
        }
        if (typing.innerHTML.length > prefix.length) {
            typing.innerHTML = typing.innerHTML.slice(0, -1);
        }
    } else if (event.code == "Enter") {
        var currentText = input;
        let command = currentText.split(" ")[0].toLowerCase();
        let args = currentText.split(" ").slice(1);

        if (commands && commands[command]) {
            if (commands[command].function) commands[command].function(args);
            if (commands[command].message) typing.innerHTML = commands[command].message;
            if (commands[command].vars) {
                for (var i = 0; i < commands[command].set.length; i++) {
                    window[commands[command].set[i].name] = commands[command].set[i].value;
                }
            }
        } else typing.innerHTML = "Command Not Found";
        clear = true;
        commandsRun++;
    }

});