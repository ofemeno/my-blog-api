module.exports.register = (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(req.body)
    res.status(200).json(req.body);
  } catch (error) {
    res.sendStatus(500);
  }
};
