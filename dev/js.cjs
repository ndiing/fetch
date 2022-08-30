class Mild {
    getAgentSellingProducts(payload = {}) {
        const url = `https://api.bukalapak.com/agent-selling-products?product_type=phone_credit`;        
        const options = {
          method: 'GET',
          headers: {
            'Bukalapak-Mitra-Version': '1088002',
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11; CPH2239 Build/RP1A.200720.011) 1088002 BLMitraAndroid',
            'X-User-Id': '560520443',
            'X-Device-Ad-Id': '8e2b7c1c037ea458',
            'Bukalapak-Identity': '8e2b7c1c037ea458',
            'Bukalapak-App-Version': '4037005',
            'Ad-User-Agent': 'com.bukalapak.mitra/1.88.2 (Android 11; in_ID; CPH2239; Build/RP1A.200720.011)',
            'Conversion-Tracking-Params': '8e2b7c1c037ea458 11 30 1.88.2',
            'http-referrer': '',
            Authorization: 'Bearer WUeGxRD1qKeQxVhhUbA8e01cexi6umKdRrfsNV-3lo6JvA'
          }
        };
                
        return fetch(url, options)
          .then(response => response.json())
          .then(response => (response))
          .catch(err => (err));
    }

}
