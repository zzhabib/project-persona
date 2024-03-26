using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace Persona
{
    public static class PersonaEnvironment
    {
        public static GraphQLHttpClient Client = new GraphQLHttpClient("http://146.190.161.212/api", new NewtonsoftJsonSerializer());
    }
}