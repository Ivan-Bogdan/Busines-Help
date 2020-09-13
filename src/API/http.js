import axios from 'axios'



export const regionList = (payload) => {


return axios.post('http://altproduction.ru:8080/rest/v1/region/',JSON.stringify(payload)).then(response => {
    console.log(response)
    return response.data 
})
.catch(error => {
    console.log(error)
    return error
})
}

export const districtList = (payload) => {


    return axios.post('http://altproduction.ru:8080/rest/v1/district/',JSON.stringify(payload))
.then(response => {
        console.log(response)
        return response.data
})
.catch(error => {
        console.log(error)
        return error
})
}

export const cityList = (payload) => {
    return axios.post('http://altproduction.ru:8080/rest/v1/city/',JSON.stringify(payload))
.then(response => {
        console.log(response.data.city)
        return response.data 
})
.catch(error => {
        console.log(error)
        return error
})
}