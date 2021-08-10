import URI from './Uri'
import API from './Api'
import ApiProvider from './ApiProvider'

class ApiTargetEndPoint {

    async CustomerProfile(params) {
        const url = URI.CUSTOMER_API

        let query = `query {
            customers(${params}){
                userId
                firstName
                lastName
                dOB
                phoneNumber                
                city
                gender
                email
            }
          }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async CustomerWallet(params) {
        const url = URI.CUSTOMER_API
        let query = `
        query {
          cards${params}{            
            userCardId
            cardId
            programId
            merchantId
            merchantName
            title
            cardType
            iconImage
            currentRewardPoint
            rewardTarget
            validUntil
            templateColor
            termsAndCondition
            description
            iconImageStamp
            isLent
            isGiven
          }
        }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async MerchantAboutUs(params) {
        const url = URI.MERCHANT_API
        let query = `
        {
            merchant(page:0,size:5${params}){
               merchant_description
               merchant_gallery
            }
        }
        `

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async OutletLocation(params) {
        const url = URI.MERCHANT_API
        let query = `
        {
            outlet${params}{
                id
                outlet_name
                outlet_address
                outlet_city
                outlet_phone
                outlet_longitude
                outlet_latitude               
            }
        }
        `

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }


    async CollectCardPoint(params) {
        const url = URI.MERCHANT_API
        let query = `
        {
            totalpoint${params}{
                total_point
            }  
        }
        `
        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async merchantCardId(params) {
        const url = URI.MERCHANT_API
        let query = `
        {
            card(page:0${params}){
                id
                title 
                description
                current_point
                icon_image
            }  
        }
        `
        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async CustomerHome(param) {
        const url = URI.MERCHANT_API
        let query = `
        {
          program${param}{
            id
            card
            merchant_id
            program_image
            program_name
            merchant_name
            program_description
            terms_and_condition
            tier
          }          
        }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async CustomerSpecialHome(params) {
        const url = URI.MERCHANT_API
        let query = `
        {
          special${params}{
            id
            card
            merchant_id
            program_image
            program_name
            merchant_name
            program_description
            terms_and_condition
            tier
          }
        }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async PromoCategory(params) {
        const url = URI.MERCHANT_API
        let query = `{
            category${params}{
                category_name
                image_url
            }
        }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async RewardList(params) {
        const url = URI.CUSTOMER_API
        let query = `{
            rewards(${params}){
                rewardId
                title
                validUntil
                voucherId
                iconImage
            }
        }`

        let postValue = await ApiProvider.postGraphQL(url, query)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorGraphQl"])
                }
            } catch (err) { }
        })
    }

    async RegisterProfile(collection) {
        const url = URI.KAFKA_API + API.REGISTER
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async JoinPromoCard(collection) {
        const url = URI.KAFKA_API + API.JOINPROMO
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async CollectPromoCard(collection) {
        const url = URI.KAFKA_API + API.COLLECTPROMO
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async UpdateProfile(collection) {
        const url = URI.KAFKA_API + API.UPDATE_PROFILE
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async LendCard(collection) {
        const url = URI.KAFKA_API + API.LEND_CARD
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async GiveCard(collection) {
        const url = URI.KAFKA_API + API.GIVE_CARD
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async ReturnCard(collection) {
        const url = URI.KAFKA_API + API.RETURN_CARD
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }
        })
    }

    async RedeemReward(collection) {
        const url = URI.KAFKA_API + API.REDEEM_REWARD
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }            
        })        
    }

    async UseVoucher(collection) {
        const url = URI.KAFKA_API + API.USE_REWARD
        let body = {
            "records": [{ "value": collection }]
        }
        let postValue = await ApiProvider.postKafka(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorKafka"])
                }
            } catch (err) {
                console.log("CATCH", err)
            }            
        })        
    }

    async TranslateToken(token) {
        const url = URI.AUTH_API + API.TOKEN_TRANSLATE

        let body = {
            token
        }

        let postValue = await ApiProvider.postWSO2(url, body)

        let status = postValue.statusCode
        let data = postValue.jsonFile
        return new Promise((resolve, reject) => {
            try {
                if (status == 200) {
                    resolve(data)
                } else {
                    reject([status, "errorWSO2"])
                }
            } catch (err) {
                console.log("CATCH WSO2", err)
            }
        })
    }
}

export default new ApiTargetEndPoint()