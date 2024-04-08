import User from "../../../types/User";

type UpdateProfileDto = Pick<User, 'firstName' | 'lastName' | 'email' | 'phoneNumber'>

export default  UpdateProfileDto