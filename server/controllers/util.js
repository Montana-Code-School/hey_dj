module.exports = {
  routifyPromise: promiseFn => {
    return (req, res) => {
      promiseFn(req, res)
        .then(result => res.json(result))
        .catch(error =>
          res.status(500).json({
            success: false,
            error: error.message
          })
        );
    };
  }
};
