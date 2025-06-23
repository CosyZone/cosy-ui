import { describe, it, expect } from 'vitest'
import { VERSION } from '../src'

describe('Basic Framework Tests', () => {
    it('should export version', () => {
        expect(VERSION).toBe('0.1.0')
    })

    it('should import without errors', async () => {
        const framework = await import('../src')
        expect(framework).toBeDefined()
        expect(framework.VERSION).toBe('0.1.0')
    })
}) 
