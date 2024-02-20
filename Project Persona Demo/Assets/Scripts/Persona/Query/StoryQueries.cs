using System.Threading.Tasks;
using GraphQL;
using Persona.Entity;

namespace Persona.Query
{
    public static class StoryQueries
    {
        /// <summary>
        /// Get a story's data including its collection of scenes.
        /// </summary>
        /// <param name="storyId"></param>
        /// <returns></returns>
        public static async Task<Story> GetStoryData(int storyId)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                          query GetStory($getStoryId: Int!) {
                              getStory(id: $getStoryId) {
                                id
                                title
                                description
                                scenes {
                                  id
                                  title
                                  description
                                }
                              }
                            }
                        ",
                Variables = new
                {
                    getStoryId = storyId
                }
            };

            var response = await PersonaEnvironment.Client.SendQueryAsync<GetStoryResult>(request);
            return response.Data.GetStory;
        }

        private class GetStoryResult
        {
            public Story GetStory;
        }
    }
}