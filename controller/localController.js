const firebase = require("../services/firebase");
var db = firebase.firestore()

module.exports = {
    async createLocal(request, response) {
        try {
            const { name, place } = request.body;
            const data = {
                name,
                place
            }
            const localRef = await db.collection('local').add(data);
            const local = await localRef.get();

            response.send({
                id: localRef.id,
                ...local.data()
            });

        } catch (error) {
            response.status(500).send(error);
        }
    },
    async getLocal(request, response) {
        try {
            const localId = request.params.id;

            if (!localId) throw new Error('local ID is required');

            const local = await db.collection('local').doc(localId).get();

            if (!local.exists) {
                throw new Error('Doens´t exit.')
            }

            response.json({
                id: local.id,
                ...local.data()
            });

        } catch (error) {

            response.status(500).send(error);

        }
    },
    async listLocal(req, res, next) {
        try {
            const localQuerySnapshot = await db.collection('local').get();
            const local = [];
            localQuerySnapshot.forEach(
                (doc) => {
                    local.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            );
            res.json(local);

        } catch (error) {

            res.status(500).send(error);
        }
    },
    async updateLocal(request, response) {
        try {
            const localId = request.params.id;
            const title = request.body;

            if (!localId) throw new Error('id is blank');

            if (!title) throw new Error('Title is required');

            // console.log(request.body)
            const data = {
                ...title
            };
            const localRef = await db.collection('local')
                .doc(localId)
                .set(data, { merge: true });

            response.json({
                id: localId,
                data
            })
        } catch (error) {

            response.status(500).send(error);
        }
    },
    async deleteLocal(request, response) {
        try {
            const localId = request.params.id;

            if (!localId) throw new Error('id is blank');

            await db.collection('local')
                .doc(localId)
                .delete();

            response.json({
                id: localId,
            })
        } catch (error) {
            response.status(500).send(error);
        }
    }
}