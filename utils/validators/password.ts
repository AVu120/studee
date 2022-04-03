import PasswordValidator from "password-validator";

const schema = new PasswordValidator();

const passwordSchema = schema
  .is()
  .min(8, "Must have length of at least 8 characters")
  .has()
  .uppercase(1, "Must have at least 1 uppercase letter")
  .has()
  .lowercase(1, "Must have at least 1 lowercase letter")
  .has()
  .digits(1, "Must have at least 1 number")
  .has()
  .not()
  .spaces();

export default passwordSchema;
