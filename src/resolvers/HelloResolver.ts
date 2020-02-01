import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async helloWorld(): Promise<string> {
    return 'Hello World!'
  }
}
