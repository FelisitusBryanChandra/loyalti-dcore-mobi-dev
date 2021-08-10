import Auth from './Auth';
import AsyncStorage from '@react-native-community/async-storage';

export const KEY_AUTH = "KEY_AUTH";

class AuthManager {

    signIn = (Email, Password) => {
        return new Promise((resolve, reject) => {
            Auth.login(Email, Password).then(async (result) => {
                AsyncStorage.setItem(KEY_AUTH, JSON.stringify({ result }));
                resolve(result.token)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    refreshToken = () => {
        return new Promise((resolve, reject) => { //still needs costumization
            this.getRefreshToken().then((refreshToken) => {
                AsyncStorage.setItem(CONST.AUTH, JSON.stringify({
                        ACCESS_TOKEN: result.access_token,
                        TOKEN_TYPE: result.token_type,
                        EXPIRES_IN: result.expires_in.toString(),
                        REFRESH_TOKEN: result.refresh_token,
                      })).then(() => resolve(true)).catch((err) => reject(err))
            }).catch((err) => reject(err))
        })
    }



}

export default new AuthManager();