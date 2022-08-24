import {describe, it, beforeAll, beforeEach} from 'testing/bdd.ts'
import { CreateUserCommandMother } from './CreateUserCommand.ts'

beforeEach(() => {
})

describe('UserCreator', ()=>{
    it('should create a valid user', async () => {
        const command = CreateUserCommandMother.random();
    })
})