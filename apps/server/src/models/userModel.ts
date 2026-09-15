import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

export class User extends Model {
  declare id: number;
  declare user_id: string;
  declare nickname: string;
  declare password: string;
  declare profile_url: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);
