const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const Production = sequelize.define("production" , {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    production_name : {type : DataTypes.STRING}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const UserAdmin = sequelize.define("user_admin", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    full_name : {type : DataTypes.STRING},
    user_role : {type : DataTypes.STRING},
    user_login : {type : DataTypes.STRING},
    user_password : {type : DataTypes.STRING}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(UserAdmin,{onDelete: 'CASCADE'})
UserAdmin.belongsTo(Production)

const TargetValues = sequelize.define("target_values", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    metric_type : {type : DataTypes.STRING},
    target_value : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(TargetValues,{onDelete: 'CASCADE'})
TargetValues.belongsTo(Production)

const ProductionTotal = sequelize.define("production_total", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    production_total_type : {type : DataTypes.STRING},
    production_total_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(ProductionTotal,{onDelete: 'CASCADE'})
ProductionTotal.belongsTo(Production)


const ReportModels = sequelize.define("report_models", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_model_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(ReportModels,{onDelete: 'CASCADE'})
ReportModels.belongsTo(Production)


const ReportBlocks = sequelize.define("report_blocks", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_block_type : {type : DataTypes.STRING},
    report_block_name : {type : DataTypes.STRING},
    report_block_source : {type : DataTypes.STRING},
    metric_type : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

ReportModels.hasMany(ReportBlocks,{onDelete: 'CASCADE'})
ReportBlocks.belongsTo(ReportModels)

const GeneratedReposrts = sequelize.define("generated_reports", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_name : {type : DataTypes.STRING},
    from_date : {type : DataTypes.DATE},
    to_date : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

ReportModels.hasMany(GeneratedReposrts,{
    foreignKey: 'generated_report_model_id',
    onDelete: 'CASCADE'
})
GeneratedReposrts.belongsTo(ReportModels)


const Shop = sequelize.define("shop", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    shop_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(Shop,{
    onDelete: 'CASCADE'
})
Shop.belongsTo(Production)

const ShopTotal = sequelize.define("shop_total", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    shop_total_type : {type : DataTypes.STRING},
    shop_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(ShopTotal,{
    onDelete: 'CASCADE'
})
ShopTotal.belongsTo(Production)

Shop.hasMany(ShopTotal,{
    onDelete: 'CASCADE'
})
ShopTotal.belongsTo(Shop)

const Worker = sequelize.define("worker", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    full_name : {type : DataTypes.STRING},
    phone_number : {type : DataTypes.STRING},
    position : {type : DataTypes.STRING},
    worker_login : {type : DataTypes.STRING},
    worker_password : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const WorkerActions = sequelize.define("worker_actions", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    action_class : {type : DataTypes.STRING},
    action_status : {type : DataTypes.STRING},
    action_time : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Worker.hasMany(WorkerActions,{
    onDelete: 'CASCADE'
})
WorkerActions.belongsTo(Worker)


const WorkerMetrics = sequelize.define("worker_metrics", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    worker_metric_name : {type : DataTypes.STRING},
    worker_units_of_measurment : {type : DataTypes.STRING},
    worker_metric_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Worker.hasMany(WorkerMetrics,{
    onDelete: 'CASCADE'
})
WorkerMetrics.belongsTo(Worker)

const MachineTypes = sequelize.define("machine_types", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    type_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const SensorsByTypes = sequelize.define("sensors_by_types", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    units_of_measurment : {type : DataTypes.STRING},
    port : {type : DataTypes.STRING},
    sensor_type_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

MachineTypes.hasMany(SensorsByTypes,{
    onDelete: 'CASCADE'
})
SensorsByTypes.belongsTo(MachineTypes)

const Machines = sequelize.define("machines", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_name : {type : DataTypes.STRING},
    machine_state : {type : DataTypes.STRING},
    tablet_id : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

MachineTypes.hasMany(Machines,{
    onDelete: 'CASCADE'
})
Machines.belongsTo(MachineTypes)

const Sensors = sequelize.define("sensors", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    sensor_name : {type : DataTypes.STRING},
    sensor_port : {type : DataTypes.STRING},
    sensor_value : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Machines.hasMany(Sensors,{
    onDelete: 'CASCADE'
})
Sensors.belongsTo(Machines)

SensorsByTypes.hasMany(Sensors,{
    onDelete: 'CASCADE',
    foreignKey: 'sensor_type_id',
})
Sensors.belongsTo(SensorsByTypes)

const MachineWorkplace = sequelize.define("machine_workplace", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_workplace_name : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Machines.hasMany(MachineWorkplace,{
    onDelete: 'CASCADE'
})
MachineWorkplace.belongsTo(Machines)

const WorkerToMachine = sequelize.define("worker_to_machine", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Shop.belongsToMany(Machines, {through : WorkerToMachine,foreignKey : "machine_id",unique: false})
Shop.belongsToMany(Worker, {through : WorkerToMachine,foreignKey : "worker_id",unique: false})
Machines.belongsToMany(Shop, {through : WorkerToMachine,foreignKey : "shop_id",unique: false})
Machines.belongsToMany(Worker, {through : WorkerToMachine,foreignKey : "worker_id",unique: false})
Worker.belongsToMany(Shop, {through : WorkerToMachine,foreignKey : "shop_id",unique: false})
Worker.belongsToMany(Machines, {through : WorkerToMachine,foreignKey : "machine_id",unique: false})

const MachineActions = sequelize.define("machine_actions", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    action_class : {type : DataTypes.STRING},
    action_status : {type : DataTypes.STRING},
    action_time : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Machines.hasMany(MachineActions,{
    onDelete: 'CASCADE'
})
MachineActions.belongsTo(Machines)

const MachineMetrics = sequelize.define("machine_metrics", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_metric_name : {type : DataTypes.STRING},
    machine_metric_type : {type : DataTypes.STRING},
    machine_units_of_measurment : {type : DataTypes.STRING},
    machine_metric_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Machines.hasMany(MachineMetrics,{
    onDelete: 'CASCADE'
})
MachineMetrics.belongsTo(Machines)

const Alerts = sequelize.define("alerts", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    alert_message : {type : DataTypes.STRING},
    is_closed : {type : DataTypes.STRING},
    is_read : {type : DataTypes.STRING},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

Production.hasMany(Alerts,{
    onDelete: 'CASCADE'
})
Alerts.belongsTo(Production)

Machines.hasMany(Alerts,{
    onDelete: 'CASCADE'
})

Alerts.belongsTo(Machines)

MachineActions.hasMany(Alerts,{
    onDelete: 'CASCADE'
})
Alerts.belongsTo(MachineActions)


module.exports = {
    Production,
    UserAdmin,
    TargetValues,
    ProductionTotal,
    ReportModels,
    ReportBlocks,
    GeneratedReposrts,
    Shop,
    ShopTotal,
    Worker,
    WorkerActions,
    WorkerMetrics,
    MachineTypes,
    SensorsByTypes,
    Machines,
    MachineTypes,
    Sensors,
    MachineWorkplace,
    WorkerToMachine,
    MachineActions,
    MachineMetrics,
    Alerts
}