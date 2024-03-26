import { describe, expect, test, beforeEach, afterAll } from '@jest/globals'
import LocalCacheAdapter from './LocalCacheAdapter'
import { randomBytes } from 'crypto'
import fs from 'fs'
import path from 'path'
import { setTimeout } from 'timers/promises'

const cacheLocal = path.resolve(__dirname, '..', '..', '..', '..', 'storage', 'cache')

type FooType = {
    name: string
}[]

describe('LocalCacheAdapter unit test', () => {

    beforeEach(() => {
        fs.rmSync(cacheLocal, { recursive: true, force: true })
    })

    afterAll(() => {
        fs.rmSync(cacheLocal, { recursive: true, force: true })
    })

    test('Should be able to create a new cache file', async () => {

        const cache = new LocalCacheAdapter<FooType>()

        const randomName = randomBytes(30).toString('hex')
        const randomData = randomBytes(10).toString('hex')

        await cache.write(randomName, [{ name: randomData }])

        const cachePath = path.resolve(cacheLocal, `${randomName}.cache`)
        expect(fs.existsSync(cachePath)).toBeTruthy()
    })

    test('Should be able to find a cache file and load the data', async () => {

        const cache = new LocalCacheAdapter<FooType>()

        const randomName = randomBytes(30).toString('hex')
        const randomData = randomBytes(10).toString('hex')

        await cache.write(randomName, [{ name: randomData }])

        const cachedData = await cache.find(randomName)
        expect(cachedData!.length).toBe(1)
        expect(cachedData![0].name).toBe(randomData)
    })

    test('Should not be able to find a cache with expired ttl', async () => {

        const cache = new LocalCacheAdapter<FooType>()

        const randomName = randomBytes(30).toString('hex')
        const randomData = randomBytes(10).toString('hex')
        const ttlInMinutes = 0.01

        await cache.write(randomName, [{ name: randomData }], ttlInMinutes)
        await setTimeout(1200)
        const result = await cache.find(randomName)

        expect(result).toBeNull()
    })

    test('Should be able to delete a cache file', async () => {

        const cache = new LocalCacheAdapter<FooType>()

        const randomName = randomBytes(30).toString('hex')
        const randomData = randomBytes(10).toString('hex')

        await cache.write(randomName, [{ name: randomData }])
        await cache.write('remain', [{ name: randomData }])

        const cachePath = path.resolve(cacheLocal, `${randomName}.cache`)
        const cachePath2 = path.resolve(cacheLocal, 'remain.cache')

        expect(fs.existsSync(cachePath)).toBeTruthy()
        expect(fs.existsSync(cachePath2)).toBeTruthy()

        await cache.clear(randomName)

        expect(fs.existsSync(cachePath)).toBeFalsy()
        expect(fs.existsSync(cachePath2)).toBeTruthy()
    })

    test('Should be able to delete all cache files', async () => {

        const cache = new LocalCacheAdapter<FooType>()

        const randomName = randomBytes(30).toString('hex')
        const randomName2 = randomBytes(30).toString('hex')
        const randomName3 = randomBytes(30).toString('hex')

        const randomData = randomBytes(10).toString('hex')

        await cache.write(randomName, [{ name: randomData }])
        await cache.write(randomName2, [{ name: randomData }])
        await cache.write(randomName3, [{ name: randomData }])

        const cachePath = path.resolve(cacheLocal, `${randomName}.cache`)
        const cachePath2 = path.resolve(cacheLocal, `${randomName2}.cache`)
        const cachePath3 = path.resolve(cacheLocal, `${randomName3}.cache`)

        expect(fs.existsSync(cachePath)).toBeTruthy()
        expect(fs.existsSync(cachePath2)).toBeTruthy()
        expect(fs.existsSync(cachePath3)).toBeTruthy()

        await cache.clearAll()

        expect(fs.existsSync(cachePath)).toBeFalsy()
        expect(fs.existsSync(cachePath2)).toBeFalsy()
        expect(fs.existsSync(cachePath3)).toBeFalsy()
    })

})