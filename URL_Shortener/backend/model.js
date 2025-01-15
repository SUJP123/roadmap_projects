// backend/model.js

// Global Var for Short Code Length
const shortCodeLength = 8;
const idLength = 16;

class Url {
    constructor(url, createdAt) {
        this._id = this.generateId(idLength);
        this.url = url;
        this.shortCode = this.generateShortCode(shortCodeLength);
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    generateId(length) {
        let res = '';
        let nums = '0123456789';
        const numsLength = nums.length;

        for (let i = 0; i < length; i++) {
            res += nums.charAt(Math.floor(Math.random() * numsLength));
        }

        return res;
    }

    generateShortCode(length) {
        let res = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            res += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return res;
    }
}

export default Url;