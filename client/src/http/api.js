import axios from "axios";
import ls from '@/helpers/localStorageHelpers.js';
import { showPopup } from "@/helpers/asyncStatusNotification";

export const API_URL = 'http://localhost:3000/api'

class apiService {
  constructor() {
    const asyncRequest = axios.create({
      withCredentials: true,
      baseURL: API_URL
    });

    asyncRequest.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${ls.getToken()}`
      return config
    });

    asyncRequest.interceptors.response.use((response) => {
      return response
    }, async (error) => {
      const originalRequest = error.config

      if (error.response.status == 401 && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
          const response = await axios.get("http://localhost/api/auth/refresh", { withCredentials: true });
          ls.saveToken(response.data.accessToken)
          return asyncRequest.request(originalRequest)
        } catch (error) {
          console.log('НЕ АВТОРИЗОВАН')
        }
      }
      showPopup();
      throw error
    });

    this.asyncRequest = asyncRequest;
  }
  /**
   * Performs a GET request to the server
   * @param {string} url The URL.
   * @param {Object} [config={}] Axios request configuration.
   * @returns {Promise<AxiosResponse>} The response from the server.
   */
  async get(url, config = {}) {
    try {
      const res = await this.asyncRequest.get(url, config);
      return res;
    } catch (e) {
      throw e;
    }
  }

  /**
 * Performs a POST request to the server
 * @param {string} url The URL.
 * @param {Object} [data={}] The request body.
 * @param {Object} [config={}] Axios request configuration.
 * @param {Boolean} [silent] Set silent to true to disable user notification
 * @returns {Promise<AxiosResponse>} The response from the server.
 */
  async post(url, data = {}, config = {}, silent = false) {
    try {
      const res = await this.asyncRequest.post(url, data, config);
      if (silent === false) {
        showPopup('success')
      };
      return res;
    } catch (e) {
      throw e;
    }
  }
  /**
* Performs a PUT request to the server
* @param {string} url The URL.
* @param {Object} [data={}] The request body.
* @param {Object} [config={}] Axios request configuration.
* @returns {Promise<AxiosResponse>} The response from the server.
*/
  async put(url, data = {}, config = {}) {
    try {
      const res = await this.asyncRequest.post(url, data, config);
      showPopup('success')
      return res;
    } catch (e) {
      throw e;
    }
  }
}

/* FOR OTHER REQUESTS */

export const $asyncGET = async function(url, config = {}) {
  try {
    return await axios.get(url, config);
  } catch (e) {
    console.log(e?.message);
    showPopup();
  }
}

export const $asyncPOST = async function(url, data = {}, config = {}, silent = false) {
  try {
    const res = await axios.post(url, data, config);
    if (silent === false) {
      showPopup('success')
    };
    return res;
  } catch(e) {
    console.log(e?.message);
    showPopup();
  }
}

export const $api = new apiService();
