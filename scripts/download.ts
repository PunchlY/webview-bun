
await dl(lib());

function lib() {
    switch (process.platform) {
        case "win32": return "libwebview.dll";
        case "linux": return "libwebview.so";
        case "darwin": return `libwebview.${process.arch}.dylib`;
        default: throw "unsupported platform: " + process.platform;
    }
}

async function dl(filename: string) {
    await Bun.$`curl -sSLo "${import.meta.dir}/../build/${filename}" "https://github.com/tr1ckydev/webview-bun/releases/latest/download/${filename}"`.nothrow();
}

export function lib_path() {
    return `${import.meta.dir}/../build/${lib()}`;
}
