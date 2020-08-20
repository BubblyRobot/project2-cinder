// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your first name"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your last name"
        }
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // data from questionnaire
    // picture: {
    //   type: DataTypes.BLOB,
    //   allowNull: true
    // },
    // aboutme: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // dob: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },
    // phone: {
    //   type: DataTypes.INTEGER,
    //   validate: {
    //     len: [10]
    //   },
    //   allowNull: true
    // },
    // work_place: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // job_role: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // experience: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // gender: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // languege: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
