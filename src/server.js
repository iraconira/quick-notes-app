import { createServer, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
    let server = createServer({
        environment,

        models: {
            note: Model,
        },

        seeds(server) {
            // Just create random notes
            for (let i = 0; i < 10; i++) {
                const randomText = (Math.random() + 1).toString(36).substring(3)
                const status = ['New', 'Completed', 'Not completed']
                const randomStatus = Math.floor(Math.random() * status.length)
                server.create('note', {
                    id: i + 1,
                    title: `Title ${randomText}`,
                    content: `note ${randomText} ${randomText} ${randomText}`,
                    status: status[randomStatus],
                })
            }
        },

        routes() {
            this.namespace = 'api'

            this.get('/notes', (schema) => {
                return schema.notes.all()
            })
        },
    })

    return server
}
