import User from "./User.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generate-JWT.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    return res.status(200).json({
      msg: "user has been added to database",
      userDetails: {
        user: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe:
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = await generarJWT(user.id, user.email)

      res.status(200).json({
        msg: "Login Ok!!!",
        userDetails: {
          id: user._id,
          email: user.email,
          token: token
        },
      });
    }

    if (!user) {
      return res
        .status(400)
        .send(`Wrong credentials, ${email} doesn't exists en database`);
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send("wrong password");
    }

  } catch (e) {
    res.status(500).send("Comuniquese con el administrador");
  }
}

export const updateUser = async (req, res) => {
  try {
    console.log('Entro');
    const { uid } = req.user

    const exist = User.findOne({ _id: uid })
    if (!exist) return res.status(404).send({ message: 'The User not exist' })
      
    const data = req.body;
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(data.password, salt);

    data.password = encryptedPassword
    let userUpdate = await User.findOneAndUpdate(
      { _id: uid },
      data,
      { new: true }
    )

    if (!userUpdate)
      return res.status(401).send({ message: 'The User could not be updated' })

    return res.status(200).json({
      userUpdate,
    })

  } catch (err) {
    res.status(500).send("Comuniquese con el administrador")
  }
}