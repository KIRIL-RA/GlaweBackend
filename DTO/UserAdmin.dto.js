module.exports = class UserAdminDTO {
    role
    id
    full_name

    constructor(model){
        this.full_name = model.full_name
        this.role = model.user_role
        this.id = model.id
    }
}