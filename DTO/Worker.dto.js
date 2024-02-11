module.exports = class WorkerDTO {
    full_name
    id
    position

    constructor(model){
        this.full_name = model.full_name
        this.position = model.position
        this.id = model.id
    }
}