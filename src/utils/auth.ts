import bcrypt from 'bcrypt'

export const ashPwd = async (pwd: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pwd, salt)
}