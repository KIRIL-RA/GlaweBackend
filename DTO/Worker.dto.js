module.exports = class WorkerDTO {
    full_name
    id
    phone_number
    position

    constructor(model){
        this.full_name = model.full_name
        this.id = model.id
        this.phone_number = model.phone_number
        this.position = model.position
    }
}