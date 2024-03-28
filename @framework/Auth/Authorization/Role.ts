import Module from './Module'

export default class Role {
    constructor(
        readonly id: string | number,
        readonly slug: string,
        readonly modules: Module[]
    ) { }

    hasModule(moduleSlug: string): boolean {

        const findModule = this.findModule(moduleSlug)

        if (findModule) return true
        return false
    }

    hasActionOnModule(actionSlug: string, moduleSlug: string): boolean {

        if(!this.hasModule(moduleSlug)) return false

        const module = this.findModule(moduleSlug)!

        return module.hasAction(actionSlug)

    }

    private findModule(moduleSlug: string) : Module | null {
        const findModule = this.modules.find((module) => module.slug === moduleSlug)
        return findModule ?? null
    }
}