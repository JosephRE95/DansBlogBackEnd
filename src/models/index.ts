import { Sequelize } from "sequelize";
import { PostFactory, AssociateUserPost } from "./post";
import { UserFactory } from "./user";

const dbName = 'blogdb';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
PostFactory(sequelize);
AssociateUserPost();


export const db = sequelize;