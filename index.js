const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const input = document.getElementById('selected');
const typing = document.querySelector(".typing");

let clear = true;

setInterval(() => {
    console.log();
    if (input.value != "") {
        if (clear) {
            typing.innerHTML = ""
            clear = false;
        }
        var currentText = typing.innerHTML;
        typing.innerHTML = currentText + input.value;
    }
    input.value = '';
    input.focus();
}, 50);

let base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowUp" && typing.innerHTML != "") {
        typing.innerHTML = shift_up(typing.innerHTML);
    } else if (event.code == "ArrowDown" && typing.innerHTML != "") {
        typing.innerHTML = shift_down(typing.innerHTML);
    } else if (event.code == "ArrowRight" && typing.innerHTML != "") {
        navigator.clipboard.writeText(typing.innerHTML);
        typing.innerHTML = "Copied to Clipboard";
        clear = true;
    } else if (event.code == "Backspace") {
        if (clear) {
            typing.innerHTML = ""
            clear = false;
        }
        var currentText = typing.innerHTML;
        typing.innerHTML = currentText.slice(0, -1);
    } else if (event.code == "Enter") {
        var currentText = typing.innerHTML;
        if (commands && commands[currentText.toLowerCase()]) typing.innerHTML = commands[currentText.toLowerCase()];
        else typing.innerHTML = "Command Not Found";
        clear = true;
    }
});


function shift_down(s) {
    var r = "";
    var p = "";
    var c = s.length % 3;
    if (c > 0) {
        for (; c < 3; c++) {
            p += '=';
            s += "\0";
        }
    }
    for (c = 0; c < s.length; c += 3) {
        if (c > 0 && (c / 3 * 4) % 76 == 0) r += "\r\n";
        var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2);
        n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
        r += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];
    }

    return (r.substring(0, r.length - p.length) + p).replace(/(\r\n|\n|\r)/gm, "");;
}

function shift_up(s) {
    s = s.replace(new RegExp('[^' + base64chars.split("") + '=]', 'g'), "");
    var p = (s.charAt(s.length - 1) == '=' ? (s.charAt(s.length - 2) == '=' ? 'AA' : 'A') : "");
    var r = "";
    s = s.substr(0, s.length - p.length) + p;
    
    for (var c = 0; c < s.length; c += 4) {
        var n = (base64chars.indexOf(s.charAt(c)) << 18) + (base64chars.indexOf(s.charAt(c + 1)) << 12) +
            (base64chars.indexOf(s.charAt(c + 2)) << 6) + base64chars.indexOf(s.charAt(c + 3));
        r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
    }

    return r.substring(0, r.length - p.length);
}