import RNFetchBlob from 'rn-fetch-blob'

class ApiProvider {

    async postGraphQL(url, query) {
        const header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // console.log("POST" + url, JSON.stringify(query))

        let data = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({ query })
        }).then((response) => {            
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        }).then(([status, json]) => {
            // console.log("2nd Res", JSON.stringify(json))
            return ({ statusCode: status, jsonFile: json })
        })
            .catch((error) => console.log(error, " ErrorGraphQL"))

        return data;
    }

    async postKafka(url, body) {
        const header = {
            'Content-Type': 'application/vnd.kafka.json.v2+json',
            'Accept': 'application/json'
        }
        // console.log("POST Kafka" + url, JSON.stringify(body))

        let data = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)

        }).then((response) => {
            // console.log("RESPONSE Kafka", response)
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
            
        }).then(([status, json]) => {
            // console.log("2nd Res Kafka", JSON.stringify(json))
            return ({ statusCode: status, jsonFile: json })
        })
            .catch((error) => console.log(error, "ErrorKafka"))

        return data;
    }

    async postWSO2(url,body){
        const header ={
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
        // console.log("Post WSO2" + url,body)

        let data = await 
        RNFetchBlob.config({
            trusty: true
        })
        .fetch(url,{
            method: 'POST',
            headers: header,
            body: body
        }).then((response) => {
            // console.log("RESPONSE WSO2", response)
            const statusCode = response.status
            const data = response
            return Promise.all([statusCode, data])
        }).then(([status, json]) => {
            // console.log("2nd Res WSO2", json)
            return({statusCode: status, jsonFile: json})
        }).catch((error) => console.log(error, "Error WSO2"))

        return data;
    }

}
export default new ApiProvider()