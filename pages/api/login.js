import bcrypt from 'bcrypt'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { user, password } = req.body
    const isPasswordCorrect = await bcrypt.compare(password, user.pass)
    if (isPasswordCorrect) {
      res.status(200).json({ success: true })
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Credenciales Incorrectas' })
    }
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' })
  }
}
