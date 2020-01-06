const firebase = require("../services/firebase");
var db = firebase.firestore()

module.exports = {
    async createUser(request, response) {
        try {
            const { age, name, lastName, email } = request.body;
            const data = {
                age,
                name,
                lastName,
                email
            }
            const userRef = await db.collection('user').add(data);
            const user = await userRef.get();

            response.send({
                id: userRef.id,
                ...user.data()
            });

        } catch (error) {
            response.status(500).send(error);
        }
    },
    async getUser(request, response) {
        try {
            const userId = request.params.id;

            if (!userId) throw new Error('user ID is required');

            const user = await db.collection('user').doc(userId).get();

            if (!user.exists) {
                throw new Error('Doens´t exit.')
            }

            response.json({
                id: user.id,
                ...user.data()
            });

        } catch (error) {

            response.status(500).send(error);
        }
    },
    async listUser(req, res, next) {
        try {
            const userQuerySnapshot = await db.collection('user').get();
            const user = [];
            userQuerySnapshot.forEach(
                (doc) => {
                    user.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            );
            res.json(user);

        } catch (error) {

            res.status(500).send(error);
        }
    },
    async updateUser(request, response) {
        try {
            const userId = request.params.id;
            const title = request.body;

            if (!userId) throw new Error('id is blank');

            if (!title) throw new Error('Title is required');

            // console.log(request.body)
            const data = {
                ...title
            };
            const userRef = await db.collection('user')
                .doc(userId)
                .set(data, { merge: true });

            response.json({
                id: userId,
                data
            })
        } catch (error) {

            response.status(500).send(error);
        }
    },
    async deleteUser(request, response) {
        try {
            const userId = request.params.id;

            if (!userId) throw new Error('id is blank');

            await db.collection('user')
                .doc(userId)
                .delete();

            response.json({
                id: userId,
            })
        } catch (error) {

            response.status(500).send(error);
        }
    }
}