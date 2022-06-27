const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "BotOpcion", {
            opcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            respuesta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, { timestamps: false }
        );
};