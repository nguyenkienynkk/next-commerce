import {post} from "@/app/service/service";

function login(payload) {
    return post('/login', payload)
}

export const userService = {
    login
}