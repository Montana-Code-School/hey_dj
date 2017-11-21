module.exports = {
  routifyPromise: promiseFn => {
    console.log("This is what your are looking for ", promiseFn);
    return (req, res) => {
      promiseFn(req, res)
        .then(result => res.json(result))
        .catch(error => res.status(500).json(error));
    };
  }
};
