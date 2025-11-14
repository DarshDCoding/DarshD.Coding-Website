// runAll.js
import cards from "./src/lib/cardDetails.js"
import { spawn } from "child_process";

for (const card of cards) {
    const run = spawn("node", ["screenshot.js", card.url, card.file], {
        stdio: "inherit"
    });

    run.on("close", () => console.log(`Done: ${card.file}`));
}
