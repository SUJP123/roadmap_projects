// backend/model.js

// Global Var for Short Code Length
const shortCodeLength = 8;

class Url {
    constructor(_id, url, createdAt) {
        this._id = _id;
        this.url = url;
        this.shortCode = this.generateShortCode(shortCodeLength);
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
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