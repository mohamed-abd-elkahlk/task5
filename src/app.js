const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://localhost:27017";

const dbname = "task4";

mongoClient.connect(connectionUrl, (error, res) => {
  if (error) {
    return console.log("error has occured");
  }
  console.log("All perfect");

  const db = res.db(dbname);
  // insert one
  db.collection("users").insertOne(
    {
      name: "mohamed",
      age: 26,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data");
      }
      console.log(data.insertedId);
    }
  );
  // insert another
  db.collection("users").insertOne(
    {
      name: "mohamed",
      age: 26,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data");
      }
      console.log(data.insertedId);
    }
  );
  // insert many to our collection with 5 has age 25
  db.collection("users")
    .insertMany(
      [
        {
          name: "mohamed",
          age: 25,
        },
        {
          name: "eman",
          age: "25",
        },
        {
          name: "abdo",
          age: 25,
        },
        {
          name: "ashraf",
          age: 25,
        },
        {
          name: "meme",
          age: 25,
        },
        {
          name: "ahmad",
          age: 19,
        },
        {
          name: "mahmoud",
          age: 21,
        },
        {
          name: "ali",
          age: 33,
        },
        {
          name: "marwa",
          age: 18,
        },
        {
          name: "saed",
          age: 29,
        },
      ],
      (error, data) => {
        if (error) {
          console.log("Unable to insert data");
        }
        console.log(data.insertedCount);
      }
    )
    // serch in coolection and retutn the reuslt
    .db.collection("users")
    .find({ age: 25 })
    .toArray((error, users) => {
      if (error) {
        return console.log("error has occured");
      }
      console.log(users);
    });

  db.collection("users")
    .find({ age: 25 })
    .limit(3)
    .toArray((error, users) => {
      if (error) {
        return console.log("error has occured");
      }
      console.log(users);
    });

  // update  with $set & $inc
  db.collection("users")
    .find(
      {},
      {
        $set: { name: "Osama" },
        $inc: { age: 4 },
      }
    )
    .limit(4)
    .forEach((doc) => {
      db.collection("users").updateOne(
        { _id: doc._id },
        {
          $set: { name: "Osama" },
          $inc: { age: 4 },
        }
      );
    })
    .then((data) => {
      console.log(data.modifiedCount);
    })
    .catch((error) => {
      console.log(error);
    });
  db.collection("users")
    .updateMany(
      {},
      {
        $inc: { age: 10 },
      }
    )
    .then((data) => {
      console.log(data.modifiedCount);
    })
    .catch((error) => console.log(error));

  db.collection("users")
    .updateOne({}, { $inc: 20 })
    .then((data) => {
      console.log(data.modifiedCount);
    })
    .catch((error) => console.log(error));
  db.collection("users")
    .deleteOne({ _id: mongodb.ObjectId("64cc24dd5489e970cd01bec5") })
    .then((data) => {
      console.log(data.deletedCount);
    })
    .catch((error) => console.log(error));

  db.collection("users")
    .deleteMany({ age: 35 })
    .then((data) => {
      console.log(data.deletedCount);
    })
    .catch((error) => console.log(error));
});
