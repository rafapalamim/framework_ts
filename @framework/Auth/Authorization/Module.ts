import Action from './Action'

export default class Module {
    constructor(
        readonly id: string | number,
        readonly slug: string,
        readonly actions: Action[]
    ) { }

    hasAction(actionSlug: string) : boolean {
        const findAction = this.actions.find((action) => action.slug === actionSlug)

        if(findAction) return true
        return false
    }

}