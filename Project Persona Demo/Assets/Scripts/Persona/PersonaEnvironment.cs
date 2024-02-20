using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace Persona
{
    public static class PersonaEnvironment
    {
        public static GraphQLHttpClient Client = new GraphQLHttpClient("http://localhost:4000", new NewtonsoftJsonSerializer());
    }
}