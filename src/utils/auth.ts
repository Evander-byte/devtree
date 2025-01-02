import bcrypt from 'bcrypt'

export const ashPwd = async (pwd: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pwd, salt)
}

export const checkPwd = async (enteredPwd: string, ash: string) => {
    return await bcrypt.compare(enteredPwd, ash)

}