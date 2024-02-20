using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL;
using Persona.Entity;

namespace Persona.Query
{
    public static class UserQueries
    {
        public static async Task<IEnumerable<User>> GetAllUsers()
        {
            var request = new GraphQLRequest
            {
                Query = @"
                query TestQuery {
                  allUsers {
                    id
                    email
                  }
                }
            "
            };

            var response = await PersonaEnvironment.Client.SendQueryAsync<AllUsersQueryResult>(request);
            return response.Data.allUsers;
        }

        public class AllUsersQueryResult
        {
            public IEnumerable<User> allUsers;
        }
    }
}