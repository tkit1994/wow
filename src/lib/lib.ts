import fs from "fs";

function createSymbolLink(source: string, target: string) {
    if (fs.existsSync(target)) {
        fs.unlinkSync(target);
    }
    fs.symlinkSync(source, target, "dir");
}

export default { createSymbolLink };
