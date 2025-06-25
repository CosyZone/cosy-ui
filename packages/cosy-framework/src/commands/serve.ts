
import { BaseCommand } from '@coffic/cosy-interfaces'
import { ApplicationFactory } from '../factory.js'

export class ServeCommand extends BaseCommand {
    constructor() {
        super('serve', 'Start the HTTP server')
    }

    async execute(args: string[]): Promise<void> {
        // 检查参数
        if (args[0] && isNaN(parseInt(args[0]))) {
            console.error('Port must be a number')
            process.exit(1)
        }

        const port = args[0] ? parseInt(args[0]) : 3000

        console.log(`Starting server on port ${port}...`)

        try {
            const app = ApplicationFactory.createWebApp({
                name: 'Web Server',
                port
            })

            await app.start(port)
            console.log(`Server is running at http://localhost:${port}`)
        } catch (error) {
            console.error('Failed to start server:', error)
            process.exit(1)
        }
    }
} 
