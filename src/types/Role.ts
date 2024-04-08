enum RoleEnum {
    ADMIN = 'ADMIN',
    MANAGER = "MANAGER",
    OPERATOR = "OPERATOR"
  };

export default interface Role {
    id: number
    name: "ADMIN" | "MANAGER" | "OPERATOR"
}