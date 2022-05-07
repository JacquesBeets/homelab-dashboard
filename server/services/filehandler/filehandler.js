
const fsProm = require("fs/promises")
const fs = require("fs")
const path = require("path")


module.exports = {
    removeFile: async (documentPath) => {
        try {
            // Parse path
            let joinedPath = path.join(documentPath)
            // Check if file exists and has access before removing
            await fsProm.access(documentPath, fs.constants.R_OK | fs.constants.W_OK);
            // Remove file
            let response = await fsProm.rm(joinedPath, {maxRetries: 5})
            return response
;
          } catch (err) {
            console.error(err);
          }
    }
}