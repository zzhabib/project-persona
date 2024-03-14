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

        /// <summary>
        /// Get a user's data including their stories collection
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static async Task<User> GetUserData(int userId)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                          query GetUserData($getUserId: Int!) {
                              getUser(id: $getUserId) {
                                id
                                email
                                stories {
                                  id
                                  title
                                  description
                                }
                                storySessions {
                                  id
                                  name
                                  story {
                                    title
                                    description
                                    id
                                  }
                                }
                              }
                            }
                        ",
                Variables = new
                {
                    getUserId = userId
                }
            };

            var response = await PersonaEnvironment.Client.SendQueryAsync<GetUserQueryResult>(request);
            return response.Data.GetUser;
        }

        public class GetUserQueryResult
        {
            public User GetUser;
        }
    }
}