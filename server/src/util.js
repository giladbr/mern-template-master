module.exports = {
    wordCount: (...strArr) => {
        let wordCounter = 0;
        for (let str of strArr) {
            wordCounter += str.trim().split(/\s+/).length
        }
        return wordCounter;
    },

    
};
