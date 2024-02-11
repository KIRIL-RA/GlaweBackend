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
    user_password : {type : DataTypes.STRING},
    production_id : {type : DataTypes.INTEGER, references: {
        model: Production,
        key: 'id'
      }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})


const ProductionTotal = sequelize.define("production_total", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    production_total_type : {type : DataTypes.STRING},
    production_total_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
    production_id : {type : DataTypes.INTEGER, references : {
        model : Production,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const ReportModels = sequelize.define("report_models", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_model_name : {type : DataTypes.STRING},
    production_id : {type: DataTypes.INTEGER,references : {
        model : Production,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})


const ReportBlocks = sequelize.define("report_blocks", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_block_type : {type : DataTypes.STRING},
    report_block_name : {type : DataTypes.STRING},
    report_block_source : {type : DataTypes.STRING},
    metric_type : {type : DataTypes.STRING},
    report_model_id : {type: DataTypes.INTEGER,references : {
        model : ReportModels,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})


const GeneratedReposrts = sequelize.define("generated_reports", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    report_name : {type : DataTypes.STRING},
    from_date : {type : DataTypes.DATE},
    to_date : {type : DataTypes.DATE},
    generated_report_model_id : {type: DataTypes.INTEGER,references : {
        model : ReportModels,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const Shop = sequelize.define("shop", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    shop_name : {type : DataTypes.STRING},
    production_id : {type : DataTypes.INTEGER, references : {
        model : Production,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})




const ShopTotal = sequelize.define("shop_total", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    shop_total_type : {type : DataTypes.STRING},
    shop_name : {type : DataTypes.STRING},
    shop_id : {type : DataTypes.INTEGER, references : {
        model : Shop,
        key : "id"
    }},
    production_id : {type : DataTypes.INTEGER, references : {
        model : Production,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

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
    worker_id : {type : DataTypes.INTEGER, references : {
        model : Worker,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})


const WorkerMetrics = sequelize.define("worker_metrics", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    worker_metric_name : {type : DataTypes.STRING},
    worker_units_of_measurment : {type : DataTypes.STRING},
    worker_metric_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
    worker_id : {type : DataTypes.INTEGER, references : {
        model : Worker,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

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
    machine_type_id : {type : DataTypes.INTEGER, references : {
        model : MachineTypes,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const Machines = sequelize.define("machines", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_name : {type : DataTypes.STRING},
    machine_state : {type : DataTypes.STRING},
    tablet_id : {type : DataTypes.STRING},
    machine_type_id : {type : DataTypes.INTEGER, references : {
        model : MachineTypes,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const Sensors = sequelize.define("sensors", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    sensor_name : {type : DataTypes.STRING},
    sensor_port : {type : DataTypes.STRING},
    sensor_value : {type : DataTypes.STRING},
    machine_id : {type : DataTypes.INTEGER, references : {
        model : Machines,
        key : "id"
    }},
    sensor_type_id : {type : DataTypes.INTEGER, references : {
        model : SensorsByTypes,
        key : "id"
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const TargetValues = sequelize.define("target_values", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    metric_type : {type : DataTypes.STRING},
    target_value : {type : DataTypes.STRING},
    sensors_type_id : {type : DataTypes.INTEGER,references: {
        model: SensorsByTypes,
        key: 'id'
    }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const MachineWorkplace = sequelize.define("machine_workplace", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_workplace_name : {type : DataTypes.STRING},
    machine_id : {type : DataTypes.INTEGER,references: {
        model: Machines,
        key: 'id'
      }}
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const WorkerToMachine = sequelize.define("worker_to_machine", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    shop_id : {type : DataTypes.INTEGER,references: {
        model: Shop,
        key: 'id'
    }},
    worker_id : {type : DataTypes.INTEGER,references: {
        model: Worker,
        key: 'id'
    }},
    machine_id : {type : DataTypes.INTEGER,references: {
        model: Machines,
        key: 'id'
    }},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const MachineActions = sequelize.define("machine_actions", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    action_class : {type : DataTypes.STRING},
    action_status : {type : DataTypes.STRING},
    action_time : {type : DataTypes.DATE},
    machine_id : {type : DataTypes.INTEGER,references: {
        model: Machines,
        key: 'id'
    }},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const MachineMetrics = sequelize.define("machine_metrics", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    machine_metric_name : {type : DataTypes.STRING},
    machine_metric_type : {type : DataTypes.STRING},
    machine_units_of_measurment : {type : DataTypes.STRING},
    machine_metric_value : {type : DataTypes.STRING},
    time_start : {type : DataTypes.DATE},
    time_end : {type : DataTypes.DATE},
    machine_id : {type : DataTypes.INTEGER,references: {
        model: Machines,
        key: 'id'
    }},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const Alerts = sequelize.define("alerts", {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    alert_message : {type : DataTypes.STRING},
    is_closed : {type : DataTypes.STRING},
    is_read : {type : DataTypes.STRING},
    production_id : {type : DataTypes.INTEGER,references: {
        model: Production,
        key: 'id'
    }},
    machine_id : {type : DataTypes.INTEGER,references: {
        model: Machines,
        key: 'id'
    }},
    machine_action_id : {type : DataTypes.INTEGER,references: {
        model: MachineActions,
        key: 'id'
    }},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const AdminSessions = sequelize.define("admin_sessions" , {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    admin_id : {type : DataTypes.STRING},
    refesh_token : {type : DataTypes.STRING(1000)},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})

const WorkerSessions = sequelize.define("worker_sessions" , {
    id : {type : DataTypes.INTEGER, primaryKey : true , autoIncrement:true},
    worker_id : {type : DataTypes.STRING},
    refesh_token : {type : DataTypes.STRING(1000)},
},{
    underscored: true,
    timestamps: false,
    freezeTableName: true,
})



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
    Alerts,
    AdminSessions,
    WorkerSessions
}