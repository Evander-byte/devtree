import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../interfaces";

export async function getUser() {
    try {
        const {data} = await api<User>('/user')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData: ProfileForm) {
    try {
        const {data} = await api.patch('/user', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}