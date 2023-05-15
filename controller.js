const Contact = require("./Contact");
exports.getAllContact = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.render("index", { contacts, error: {} });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occured!..",
      });
    });
};

exports.getSingleContact = (req, res) => {
  let { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occured!",
      });
    });
};

exports.createContact = (req, res) => {
  let { name, email, phone, id } = req.body;
  let error = {};
  if (!name) {
    error.name = "Please provide your name";
  }

  if (!phone) {
    error.phone = "Please provide a phone number";
  }

  if (!email) {
    error.email = "please provide a email address";
  }

  let isError = Object.keys(error).length > 0;
  if (isError) {
    Contact.find()
      .then((contacts) => {
        return res.render("index", { contacts, error });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: "Error Occured!",
        });
      });
  }
  if (id) {
    Contact.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            name,
            email,
            phone
        }
    }).then(()=> {
        Contact.find()
            .then(contacts => {
                res.render('index', {contacts, error: {}})
            })
    }).catch(e => {
        console.log(e);
        return res.json({
          message: "Error Occured!",
        });
    })
  } else {
    let contact = new Contact({
      name,
      email,
      phone,
    });
    contact.save()
      .then((c) => {
        Contact.find().then((contacts) => {
          return res.render("index", { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.log(e);
        res.json({
          message: "Error Occured!..",
        });
      });
  }
};

exports.updateContact = (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  Contact.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    { new: true }
  )
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error Occured!..",
      });
    });
};

exports.deleteContact = (req, res) => {
  let { id } = req.params;
  Contact.findOneAndDelete({ _id: id })
    .then((contact) => {
      Contact.find().then((contacts) => {
        res.render("index", { contacts, error: {} });
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: "Error occured!",
      });
    });
};
