import { auth } from "@clerk/nextjs/server";

const allowedIds = [
    "user_2tPwNUyOsFXmmZLRVyYtzX0e4Gu"
]
export const getIsAdmin = async() =>{

    const {userId} =  await auth();
    if(!userId) return false;

    return allowedIds.indexOf(userId) !== -1

}