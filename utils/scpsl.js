const axios = require("axios");
module.exports = {
    getServers: async () => {
        try {
            let response = await axios.get(`https://api.scpslgame.com/serverinfo.php?id=${config["API"].AccountID}&key=${config["API"].KEY}&players=true&list=true&pastebin=true&version=true&flags=true`)
            response = response.data;
            if(response.Servers) {
                return response.Servers;
            } else {
                return [];
            }
        } catch(e) {
            return [];
        }
    } 
}