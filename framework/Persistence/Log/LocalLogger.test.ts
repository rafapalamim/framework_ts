import { describe, test } from '@jest/globals'
import LocalLogger from './LocalLogger'

describe('Log', () => {
    test.only('aaaa', () => {

        const log = new LocalLogger()
        log.info({message: 'info log'})

    })
})