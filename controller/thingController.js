const firebase = require("../services/firebase");
var db = firebase.firestore()

module.exports = {
    async createThing(request, response) {
        try {
            const { name, place } = request.body;
            const data = {
                name,
                place
            }
            const thingRef = await db.collection('thing').add(data);
            const thing = await thingRef.get();
            
            response.send({
                id: thingRef.id,
                ...thing.data()
            });

        } catch (error) {
            response.status(500).send(error);
        }
    },

    async getThing(request, response) {
        try {
            const thingId = request.params.id;

            if (!thingId) throw new Error('thing ID is required');

            const thing = await db.collection('thing').doc(thingId).get();

            if (!thing.exists) {
                throw new Error('Doens´t exit.')
            }
            
            response.json({
                id: thing.id,
                ...thing.data()
            });

        } catch (error) {

            response.status(500).send(error);

        }
    },

    async listThing(req, res, next) {
        try {
            const thingQuerySnapshot = await db.collection('thing').get();
            const thing = [];
            thingQuerySnapshot.forEach(
                (doc) => {
                    thing.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            );
            res.json(thing);

        } catch (error) {

            res.status(500).send(error);
        }
    },
    async updateThing(request, response) {
        try {
            const thingId = request.params.id;
            const title = request.body;

            if (!thingId) throw new Error('id is blank');

            if (!title) throw new Error('Title is required');

            // console.log(request.body)
            const data = {
                ...title
            };
            const thingRef = await db.collection('thing')
                .doc(thingId)
                .set(data, { merge: true });

            response.json({
                id: thingId,
                data
            })
        } catch (error) {

            response.status(500).send(error);
        }
    },
    async deleteThing(request, response) {
        try {
            const thingId = request.params.id;

            if (!thingId) throw new Error('id is blank');

            await db.collection('thing')
                .doc(thingId)
                .delete();

            response.json({
                id: thingId,
            })
        } catch (error) {

            response.status(500).send(error);

        }
    }
}