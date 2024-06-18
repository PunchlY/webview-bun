
await dl();

function name() {
    switch (process.platform) {
        case "win32": return "libwebview.dll";
        case "linux": return "libwebview.so";
        case "darwin": return `libwebview.${process.arch}.dylib`;
        default: throw "unsupported platform: " + process.platform;
    }
}

async function dl() {
    const path = lib_path();
    if (Bun.env.NODE_ENV === 'development')
        if (Bun.file(path).size)
            return;
    await Bun.$`curl -sSLo "${path}" "https://github.com/tr1ckydev/webview-bun/releases/latest/download/${name()}"`.nothrow();
}

export function lib_path() {
    return `${import.meta.dir}/../build/${name()}`;
}
