import bcrypt from "bcrypt"


export const hasPassword = async (password: string) => {
    const salt = await  bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const checkPassword = async (enteredPassword: string, hash: string) => {
    const checked = await bcrypt.compare(enteredPassword, hash)
    return checked
}